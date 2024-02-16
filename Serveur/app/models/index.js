const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.Dialect,
  port: 3306, //mysql sur xampp
  operatorsAliases: 0,
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
db.relvehiculeequipements = require("./relvehiculeequipements.model.js")(sequelize, Sequelize);
/*db.prestation = require("./prestation.model.js")(sequelize, Sequelize);
db.relstructprestas = require("./relstructpresta.model.js")(sequelize, Sequelize);*/


// Déclarer les associations "belongsToMany" ici
db.vehicules.belongsToMany(db.equipements, {
  through: db.relvehiculeequipements,
  foreignKey: "fk_vehicule",
});

db.equipements.belongsToMany(db.vehicules, {
  through: db.relvehiculeequipements,
  foreignKey: "fk_equipement",
});


module.exports = db;
