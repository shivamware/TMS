module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Subject', {
    name: { type: DataTypes.STRING, unique: true },
    description: DataTypes.STRING,
  });
};
