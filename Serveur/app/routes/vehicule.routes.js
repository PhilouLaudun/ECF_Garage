

module.exports = app => {
  const vehicule = require("../controllers/vehicule.controller.js");
   const {
     logReceivedData,
     uploadImage,
   } = require("../controllers/uploadImage");
  var router = require("express").Router();
// crée un vehicule
  router.post("/create", uploadImage, vehicule.create);
  // charge tous les vehicules
  router.get("/", vehicule.findAll);
  // Met à jour un véhicule
 router.put("/update/:id", vehicule.updateVehicule);
  
  app.use("/api/vehicules", router);
};
