//const { logReceivedData } = require("../controllers/uploadImage.js");

module.exports = app => {
  const login = require("../controllers/login.controller.js");
  var router = require("express").Router();
  // verifie l'utilisateur
  router.post("/", login.login);
  // charge tous les utilisateurs
  router.get("/", login.findAll);
  // crée un agent
  router.post("/create",login.create);
  // met à jour un agent
  router.put("/update/:id", login.update);

  
  app.use("/api/login", router);
};
