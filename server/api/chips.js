const Router = require('express-promise-router')
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

router.get('/', async (req, res) => {
  const { geoId } = req.query

  try {
    let result
    if (geoId) {
      result = await db.query(
        `select 
            c.id,
            c.img_url as imgUrl,
            c.title,
            c.description,
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

router.post('/', async (req, res) => {
  const { title, description, imgUrl } = req.body
  const result = await db.query(
    `insert into chips 
    (title, description, img_url) values ($1, $2, $3)`,
    [title, description, imgUrl]
  )

  return res.send({ data: result.rows })
})

function convertDbRowToChip(row) {
  return {
    id: row.id,
    imgUrl: row.img_url || `https://picsum.photos/400/400?id=${Math.random()}`,
    title: row.title,
    description: row.description,
    rating: parseInt(row.rating, 10),
    numOfReviews: parseInt(row.num_of_reviews, 10),
    createdAt: row.created_at,
    createdBy: row.created_by,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by
  }
}

module.exports = router
