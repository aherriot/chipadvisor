const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`select * from users;`)
    return res.json({ data: result.rows })
  } catch (e) {
    return processError(e, res)
  }
})

router.post('/', async (req, res) => {
  const { username, email } = req.body
  if (!username) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_USERNAME',
      message: 'Field username is required.'
    })
  } else if (username.length < 6 || username.length > 20) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_USERNAME',
      message: 'Field username is must be between 6 and 20 characters.'
    })
  } else if (!email) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_EMAIL',
      message: 'Field email is required.'
    })
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@tripadvisor.com/.test(
      email
    )
  ) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_EMAIL',
      message: 'Field username is required.'
    })
  }

  try {
    const result = await db.query(
      `insert into users (username, email) values ($1, $2) returning *;`,
      [req.body.username, req.body.email]
    )

    return res.json({ data: result.rows[0] })
  } catch (e) {
    return processError(e, res)
  }
})

module.exports = router
