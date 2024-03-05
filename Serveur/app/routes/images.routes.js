

const { uploadImage } = require("../controllers/uploadImage");

module.exports = app => {
  const image = require("../controllers/image.controller");
  var router = require("express").Router();

  // charge les images pour un vehicule
  router.get("/byId", image.findImageById);
  // crée des images pour un vehicule
  router.post("/ajout", uploadImage,image.ajout);

  app.use("/api/images", router);
};
