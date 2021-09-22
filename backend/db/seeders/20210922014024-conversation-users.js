'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Conversation_Users', [
     { user_id: 1, conversation_id: 1 },
     { user_id: 2, conversation_id: 1 },
     { user_id: 1, conversation_id: 2 },
     { user_id: 3, conversation_id: 2 },
     { user_id: 1, conversation_id: 3 },
     { user_id: 2, conversation_id: 3 },
     { user_id: 3, conversation_id: 3 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Conversation_Users', null, {});
  }
};
