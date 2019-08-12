export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    memberId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    isSent: DataTypes.BOOLEAN,
    date: DataTypes.BIGINT
  });

  Message.associate = (models) => {};

  Message.associate = (models) => {};

  return Message;
};
