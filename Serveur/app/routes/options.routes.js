//const { logReceivedData } = require("../controllers/uploadImage.js");


module.exports = app => {
  const options = require("../controllers/option.controller");
  var router = require("express").Router();

  // charge les images pour un vehicules
  router.post("/create", options.createOpt);
  // charge tous les equipements
  router.get("/", options.fetchOpt);

  app.use("/api/options", router);
};
