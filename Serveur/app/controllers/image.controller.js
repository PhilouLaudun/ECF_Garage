// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index.js");
const Image = db.images;
const op = db.Sequelize.Op;

// Charge tous les partenaires de la base de données
exports.findImageById = (req, res) => {
  // test si la table est vide
  const fk_vehicule = req.query.data; // ici on utilise directement le data sans le transformer en nombre, on utilise la forme string
  const condition = fk_vehicule ? { fk_vehicule: fk_vehicule } : {}; // Utilisez un objet vide pour ne pas appliquer de filtre si fk_parten n'est pas spécifié
  console.log("condition", condition);
  // La table contient des enregistrements, effectuez la recherche
  okay = "true"; // flag de chargement correct des données
  vide = "false"; // flag pour exprimer que la table est vide afin de differencier ce cas avec l'absence de structure pour ce partenaire
  Image.findAll({ where: condition })
    .then((data) => {
      if (data.length === 0) {
        // Aucune structure trouvée pour ce partenaire
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Aucune structure trouvée pour ce partenaire",
          okay,
          vide,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        //console.log("data controller ", data);
        res.send({ data, okay, vide });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des structures.",
      });
    });

  /*Image.count()
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
        Image.findAll()
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
  */
};


