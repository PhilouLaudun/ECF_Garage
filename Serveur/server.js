const express = require("express");//couche construite au-dessus du Node js qui aide à gérer les serveurs et les routes
const cors = require('cors');//fonctionnalité de sécurité du navigateur qui limite les requêtes HTTP
const app = express(); // variable simplifiant l'utilisation d'express

var corsOptions = { origin: true, allowAll: true };// option pour utiliser cors
app.use(cors(corsOptions)); // express utilise CORS
app.use(express.json()); // analyse les requêtes entrantes avec des charges utiles JSON et est basé sur body-parser
app.use(express.urlencoded({ extended: true })); // analyse les requêtes entrantes avec des charges utiles codées en URL,basé sur body-parser
app.use("/uploads", express.static("uploads")); // pour eviter les erreurs lors des appels au repertoire uploads du serveur pour afficher les images dans le client
const db = require("./app/models");
db.sequelize.sync();
// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'application Garage - init");
});

// Autres routes et configurations...
require("./app/routes/login.routes")(app);
require("./app/routes/vehicule.routes")(app);
require("./app/routes/images.routes")(app);
require("./app/routes/caracteristiques.routes")(app);
// Démarrage du serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
