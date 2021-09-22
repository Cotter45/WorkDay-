'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Teams', [
     { name: 'May Cohort', company_id: 1 },
     { name: 'Instructors', company_id: 1 },
     { name: 'Pipe Crew', company_id: 2 },
     { name: 'Dirt Crew', company_id: 2 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Teams', null, {});
  }
};
