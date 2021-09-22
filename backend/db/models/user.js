'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { 
        id, 
        first_name, 
        last_name, 
        birthday, 
        description, 
        location, 
        current_job,
        profile_picture,
        background_image,
        team_id,
        current_company, 
        email } = this; // context will be the User instance
      return { 
        id, 
        first_name, 
        last_name, 
        birthday, 
        description, 
        location, 
        current_job,
        profile_picture,
        background_image,
        team_id,
        current_company, 
        email 
      };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
            email: credential,
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ 
      email,
      password, 
      first_name, 
      last_name }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        email,
        hashedPassword,
        first_name,
        last_name 
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      // define association here

      const conversations = {
        through: 'Conversation_User',
        foreignKey: 'conversation_id',
        otherKey: 'user_id'
      }

      User.belongsTo(models.Team, { foreignKey: 'team_id'});
      User.belongsTo(models.Company, { foreignKey: 'current_company'});
      User.belongsTo(models.Employee_Approval, { foreignKey: 'user_id' });
      User.hasMany(models.Follow, { foreignKey: 'user_id' });
      User.hasMany(models.Follow, { foreignKey: 'other_user' });
      User.belongsTo(models.Role, { foreignKey: 'user_id' });
      User.hasMany(models.Review, { foreignKey: 'Review' });
      User.hasMany(models.Review, { foreignKey: 'user_id' });
      User.hasMany(models.Job, { foreignKey: 'poster_id' });
      User.hasMany(models.Save_for_Later, { foreignKey: 'user_id' });
      User.hasMany(models.Application, { foreignKey: 'user_id' });
      User.belongsToMany(models.Conversation_User, conversations);
      User.hasMany(models.Message, { foreignKey: 'sender_id' });
      User.hasMany(models.Post, { foreignKey: 'poster_id' });
      User.hasMany(models.Comment, { foreignKey: 'user_id' });
      User.hasMany(models.Component, { foreignKey: 'user_id' });
      User.hasMany(models.Image, { foreignKey: 'user_id' });
      User.hasMany(models.Like, { foreignKey: 'user_id' });
    }
  };
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};