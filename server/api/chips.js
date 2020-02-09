const path = require('path')
const fs = require('fs')
const Router = require('express-promise-router')
const multer = require('multer')
const sharp = require('sharp')

const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.get('/:chipId', async (req, res) => {
  try {
    const result = await db.query(
      `select 
          c.id,
          c.img_url,
          c.title,
          c.description,
          c.created_at,
          c.created_by,
          c.updated_at,
          c.updated_by,
          avg(r.rating) as rating,
          count(r.rating) as num_of_reviews
        from chips c
        left join reviews r on r.chip_id = c.id
        where c.id = $1
        group by c.id;`,
      [req.params.chipId]
    )

    if (result.rows[0]) {
      return res.send({ data: convertDbRowToChip(result.rows[0]) })
    }

    return res.status(404).json({ status: 404 })
  } catch (e) {
    return processError(e, res)
  }
})

router.get('/byCreatorId/:userId', async (req, res) => {
  const { userId } = req.params
  if (userId) {
    try {
      let result = await db.query(
        `select 
          c.id,
          c.img_url,
          c.title,
          c.description,
          c.created_at,
          c.created_by,
          c.updated_at,
          c.updated_by
        from chips c
        where c.user_id = $1
        order by c.created_at;`,
        [userId]
      )

      res.json({ data: result.rows.map(convertDbRowToReview) })
    } catch (e) {
      return processError(e, res)
    }
  }
})

router.get('/', async (req, res) => {
  const { geoId } = req.query

  try {
    let result
    if (geoId) {
      result = await db.query(
        `select 
            c.id,
            c.img_url,
            c.title,
            c.description,
            c.created_at,
            c.created_by,
            c.updated_at,
            c.updated_by,
            avg(r.rating) as rating,
            count(r.rating) as num_of_reviews,
            row_number() over (
              order by coalesce(avg(r.rating), 0) * 
                case 
                  when count(r.rating) = 1 then 0.5
                  when count(r.rating) = 2 then 0.75
                  else 1 end
              desc) ranking
          from geos_chips gc
          join chips c on gc.chip_id = c.id
          left join reviews r on r.chip_id = c.id
          where gc.geo_id = $1
          group by c.id
          order by coalesce(avg(r.rating), 0) * 
          case 
            when count(r.rating) = 1 then 0.5
            when count(r.rating) = 2 then 0.75
            else 1 end
        desc, c.created_at;`,
        [geoId]
      )
    } else {
      result = await db.query(
        `select 
            c.id,
            c.img_url,
            c.title,
            c.description,
            c.created_at,
            c.created_by,
            c.updated_at,
            c.updated_by,
            avg(r.rating) as rating,
            count(r.rating) as num_of_reviews,
            row_number() over (
              order by coalesce(avg(r.rating), 0) * 
                case 
                  when count(r.rating) = 1 then 0.5
                  when count(r.rating) = 2 then 0.75
                  else 1 end
              desc) ranking
          from chips c
          left join reviews r on r.chip_id = c.id
          group by c.id
          order by coalesce(avg(r.rating), 0) * 
            case 
              when count(r.rating) = 1 then 0.5
              when count(r.rating) = 2 then 0.75
              else 1 end
          desc, c.created_at;`
      )
    }

    res.send({ data: result.rows.map(convertDbRowToChip) })
  } catch (e) {
    return processError(e, res)
  }
})

const getFileName = (title, ext) => {
  const date = new Date()
  return `${title}-${date.getFullYear()}-${date
    .getUTCMonth()
    .toString()
    .padStart(2, 0)}-${date
    .getUTCDay()
    .toString()
    .padStart(2, 0)} ${date
    .getUTCHours()
    .toString()
    .padStart(2, 0)}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, 0)}:${date
    .getUTCSeconds()
    .toString()
    .padStart(2, 0)}${ext}`
}

