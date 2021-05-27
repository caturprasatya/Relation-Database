'use strict';
const fs = require('fs');
// const { JSON } = require('sequelize/types');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data =JSON.parse(fs.readFileSync('./movies.json', 'utf8'))

    data.forEach(prodHouse => {
        prodHouse.createdAt = new Date()
        prodHouse.updatedAt = new Date()
    });

    return queryInterface.bulkInsert('ProductionHouses', data)
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('ProductionHouses', null)
  }
};
