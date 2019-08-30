const { Pool } = require('pg')
const config = require('./config')

let dbConfig
if (process.env.NODE_ENV === 'production') {
  dbConfig = config.production
} else if (process.env.NODE_ENV === 'test') {
  dbConfig = config.test
} else {
  dbConfig = config.development
}

const pool = new Pool(dbConfig)

function query(text, params) {
  return pool.query(text, params)
}

async function verifyConnection() {
  return new Promise(async (resolve, reject) => {
    try {
      const testResult = await query('select 1=1 as result;')
      if (testResult.rows[0].result) {
        resolve()
      } else {
        reject(new Error('Failed to verify db connection.'))
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  query,
  verifyConnection
}
