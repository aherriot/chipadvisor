const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`select * from geos;`)
    return res.send({ data: result.rows })
  } catch (e) {
    return processError(e, res)
  }
})

router.post('/', async (req, res) => {
  const { title, description, user_id } = req.body
  try {
    const result = await db.query(
      `insert into geos (title, description, created_by) values ($1, $2, $3) returning *;`,
      [(title, description, user_id)]
    )
    return res.send({ data: result.rows })
  } catch (e) {
    return processError(e, res)
  }
})

router.put('/:geoId', async (req, res) => {
  const { title, description, user_id } = req.body
  try {
    const result = await db.query(
      `update geos (title, description, updated_by, updated_at) values ($2, $3, $4, $5) where id = $1 returning *;`,
      [req.params.geoId, title, description, user_id]
    )
    return res.send({ data: result.rows })
  } catch (e) {
    return processError(e, res)
  }
})

module.exports = router
