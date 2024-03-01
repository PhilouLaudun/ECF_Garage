// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index.js");
const Vehicule = db.vehicules; 
const Image = db.images;
const op = db.Sequelize.Op;

// Charge tous les véhicules de la base de données
exports.findAll = (req, res) => {
  // test si la table est vide
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
// Met à jour un vehicule
exports.updateVehicule = (req, res) => {
  const id = req.params.id;
  // transforme les valeurs numeriques en nombre avant enregistrement dans la BD, sinon en retour l'index est un string au lieu d'un nombre
const id_vehicule = parseInt( req.body.id_vehicule,10);// trnaformer l'id en nombre car si on renvoi rq.body, l'i reste en string
  const annee = parseInt(req.body.Annee, 10);
  const kilometrage = parseInt(req.body.Kilometrage, 10); // Utilisez parseInt pour convertir en nombre base 10 pour que le retour id_structure soit un nombre pour modifier le state, par contre directement avec append formData ca ne fonctionne pas, c'est a faire juste avant la mise à jour de la base
  const prix = parseInt(req.body.Prix, 10);
  req.body.id_vehicule = id_vehicule;
  req.body.Annee = annee;
  req.body.Kilometrage = kilometrage;
  req.body.Prix = prix;
  
  var flagmodifdonnee = false;
  // met à jour l'enregistrement concerné, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Vehicule.update(req.body, {
    where: {
      id_vehicule: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        var flagmodifdonnee = true;
        req.body.flagmodifdonnee = flagmodifdonnee;
        res.send(req.body); // on utilise req.body en retour pour pouvoir modifié le store sinon cela ne fonctionne pas
      } else {
        res.send({
          message: `Impossible de mettre à jour le vehicule avec l'id=${id}. Peut-etre  que le vehicule n'a pas été trouvé ou alors req.body est vide!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est intervenue lors de la mise à jour du véhicule avec l'id=" +
          id,
      });
    });
};
