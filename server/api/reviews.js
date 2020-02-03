const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.get('/', async (req, res) => {
  const { chipId } = req.query
  if (chipId) {
    try {
      let result = await db.query(
        `select r.*, u.username
        from reviews r
        left join users u on r.user_id = u.id
        where r.chip_id = $1
        order by r.created_at desc;`,
        [chipId]
      )

      res.json({ data: result.rows.map(convertDbRowToReview) })
    } catch (e) {
      return processError(e, res)
    }
  }
})

router.get('/byUserId/:userId', async (req, res) => {
  const { userId } = req.params
  if (userId) {
    try {
      let result = await db.query(
        `select r.*, c.title as chip_title
        from reviews r
        left join chips c on c.id = r.chip_id
        where r.user_id = $1
        order by r.created_at;`,
        [userId]
      )

      res.json({ data: result.rows.map(convertDbRowToReview) })
    } catch (e) {
      return processError(e, res)
    }
  }
})

router.post('/', async (req, res) => {
  const { userId, chipId, rating, description } = req.body

  if (!userId) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_USER_ID',
      message: 'Field userId is required.'
    })
  } else if (!chipId) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_CHIP_ID',
      message: 'Field chipId is required.'
    })
  } else if (rating == null) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_RATING',
      message: 'Field rating is required.'
    })
  } else if (
    rating !== 1 &&
    rating !== 2 &&
    rating !== 3 &&
    rating !== 4 &&
    rating !== 5
  ) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_RATING',
      message: 'Field rating must be an integer between 1 and 5.'
    })
  } else if (!description) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_DESCRIPTION',
      message: 'Field description is required.'
    })
  } else if (description.length < 60 || description.length > 1000) {
    return res.status(400).json({
      status: 400,
      code: 'INVALID_DESCRIPTION',
      message: 'Field description must be between 60 and 1000 characters.'
    })
  }

  try {
    const result = await db.query(
      `insert into reviews
      (user_id, chip_id, rating, description)
      values
      ($1, $2, $3, $4) 
      returning *;`,
      [userId, chipId, rating, description]
    )
    return res.json({ data: convertDbRowToReview(result.rows[0]) })
  } catch (e) {
    if (e.code === '23505') {
      return res.status(400).json({
        status: 400,
        code: 'DUPLICATE_REQUEST',
        message: 'You cannot submit more than one review for the same chip.'
      })
    } else {
      return processError(e, res)
    }
  }
})

function convertDbRowToReview(row) {
  return {
    id: row.id,
    userId: row.user_id,
    username: row.username,
    chipId: row.chip_id,
    chipTitle: row.chip_title,
    rating: parseFloat(row.rating),
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

module.exports = router
