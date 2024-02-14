// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index.js");
const Vehicule = db.vehicules; 
const Image = db.images;
const op = db.Sequelize.Op;

// Charge tous les partenaires de la base de données
exports.findAll = (req, res) => {
  // test si la table est vide
  console.log("charge les vehicules")
  Vehicule.count()
    .then((count) => {
      var okay = "true"; // léve le drapeau de validation si les données sont trouvées
      if (count === 0) {
        // La table est vide
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Table vehicule vide, veuillez saisir un vehicule  ",
          okay,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        // La table contient des enregistrements, effectuez la recherche
        Vehicule.findAll()
          .then((data) => {
            res.send({ data, okay }); // renvoi les données
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Une erreur est intervenue lors de la recherche des vehicules.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est intervenue lors de la recherche des vehicules.",
      });
    });
};

// Crée un nouveau vehicule
exports.create = (req, res) => {
  // Affichage des données du formulaire envoyées depuis le frontend
  console.log("Données du formulaire :", req.body);

  // Affichage des fichiers téléversés avec Multer
  console.log("Fichiers téléversés :", req.files);
  // Récupération de l'URL de la première photo (si elle existe)
  const firstImageUrl =
    req.files.length > 0 ? `uploads/${req.files[0].filename}` : null;
  
  const newvehicule = {
    Marque: req.body.Marque,
    Modele: req.body.Modele,
    Modeleprecis: req.body.Modeleprecis,
    Annee: parseInt(req.body.Annee), // Convertir la valeur en un nombre entier
    Kilometrage: parseInt(req.body.Kilometrage), // Convertir également si nécessaire
    Energie: req.body.Energie,
    Transmission: req.body.Transmission,
    Prix: parseInt(req.body.Prix),
    UrlPhoto: firstImageUrl, // Ajout de l'URL de la première photo à newvehicule
  };

  Vehicule.create(newvehicule)
    .then((newVehicule) => {
      // Récupérez l'ID du véhicule créé
      const vehiculeId = newVehicule.id_vehicule;

      // Modifiez les URL des images pour ajouter l'ID du véhicule
      const images = req.files.map((file) => {
        return {
          fk_vehicule: vehiculeId,
          UrlPhoto: `uploads/${file.filename}`,
        };
      });

      // Enregistrez les images dans la base de données
      return Image.bulkCreate(images);
    })
    .then(() => {
      // Renvoyez une réponse au client
      res.status(200).json({ message: "Véhicule créé avec succès." });
    })
    .catch((err) => {
      console.error("Erreur lors de la création du véhicule :", err);
      res
        .status(500)
        .json({ message: "Erreur lors de la création du véhicule." });
    });
};

