'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.TEXT,
    sender_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'sender_id' });
    Message.belongsTo(models.Conversation, { foreignKey: 'conversation_id' });
  };
  return Message;
};