const Router = require('express-promise-router')
const db = require('../db')
const { processError } = require('./utils')

const router = new Router()

router.post('/:chipId', async (req, res) => {})

module.exports = router
