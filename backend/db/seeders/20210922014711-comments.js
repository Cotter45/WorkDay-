'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     { comment: 'This makes no sense', image_url: null, user_id: 1, post_id: 3 },
     { comment: 'I have been trying to reach you about your cars extended warranty', image_url: null, user_id: 2, post_id: 1 },
     { comment: 'I have been trying to reach you', image_url: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg', user_id: 3, post_id: 1 },
     { comment: 'I have been trying to reach you about your cars extended warranty', image_url: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg', user_id: 2, post_id: 1 },
     { comment: 'I have been trying to reach you about your cars extended warranty', image_url: null, user_id: 2, post_id: 1 },
     { comment: 'I have been trying to reach you about your cars extended warranty', image_url: null, user_id: 2, post_id: 1 },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
