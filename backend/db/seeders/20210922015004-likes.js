'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Likes', [
     { user_id: 1, post_id: 1, comment_id: null, company_id: null },
     { user_id: 2, post_id: 1, comment_id: null, company_id: null },
     { user_id: 3, post_id: 1, comment_id: null, company_id: null },
     { user_id: 1, post_id: 2, comment_id: null, company_id: null },
     { user_id: 2, post_id: 2, comment_id: null, company_id: null },

   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Likes', null, {});
  }
};
