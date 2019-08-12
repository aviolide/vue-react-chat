export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    country: DataTypes.STRING,
    role: {type: DataTypes.STRING, defaultValue: 'user'}
  });

  Member.associate = (models) => {};

  Member.associate = (models) => {};

  return Member;
};
