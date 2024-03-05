const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.Dialect,
  port: 3306, //mysql sur xampp
  operatorsAliases: 0,
  logging: true, // Active les logs de requêtes SQL
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.utilisateurs = require("./utilisateurs.model.js")(sequelize, Sequelize);
db.vehicules = require("./vehicules.model.js")(sequelize, Sequelize);
db.images = require("./images.model.js")(sequelize, Sequelize);
db.caracteristiques = require("./caracteristiques.model.js")(
  sequelize,
  Sequelize
);
db.caracteristiques = require("./caracteristiques.model.js")(
  sequelize,
  Sequelize
);
db.equipements = require("./equipements.model.js")(
  sequelize,
  Sequelize
);
db.options = require("./options.model.js")(
  sequelize,
  Sequelize
);
db.relvehiculeequipements = require("./relvehiculeequipements.model.js")(sequelize, Sequelize);
db.relvehiculeoptions = require("./relvehiculeoptions.model.js")(
  sequelize,
  Sequelize
);
db.blogs = require("./blogs.model.js")(sequelize, Sequelize);

db.horaires = require("./horaires.model.js")(sequelize, Sequelize);

db.datapresentations = require("./datapresentations.model")(sequelize, Sequelize);
db.dataservices = require("./dataservices.model.js")(sequelize, Sequelize)

// Déclarer les associations "belongsToMany" ici
db.vehicules.belongsToMany(db.equipements, {
  through: db.relvehiculeequipements,
  foreignKey: "fk_vehicule",
});

db.equipements.belongsToMany(db.vehicules, {
  through: db.relvehiculeequipements,
  foreignKey: "fk_equipement",
});
db.vehicules.belongsToMany(db.options, {
  through: db.relvehiculeoptions,
  foreignKey: "fk_vehicule",
});
db.options.belongsToMany(db.vehicules, {
  through: db.relvehiculeoptions,
  foreignKey: "fk_option",
});

module.exports = db;
