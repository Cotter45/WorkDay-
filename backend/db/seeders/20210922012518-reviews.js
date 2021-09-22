'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
     { rating: 5, work_life: 2, perks: 2, review: 'Not many perks but worth every second!', reviewer_id: 1, company_id: 1, user_id: null },
     { rating: 1, work_life: 1, perks: 1, review: 'It was absolutely terrible.', reviewer_id: 2, company_id: 2, user_id: null },
     { rating: 5, work_life: null, perks: null, review: 'He is fantastic!', reviewer_id: 2, company_id: null, user_id: 1 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
