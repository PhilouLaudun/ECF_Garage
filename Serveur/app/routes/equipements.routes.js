


module.exports = app => {
  const equipements = require("../controllers/equipement.controller.js");
  var router = require("express").Router();

  // crée un équipement
  router.post("/create", equipements.createEquip);
  // charge tous les equipements
  router.get("/", equipements.fetchEquip);

  app.use("/api/equipements", router);
};
