const router = require('express').Router()
const Controller = require('../controllers/controllerProdHouse')

router.get('/',Controller.showAll)

module.exports = router