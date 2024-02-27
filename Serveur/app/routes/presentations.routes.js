//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const presentation = require("../controllers/datapresentation.controller");
  var router = require("express").Router();
  // charge tous les horaires
  router.get("/", presentation.findAll);

  // met à jour un horaire
  router.put("/update/:id", presentation.update);

  app.use("/api/presentation", router);
};
