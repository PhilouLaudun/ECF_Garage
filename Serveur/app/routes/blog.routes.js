

module.exports = app => {
  const blog = require("../controllers/blog.controller.js");
  var router = require("express").Router();
  // charge tous les avis
  router.get("/", blog.findAll);
  // crée un avis
  router.post("/create", blog.create);
  // met à jour un avis
  router.put("/update/:id", blog.update);
  // supprime un avis
  router.delete("/delete/:id", blog.delete); //

  app.use("/api/blog", router);
};
