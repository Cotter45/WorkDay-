'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Roles', [
     { title: 'Superuser', user_id: 1, company_id: 1 },
     { title: 'Superuser', user_id: 2, company_id: 2 },
     { title: 'TeamLead', user_id: 3, company_id: 2 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Roles', null, {});
  }
};
