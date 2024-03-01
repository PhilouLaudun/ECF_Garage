

module.exports = app => {
  const caracteristique = require("../controllers/caracteristique.controller");
  var router = require("express").Router();

  // charge les caractéristques pour un vehicule
  router.get("/byId", caracteristique.fetchCaractById);
  // crée des caractéristiques pour un véhicule
  router.post("/create", caracteristique.createCaract);
  // met à jour les caractéristiques pour un véhicule
  router.put("/update/:id", caracteristique.updateCaract);

  app.use("/api/caracteristiques", router);
};
