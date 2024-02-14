//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const image = require("../controllers/image.controller");
  var router = require("express").Router();

  // charge les images pour un vehicules
  router.get("/byId", image.findImageById);


  
  app.use("/api/images", router);
};
