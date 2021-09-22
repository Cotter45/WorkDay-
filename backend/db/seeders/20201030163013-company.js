'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Companies', [
     { 
      name: 'App Academy', 
      email: 'Aa@aa.io', 
      phone: '1231231234', 
      profile_picture: 'https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png',
      background_image: 'https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/6037f8ccf1b9bc65d58c4dc9_NewRed-FullaALogo.png',
      description: 'App Academy is a full-stack web development bootcamp featuring, 16 - 24 week programs as well as a part time option.',
      num_employees: 250,
      founded: new Date(2012),
      location: 'Online'
      },
      { 
      name: 'Allan Myers', 
      email: 'AllanM@aa.io', 
      phone: '1231231235', 
      profile_picture: 'https://www.allanmyers.com/wp-content/uploads/sb-instagram-feed-images/allanmyersinc.jpg',
      background_image: 'https://www.enr.com/ext/resources/Issues/MidAtlantic_Issues/2017/August/21-Aug/F25-RVA-8-13-16-27.jpg?1502734209',
      description: 'We build things that matter. The clean water that comes from your faucet, the transportation network that connects you to essential goods and services, the neighborhood where you live and raise your family. We build careers and provide a pathway to the American Dream. We are your neighbors, working every day to improve the world around us, making it Better, Faster, Safe.',
      num_employees: 2000,
      founded: new Date(1939),
      location: 'East Coast'
      },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Companies', null, {});
  }
};
