'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      background_image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      num_employees: {
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      founded: {
        type: Sequelize.DATE,
        allowNull: false 
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies');
  }
};