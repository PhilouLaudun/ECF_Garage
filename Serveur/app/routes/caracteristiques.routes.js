//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const caracteristique = require("../controllers/caracteristique.controller");
  var router = require("express").Router();

  // charge les images pour un vehicules
  router.get("/byId", caracteristique.fetchCaractById);
  router.post("/create", caracteristique.createCaract);
  router.put("/update/:id", caracteristique.updateCaract);

  app.use("/api/caracteristiques", router);
};