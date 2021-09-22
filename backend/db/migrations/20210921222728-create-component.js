'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      component: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      contents: {
        type: Sequelize.TEXT
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Components' }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects' }
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Teams' }
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Companies' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Components');
  }
};