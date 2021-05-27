const router = require('express').Router()
const Controller = require('../controllers/controllerMovie')

//*home done
router.get('/',Controller.showAll)
//* add done
router.get('/add',Controller.movePageAdd)
router.post('/add',Controller.addMovie)
//* add cast done
router.get('/add/cast/:id',Controller.movePageAddCast)
router.post('/add/cast/:id',Controller.addCastToMovie)
//* edit done
router.get('/edit/:id',Controller.movePageEdit)
router.post('/edit/:id',Controller.doneEdit)
//* delete done 
router.get('/delete/:id',Controller.deleteMovie)

module.exports = router