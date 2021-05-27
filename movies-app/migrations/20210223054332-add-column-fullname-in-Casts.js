'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Casts', 'fullname', {type : Sequelize.STRING})
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Casts', 'fullname')
  }
};
