const db = require('../db')

function processError(e, res) {
  if (e.code === 'ECONNREFUSED') {
    res.status(500).json({
      status: 500,
      code: 'DB_CONNECTION_REFUSED',
      text: 'Database connection refused.'
    })
  } else {
    res.status(500).json({ status: 500, code: 'UNKNOWN_ERROR', error: e })
  }
}

async function recordError(type, userId, location, action, details) {
  return await db.query(
    `insert into errors
    (type, user_id, location, action, details)
    values ($1, $2, $3, $4, $5)
    returning *;`,
    [type, userId, location, action, details]
  )
}

module.exports = {
  processError,
  recordError
}
