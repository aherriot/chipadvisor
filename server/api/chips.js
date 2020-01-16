const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.get('/:chipId', async (req, res) => {
  try {
    const result = await db.query(`select * from chips c where c.id = $1;`, [
      req.params.chipId
    ])

    if (result.rows[0]) {
      return res.send({ data: result.rows[0] })
    }

    return res.status(404).json({ status: 404 })
  } catch (e) {
    return processError(e, res)
  }
})

router.get('/', async (req, res) => {
  try {
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
      order by coalesce(avg(r.rating), 0) desc;`
    )
    res.send(rows)
  } catch (e) {
    processError(e, res)
  }
})

router.post('/', async (req, res) => {
  await db.query(`insert into chips () values ()`)
})

module.exports = router
