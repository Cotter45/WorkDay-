'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Follows', [
    { user_id: 1, company_id: 1, other_user: null },
    { user_id: 1, company_id: null, other_user: 2 },
    { user_id: 2, company_id: 2, other_user: null },
    
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Follows', null, {});
  }
};
