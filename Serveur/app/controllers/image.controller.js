// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index.js");
const Image = db.images;
const op = db.Sequelize.Op;

// Charge les images pour un véhicule
exports.findImageById = (req, res) => {
  // test si la table est vide
  const fk_vehicule = req.query.data; // ici on utilise directement le data sans le transformer en nombre, on utilise la forme string
  const condition = fk_vehicule ? { fk_vehicule: fk_vehicule } : {}; // Utilisez un objet vide pour ne pas appliquer de filtre si fk_parten n'est pas spécifié
  // La table contient des enregistrements, effectuez la recherche
  okay = "true"; // flag de chargement correct des données
  vide = "false"; // flag pour exprimer que la table est vide afin de differencier ce cas avec l'absence de structure pour ce partenaire
  Image.findAll({ where: condition })
    .then((data) => {
      if (data.length === 0) {
        // Aucune structure trouvée pour ce partenaire
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Aucune image trouvée pour ce vehicule",
          okay,
          vide,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        res.send({ data, okay, vide });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des images.",
      });
    });
};
// Ajoute des images pour un vehicule
exports.ajout = (req, res) => {
  id_vehicule = parseInt(req.body.fk_vehicule, 10);
    // Affichage des fichiers téléversés avec Multer
       const images = req.files.map((file) => {
        return {
          fk_vehicule: id_vehicule,
          UrlPhoto: `uploads/${file.filename}`,
        };
      });
      // Enregistrez les images dans la base de données
      return Image.bulkCreate(images);
 }
 
