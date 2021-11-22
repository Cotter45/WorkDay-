'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
     queryInterface.addColumn('Images', 'task_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Images' }
     }),
     queryInterface.addColumn('Requirements', 'task_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Requirements' }
      }),
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('Images', 'task_id'),
      queryInterface.removeColumn('Requirements', 'task_id'),
    ]);
  }
};
