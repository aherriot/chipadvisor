const Router = require('express-promise-router')
const db = require('./db')

const router = new Router()

router.post('/reviews/:chipId', async (req, res) => {})

router.get('/chips/:chipId', async (req, res) => {
  try {
    const result = await db.query(`select * from chips c where c.id = $1`, [
      req.params.chipId
    ])

    console.log(result)
    if (result.rows[0]) {
      return res.send({ data: result.rows[0] })
    }

    return res.status(404).json({ status: 404 })
  } catch (e) {
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
})

router.get('/chips', async (req, res) => {
  const { rows } = await db.query(
    `select 
        c.id, 
	      c.img_url, 
	      c.title, 
	      c.description,
	      avg(r.rating) 
      from chips c
      left join reviews r on c.id = r.chip_id
      group by c.id 
      order by coalesce(avg(r.rating), 0) desc`
  )
  res.send(rows)
})

router.post('/chips', async (req, res) => {
  await db.query(`insert into chips () values ()`)
})

module.exports = router
