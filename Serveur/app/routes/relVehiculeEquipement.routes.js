//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const relVehiculeEquipement = require("../controllers/relvehiculeequipements.controller");
  var router = require("express").Router();

  // charge les relation vehicule -équipements pour un vehicule
  router.get("/list", relVehiculeEquipement.listeRelVE);
  // crée une relation vehicule -équipement
  router.post("/create", relVehiculeEquipement.createRelVE);
  // supprime une relation vehicule -équipement
  router.delete("/:id", relVehiculeEquipement.deleteRelVE); //

  app.use("/api/relVehiculeEquipement", router);
};
