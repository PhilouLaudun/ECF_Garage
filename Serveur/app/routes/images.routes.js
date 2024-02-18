//const { logReceivedData } = require("../controllers/uploadImage.js");

const { uploadImage } = require("../controllers/uploadImage");

module.exports = app => {
  const image = require("../controllers/image.controller");
  var router = require("express").Router();

  // charge les images pour un vehicules
  router.get("/byId", image.findImageById);
  // crée un vehicule
  router.post("/ajout", uploadImage, image.ajout);

  app.use("/api/images", router);
};
