'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Messages', [
     { message: 'Heyoo', sender_id: 1, conversation_id: 1 },
     { message: 'Heyoo', sender_id: 2, conversation_id: 1 },
     { message: 'Hey', sender_id: 1, conversation_id: 3 },
     { message: 'Heyo', sender_id: 2, conversation_id: 3 },
     { message: 'Heyoo', sender_id: 3, conversation_id: 3 },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Messages', null, {});
  }
};
