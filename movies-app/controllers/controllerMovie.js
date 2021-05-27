const { Movie, ProductionHouse, Cast, MovieCast } = require('../models');
// const checkErr = require('../helper/solveErr')

class ControllerMovie{
    static showAll(req, res){
        let movies
        Movie
            .findAll({order : [['released_year', 'ASC']], include : "ProductionHouse"})
            .then(data =>{
                movies = data
                res.render('movie', { movies } )
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static movePageAdd(req, res){
        let {error} = req.query
        res.render('add', { error })
    }
    
    static addMovie(req, res){
        let { name, year, genre } = req.body
        
        Movie.create({
            name,
            released_year : year,
            genre
        })
        .then(dat =>{
            res.redirect('/movie')
        })
        .catch(err =>{
            res.redirect(`/movie/add?error=${err}`)
        })
    }

    static movePageAddCast(req, res){
        let { id } = req.params
        let {error} = req.query
        // console.log(req.query);
        let movies = []
        Movie
            .findByPk(id, { include : Cast})
            .then(data => {
                movies = data
                return Cast.findAll()
            })
            .then(data =>{
                res.render('addCastToMovie', {casts : data, movies, error})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCastToMovie(req, res){
        let {id} = req.params
        let {castId, role} = req.body
        let data = {movieId : id, castId, role}
        
        MovieCast
            .create(data)
            .then(data => res.redirect(`/movie/add/cast/${id}`))
            .catch(err => {
                res.redirect(`/movie/add/cast/${id}?error=${err}`)
            })
    }


    static movePageEdit(req, res){
        let {id} = req.params
        let{ error }= req.query
        // console.log(error);
        let movies 
        Movie
            .findByPk(id)
            .then(data =>{
                movies = data
                return ProductionHouse.findAll()
            })
            .then(prod =>{
                res.render('edit', {movies, prod, error})
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static doneEdit(req,res){
        let {id} = req.params
        let {name, year, genre, productionHouseId} = req.body
        
        let update = {
            name : name,
            released_year : year,
            genre : genre,
            productionHouseId : productionHouseId
            }
        Movie
            .update(update, {
                where :{
                    id : id
                }
            })
            .then(_ =>{
                res.redirect('/movie')
            })
            .catch(err =>{
                res.redirect(`/movie/edit/${id}?error=${err}`)
            })
    }

    static deleteMovie(req, res) {
        let {id} =req.params
        Movie
            .destroy({
                where :{
                    id : id
                }
            })
            .then(data =>{
                res.redirect('/movie')
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = ControllerMovie