const imgUpload = multer({
  limits: {
    files: 1,
    fileSize: 1024 * 1024
  },
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.resolve(__dirname, '../../data/images/chips'))
    },
    filename: function(req, file, cb) {
      const ext = path.extname(file.originalname)
      cb(null, req.body.title + '-' + Math.random() + ext)
    }
  }),
  fileFilter: function(req, file, cb) {
    const ext = path.extname(file.originalname)
    if (
      (ext === '.png' && file.mimetype === 'image/png') ||
      ((ext === '.jpg' || ext === '.jpeg') &&
        (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'))
    ) {
      return cb(null, true)
    }

    cb({ code: 'UNSUPPORTED_FILE_TYPE' }, false)
  }
}).single('image')

router.post('/', async (req, res) => {
  return imgUpload(req, res, async err => {
    if (err) {
      if (err.code === 'UNSUPPORTED_FILE_TYPE') {
        return res.status(400).json({
          status: 400,
          code: 'INVALID_TITLE',
          message: 'Image must be a JPEG or PNG.'
        })
      } else {
        return processError(err, res)
      }
    }

    const { userId, title, description } = req.body
    const image = req.file
    const geos = req.body.geos
      ? req.body.geos.split(',').map(geo => parseInt(geo, 10))
      : null

    if (!userId) {
      return res.status(400).json({
        status: 400,
        code: 'MISSING_USER_ID',
        message: 'Field userId is required.'
      })
    } else if (!title) {
      return res.status(400).json({
        status: 400,
        code: 'MISSING_TITLE',
        message: 'Field title is required.'
      })
    } else if (title.length < 6 || title.length > 40) {
      return res.status(400).json({
        status: 400,
        code: 'INVALID_TITLE',
        message: 'Field title must be between 6 and 40 characters.'
      })
    } else if (!description) {
      return res.status(400).json({
        status: 400,
        code: 'MISSING_DESCRIPTION',
        message: 'Field description is required.'
      })
    } else if (description.length < 60 || description.length > 500) {
      return res.status(400).json({
        status: 400,
        code: 'INVALID_DESCRIPTION',
        message: 'Field description must be between 60 and 500 characters.'
      })
    } else if (!image) {
      return res.status(400).json({
        status: 400,
        code: 'MISSING_IMAGE',
        message: 'Field image is required.'
      })
    } else if (!geos) {
      return res.status(400).json({
        status: 400,
        code: 'MISSING_GEOS',
        message: 'Field geos is required.'
      })
    } else if (!Array.isArray(geos)) {
      return res.status(400).json({
        status: 400,
        code: 'INVALID_GEOS',
        message: 'Field geos must be an array.'
      })
    }

    const fileName = getFileName(title, path.extname(image.filename))
    try {
      await sharp(req.file.path)
        .resize({ height: 200 })
        .toFile(path.resolve(req.file.destination, fileName))

      fs.unlink(req.file.path, () => {})
    } catch (e) {
      console.error(e)
      return processError(e, res)
    }

    let result
    try {
      result = await db.query(
        `insert into chips 
        (title, description, img_url, created_by) 
        values ($1, $2, $3, $4)
        returning *;`,
        [title, description, '/data/images/chips/' + fileName, userId]
      )
    } catch (e) {
      console.error(e)
      fs.unlink(path.resolve(req.file.destination, fileName), () => {})
      return processError(e, res)
    }

    try {
      geos.forEach(async geo => {
        await db.query(
          `insert into geos_chips
          (geo_id, chip_id, created_by) 
          values ($1, $2, $3);`,
          [geo, result.rows[0].id, userId]
        )
      })
    } catch (e) {
      console.error(e)
      return processError(e, res)
    }

    return res.send({ data: convertDbRowToChip(result.rows[0]) })
  })
})

function convertDbRowToChip(row) {
  return {
    id: row.id,
    imgUrl: row.img_url || `https://picsum.photos/400/400?id=${Math.random()}`,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    createdBy: row.created_by,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
    rating: row.rating ? parseFloat(row.rating) : null,
    ranking: row.ranking ? parseFloat(row.ranking) : null,
    numOfReviews: row.num_of_reviews ? parseInt(row.num_of_reviews, 10) : null
  }
}

module.exports = router
