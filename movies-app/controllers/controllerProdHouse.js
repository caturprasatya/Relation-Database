const { ProductionHouse } = require('../models')

class ControllerProdHouse {
    static showAll(req, res) {
        ProductionHouse
            .findAll({
                order : [['name_prodHouse', 'ASC']]
            })
            .then(data =>{
                res.render('prodHouse', { prodHouse : data })
            })
            .catch(err =>{
                res.send(err)
            })
    }
}

module.exports = ControllerProdHouse