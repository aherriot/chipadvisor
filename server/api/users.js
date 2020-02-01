const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

const KEY_CONSTRAINT = '23505'

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`select * from users;`)
    return res.json({ data: result.rows.map(convertDbRowToUser) })
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
  } else if (username.length < 4 || username.length > 12) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_USERNAME',
      message: 'Field username is must be between 4 and 12 characters.'
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
      message: 'Field email must be a tripadvisor email address.'
    })
  }

  try {
    const result = await db.query(
      `insert into users (username, email) values ($1, $2) returning *;`,
      [username.toLowerCase(), email.toLowerCase()]
    )

    return res.json({ data: result.rows[0] })
  } catch (e) {
    // if the user already exists, return the pre-existing user
    if (e && e.code === KEY_CONSTRAINT) {
      const result = await db.query(
        `select * from users where username = $1;`,
        [username.toLowerCase()]
      )
      return res.json({ data: result.rows[0] })
    }
    return processError(e, res)
  }
})

function convertDbRowToUser(row) {
  return {
    id: row.id,
    username: row.username,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

module.exports = router
