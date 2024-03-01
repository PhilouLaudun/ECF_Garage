//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const relVehiculeOption = require("../controllers/relvehiculeoptions.controller.js");
  var router = require("express").Router();

  // charge les relations vehicule-options pour un vehicule
  router.get("/list", relVehiculeOption.listeRelVO);
  // crée une relation vehicule-options
  router.post("/create", relVehiculeOption.createRelVO);
  // supprime une  relation vehicule-options
  router.delete("/:id", relVehiculeOption.deleteRelVO); //

  app.use("/api/relVehiculeOption", router);
};
