const Router = require('express-promise-router')
const multer = require('multer')

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
            count(r.rating) as num_of_reviews
          from geos_chips gc
          join chips c on gc.chip_id = c.id
          left join reviews r on r.chip_id = c.id
          where gc.geo_id = $1
          group by c.id
          order by coalesce(avg(r.rating), 0) desc;`,
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
            count(r.rating) as num_of_reviews
          from chips c
          left join reviews r on r.chip_id = c.id
          group by c.id
          order by coalesce(avg(r.rating), 0) desc;`
      )
    }

    res.send({ data: result.rows.map(convertDbRowToChip) })
  } catch (e) {
    return processError(e, res)
  }
})

const imgUpload = multer({
  dest: './data/images',
  limits: {
    files: 1,
    fileSize: 1000000
  }
})

router.post('/', imgUpload.single('image'), async (req, res) => {
  const { userId, title, description, image, geos } = req.body
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
  } else if (title.length < 6 || title.length > 30) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_TITLE',
      message: 'Field title must be between 6 and 30 characters.'
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
  } else if (!Arrays.isArray(geos)) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_GEOS',
      message: 'Field geos must be an array.'
    })
  }

  const result = await db.query(
    `insert into chips 
    (title, description, img_url) 
    values ($1, $2, $3)
    returning *;`,
    [title, description, imgUrl]
  )

  geos.forEach(geo => {
    db.query(
      `insert int geos_chips
      (geo_id, chip_id, created_by) values ($1, $2, $3);`,
      [result.rows[0].id, geo, userId]
    )
  })

  return res.send({ data: convertDbRowToChip(result.rows[0]) })
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
    rating: row.rating ? parseInt(row.rating, 10) : null,
    numOfReviews: row.num_of_reviews ? parseInt(row.num_of_reviews, 10) : null
  }
}

module.exports = router
