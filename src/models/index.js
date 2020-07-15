const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Todo = require('./todo')(sequelize, Sequelize);
db.Goal = require('./goal')(sequelize, Sequelize);
db.Stone = require('./stone')(sequelize, Sequelize);
db.Phrase = require('./phrase')(sequelize, Sequelize);
db.Check = require('./check')(sequelize, Sequelize);
db.Diary = require('./diary')(sequelize, Sequelize);

db.User.hasOne(db.Todo);
db.Todo.belongsTo(db.User);
db.User.hasOne(db.Stone);
db.Stone.belongsTo(db.User);
db.User.hasOne(db.Goal);
db.Goal.belongsTo(db.User);
db.User.hasMany(db.Check);
db.Check.belongsTo(db.User);
db.User.hasMany(db.Diary);
db.Diary.belongsTo(db.User);

module.exports = db;