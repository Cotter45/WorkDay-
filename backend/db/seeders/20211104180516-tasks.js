'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tasks', [
      { title: 'Task 1', priority: 1, userId: 1, description: 'Task 1 description', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Task 2', priority: 2, userId: 1, description: 'Task 2 description', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Task 3', priority: 3, userId: 1, description: 'Task 3 description', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Task 4', priority: 1, userId: 1, description: 'Task 4 description', createdAt: new Date(), updatedAt: new Date() },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};
