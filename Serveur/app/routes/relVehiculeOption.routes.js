//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const relVehiculeOption = require("../controllers/relvehiculeoptions.controller.js");
  var router = require("express").Router();

  // charge les images pour un vehicule
  router.get("/list", relVehiculeOption.listeRelVO);

  router.post("/create", relVehiculeOption.createRelVO);
  // supprime une prestation
  router.delete("/:id", relVehiculeOption.deleteRelVO); //

  app.use("/api/relVehiculeOption", router);
};
