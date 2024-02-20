//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const horaire = require("../controllers/horaire.controller.js");
  var router = require("express").Router();
  // charge tous les horaires
  router.get("/", horaire.findAll);

  // met à jour un horaire
  router.put("/update", horaire.update);

  app.use("/api/horaire", router);
};
