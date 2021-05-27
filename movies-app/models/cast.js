'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    getFullname(){
        if (!this.last_name.length) {
            return `${this.first_name} ${this.first_name}`
        }
        return `${this.first_name} ${this.last_name}`
    }
    static associate(models) {
    Cast.belongsToMany(models.Movie, { 
        through : models.MovieCast,
        foreignKey : "castId"
        })
    }
  };
  Cast.init({
    first_name: {
        type: DataTypes.STRING,
        validate :{
            notEmpty: {
                args : true,
                msg : "Nama depan tidak boleh kosong"        
            }
        }    
    },
    last_name: {
        type: DataTypes.STRING,
        validate :{
            notEmpty: {
                args : true,
                msg : "Nama Belakang tidak boleh kosong"        
            }
        }    
    },
    phone_number: {
        type: DataTypes.STRING,
        validate :{
            notEmpty: {
                args : true,
                msg : "Nomer tidak boleh kosong"        
            },
            cekNumber(value){
                for (let i = 0; i < value.length; i++) {
                    if (!Number(value[i])) throw new Error('Nomer tidak valid') 
                }
            }
        }    
    },
    birth_year: DataTypes.INTEGER,
    gender:{
        type : DataTypes.STRING,
        allowNull : false,
        validate: {
            notNull:{
                args : true,
                msg : "Wajib memilih gender"
            }
        }
    }, 
    fullname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};