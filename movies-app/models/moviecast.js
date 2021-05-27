'use strict';
const {
  Model, where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCast extends Model {
    
    static associate(models) {

    }
  };
  MovieCast.init({
    movieId: DataTypes.INTEGER,
    castId: DataTypes.INTEGER,
    role: {
        type: DataTypes.STRING,
        validate :{
            notEmpty: {
                args : true,
                msg : "Role tidak boleh kosong"        
            }
        }    
    }
  }, {
    sequelize,
    modelName: 'MovieCast',
    hooks:{
        beforeCreate(instance){
            MovieCast.findOne({where : {
                movieId : instance.movieId
            }})
            .then(data =>{
                MovieCast.update(instance,{where :{
                    movieId : instance.movieId
                }})   
            })
            .catch(err =>{
                MovieCast.create(instance)
                console.log(err);
            })
        }
    }
  });
  return MovieCast;
};