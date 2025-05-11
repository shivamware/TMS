const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Trainer = require('./Trainer')(sequelize, Sequelize);
db.Subject = require('./Subject')(sequelize, Sequelize);

// Association
db.Trainer.belongsToMany(db.Subject, { through: 'TrainerSubjects' });
db.Subject.belongsToMany(db.Trainer, { through: 'TrainerSubjects' });

module.exports = db;
