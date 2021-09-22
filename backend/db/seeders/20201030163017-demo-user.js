'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
const { seed } = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        first_name: 'Demo',
        last_name: 'User',
        birthday: new Date(1990, 2, 1),
        email: 'sd.cotter45@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        description: 'I am a full stack software engineering student at App Academy.',
        location: 'Philadelphia, PA',
        current_job: 'Slave to the keyboard',
        profile_picture: 'https://media-exp1.licdn.com/dms/image/C4E03AQFOeMyDu2ii3A/profile-displayphoto-shrink_200_200/0/1617045884893?e=1637798400&v=beta&t=3Q-dbkLrtT2bSNQBEepRkwmaOl4dtV6MhkH-xODdEtM',
        background_image: 'https://media-exp1.licdn.com/dms/image/C4E16AQHcazg7sZUg8Q/profile-displaybackgroundimage-shrink_200_800/0/1617046261689?e=1637798400&v=beta&t=t-RcxroppKq4IoOSo8qAEOOsXKheEVWPoEIaZh5TmNo',
        team_id: 1,
        current_company: 1,
      },
      {
        email: 'pat@user.io',
        first_name: 'Pat',
        last_name: 'Man',
        birthday: new Date(1993, 9, 15),
        hashedPassword: bcrypt.hashSync('password'),
        description: 'I put gas pipes in the ground for a living.',
        location: 'Philadelphia, PA',
        current_job: 'Slave to the pipes.',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
        background_image: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg',
        team_id: 3,
        current_company: 2,
      },
      {
        email: 'guy@user.io',
        first_name: 'Guy',
        last_name: 'Man',
        birthday: new Date(1997, 12, 25),
        hashedPassword: bcrypt.hashSync('password'),
        description: 'I test websites for a living!',
        location: 'San Francisco, CA',
        current_job: 'Slave to the sites.',
        profile_picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
        background_image: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg',
        team_id: 3,
        current_company: 2,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
