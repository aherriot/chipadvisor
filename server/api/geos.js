const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`select * from geos;`)
    return res.send({
      data: result.rows.map(convertDbRowToGeo)
    })
  } catch (e) {
    return processError(e, res)
  }
})

router.post('/', async (req, res) => {
  const { title, description, userId } = req.body
  try {
    const result = await db.query(
      `insert into geos (title, description, created_by) values ($1, $2, $3) returning *;`,
      [(title, description, userId)]
    )
    return res.send({ data: result.rows })
  } catch (e) {
    return processError(e, res)
  }
})

router.put('/:geoId', async (req, res) => {
  const { title, description, userId } = req.body
  try {
    const result = await db.query(
      `update geos (title, description, updated_by, updated_at) values ($2, $3, $4, now()) where id = $1 returning *;`,
      [req.params.geoId, title, description, userId]
    )
    return res.send({ data: result.rows })
  } catch (e) {
    return processError(e, res)
  }
})

function convertDbRowToGeo(row) {
  return {
    id: row.id,
    imgUrl: row.img_url || `https://picsum.photos/400/400?id=${Math.random()}`,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    createdBy: row.created_by,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by
  }
}

module.exports = router
