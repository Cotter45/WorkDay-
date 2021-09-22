'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Jobs', [
    { 
      title: 'Jr Software Engineer',
      description: 'Hunting bugs and writing documentation.',
      location: 'Online',
      pay: 75000,
      company_id: 1,
      poster_id: 1
    },
    {
      title: 'Pipe Layer',
      description: 'Installing different types of pipe for Storm, water and sanitary systems.',
      location: 'Everywhere',
      pay: 75000,
      company_id: 2,
      poster_id: 2
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Jobs', null, {});
  }
};
