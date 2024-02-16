//const { logReceivedData } = require("../controllers/uploadImage.js");

const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const equipements = require("../controllers/equipement.controller.js");
  var router = require("express").Router();

  // charge les images pour un vehicules
  router.post("/create", equipements.createEquip);
  // charge tous les equipements
  router.get("/", equipements.fetchEquip);

  app.use("/api/equipements", router);
};
