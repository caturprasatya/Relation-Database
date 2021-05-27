const router = require('express').Router()
const ControllerCast  = require('../controllers/controllerCast')

//*home done
router.get('/', ControllerCast.showAll)
//*add done
router.get('/add', ControllerCast.toAdd)
router.post('/add', ControllerCast.addCast)
//*edit done
router.get('/edit/:id', ControllerCast.toEdit)
router.post('/edit/:id', ControllerCast.successEdit)
//*delete done
router.get('/delete/:id', ControllerCast.deleteCast)
//* see movie
router.get('/listmovie/:id', ControllerCast.listMovie)

module.exports = router