const router = require('express').Router()
const routerProdHouse = require('./productionHouse')
const routerMovie = require('./movie')
const routerCast = require('./cast')

router.get('/',(req, res) =>{
    res.send('<h1>good</h1>')
})

router.use('/prodhouses',routerProdHouse)
router.use('/movie',routerMovie)
router.use('/cast', routerCast)


module.exports = router