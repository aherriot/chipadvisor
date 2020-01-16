const Router = require('express-promise-router')
const bodyParser = require('body-parser')
const chips = require('./chips')
const geos = require('./geos')
const reviews = require('./reviews')
const users = require('./users')

const router = new Router()
router.use(bodyParser.json())

router.use('/chips', chips)
router.use('/geos', geos)
router.use('/reviews', reviews)
router.use('/users', users)

module.exports = router
