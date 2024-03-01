


module.exports = app => {
  const options = require("../controllers/option.controller");
  var router = require("express").Router();

  // crée une option
  router.post("/create", options.createOpt);
  // charge toutes les options
  router.get("/", options.fetchOpt);

  app.use("/api/options", router);
};
