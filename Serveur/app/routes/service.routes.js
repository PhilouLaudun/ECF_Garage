//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const service = require("../controllers/dataservice.controller");
  var router = require("express").Router();
  // charge tous les services
  router.get("/", service.findAll);

  // met à jour un service
  router.put("/update/:id", service.update);

  app.use("/api/service", router);
};
