const Router = require('express-promise-router')

const db = require('../db')
const { processError, recordError } = require('./utils')

const router = new Router()

router.get('/', async (req, res) => {
  const { userId } = req.query
  try {
    let result
    if (userId === undefined) {
      result = await db.query(
        `select * from errors 
         order by created_at desc;`
      )
    } else {
      result = await db.query(
        `select * from errors 
        where user_id = $1
        order by created_at desc;`,
        [userId]
      )
    }
    return res.send({ data: result.rows })
  } catch (e) {
    console.error(e)
    return processError(e, res)
  }
})

router.post('/', async (req, res) => {
  const { userId, location, action, details } = req.body
  try {
    const result = await recordError(
      'CLIENT',
      parseInt(userId, 10) || null,
      location,
      action,
      details
    )
    return res.send({ data: result.rows[0] })
  } catch (e) {
    console.error(e)
    return processError(e, res)
  }
})

module.exports = router
