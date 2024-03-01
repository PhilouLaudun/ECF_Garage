

module.exports = app => {
  const presentation = require("../controllers/datapresentation.controller");
  var router = require("express").Router();
  // charge toutes les presentations
  router.get("/", presentation.findAll);

  // met à jour une presentation
  router.put("/update/:id", presentation.update);

  app.use("/api/presentation", router);
};
