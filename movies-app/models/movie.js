'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      // define association here
    //   console.log(models);
      Movie.belongsTo(models.ProductionHouse,{ foreignKey : "productionHouseId"})
      Movie.belongsToMany(models.Cast, { 
          through : models.MovieCast,
          foreignKey : "movieId" 
        })
    }
  };
  Movie.init({
    name: {
        type: DataTypes.STRING,
        validate :{
            notEmpty: {
                args : true,
                msg : "Nama tidak boleh kosong"        
            }
        }    
    },
    released_year:{
        type: DataTypes.INTEGER,
        validate :{
            notEmpty: {
                args : true,
                msg : "Tahun tidak boleh kosong"        
            }
        }    
    },
    genre: {
        type : DataTypes.STRING,
        allowNull : false,
        validate: {
            notNull:{
                args : true,
                msg : "Wajib memilih genre"
            }
        }
    },
    productionHouseId: DataTypes.INTEGER,
    rating : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
    hooks:{
        beforeCreate(instance, optional){
            if (instance.released_year % 4 === 0) {
                throw new Error('Ini adalah tahun sial')
            }
        }
    }
  });
  return Movie;
};