//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const relVehiculeEquipement = require("../controllers/relvehiculeequipements.controller.js");
  var router = require("express").Router();

  // charge les images pour un vehicule
  router.get("/list", relVehiculeEquipement.listeRelVE);

  router.post("/create", relVehiculeEquipement.createRelVE);
  // supprime une prestation
  router.delete("/:id", relVehiculeEquipement.deleteRelVE); //

  app.use("/api/relVehiculeEquipement", router);
};
