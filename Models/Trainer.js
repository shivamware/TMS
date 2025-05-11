module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Trainer', {
    empId: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
  });
};
