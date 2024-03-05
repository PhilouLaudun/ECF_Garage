module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "garage",
  Dialect: "mysql",
  logging: true, // Active les logs de requêtes SQL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};