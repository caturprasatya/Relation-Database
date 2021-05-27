const old = require('../helper/age')
const { Cast, Movie } = require('../models')

class ControllerCast {
    static showAll(req, res){
        Cast
            .findAll({order:[['first_name', 'ASC']] })
            .then(data => res.render('cast',{ casts : data }))
            .catch(err => res.send(err))
    }

    static toAdd(req, res){
        res.render('addCast')
    }

    static addCast(req, res) {
        let {first_name, last_name, birth_year, phone_number, gender} = req.body
        let data = {first_name, last_name, birth_year, phone_number, gender}
        Cast
            .create(data)
            .then(data => res.redirect('/cast'))
            .catch(err => res.send(err))
    }

    static toEdit(req, res){
    let { id } = req.params
    Cast
        .findByPk(id)
        .then(data => res.render('editCast', {data}))
        .catch(err => res.send(err) )
    }

    static successEdit(req, res) {
        let { id } = req.params
        let data = req.body
        Cast
            .update(data, { where : { id : id }})
            .then(data => res.redirect('/cast'))
            .catch(err => res.send(err))
    }

    static deleteCast(req, res) {
        let {id} = req.params
        console.log(id);
        Cast
            .destroy({where :{
                id : id
            }})
            .then(_ => res.redirect('/cast'))
            .catch(_ => res.send(err))
    }
    static listMovie(req, res){
        let {id} = req.params
        // console.log(id);
        Cast
            .findByPk(id, {include : Movie})
            .then(data =>{
                res.render('listMovieCast', { cast : data, old })
            })
            .catch(err => res.send(err))
    }
}

module.exports = ControllerCast