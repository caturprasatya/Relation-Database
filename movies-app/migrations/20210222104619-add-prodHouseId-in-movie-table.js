'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('Movies', 'productionHouseId', {
        type : Sequelize.INTEGER,
        references : {
            model : "ProductionHouses",
            key : "id"
        }
    })
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('Movies', 'productionHouseId')
  }
};
