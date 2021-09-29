"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      birthday: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn("now")
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: 'Fill me in!'
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: 'Fill me in!'
      },
      current_job: {
        type: Sequelize.STRING,
        defaultValue: 'Fill me in!'
      },
      profile_picture: {
        type: Sequelize.STRING,
        defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png'
      },
      background_image: {
        type: Sequelize.STRING,
        defaultValue: 'https://media-exp1.licdn.com/dms/image/C4E16AQHcazg7sZUg8Q/profile-displaybackgroundimage-shrink_200_800/0/1617046261689?e=1637798400&v=beta&t=t-RcxroppKq4IoOSo8qAEOOsXKheEVWPoEIaZh5TmNo'
      },
      team_id: {
        type: Sequelize.INTEGER, 
        references: { model: 'Teams' }
      },
      current_company: {
        type: Sequelize.INTEGER,
        references: { model: 'Companies' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
