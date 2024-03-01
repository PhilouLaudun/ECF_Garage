// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index");
const relvehiculeoptions = db.relvehiculeoptions;
const op = db.Sequelize.Op;

// Charge toutes les relation vehicule-options pour un vehicule de la base de données
exports.listeRelVO = (req, res) => {
  // test si la table est vide
  const fk_vehicule = req.query.data; // ici on utilise directement le data sans le transformer en nombre, on utilise la forme string
  const condition = fk_vehicule ? { fk_vehicule: fk_vehicule } : {}; // Utilisez un objet vide pour ne pas appliquer de filtre si fk_structure n'est pas spécifié
relvehiculeoptions
  .count()
  .then((count) => {
    okay = "true"; // flag de chargement correct des données
    vide = "false"; // flag pour exprimer que la table est vide afin de differencier ce cas avec l'absence de structure pour ce partenaire
    if (count === 0) {
      // La table est vide
      okay = "false"; // flag de validation à faux
      vide = "true"; // flag levé pour signifier que la table est vide
      res.send({
        message: "La table relation vehicule-options est vide ",
        okay,
        vide,
      }); // renvoi un message à afficher et le flag de validation à faux
    } else {
      // La table contient des enregistrements, effectuez la recherche
      relvehiculeoptions
        .findAll({ where: condition })
        .then((data) => {
          if (data.length === 0) {
            // Aucune structure trouvée pour ce vehicule
            okay = "false"; // flag de validation à faux
            res.send({
              message: "Aucune relation trouvée pour ce véhicule",
              okay,
              vide,
            }); // renvoi un message à afficher et le flag de validation à faux
          } else {
            okay = "true"; // flag de validation à faux
            res.send({ data, okay, vide });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Une erreur s'est produite lors de la récupération des relations.",
          });
        });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        "Une erreur s'est produite lors de la vérification des structures.",
    });
  });

};
// Crée une relation véhicule-option
exports.createRelVO = (req, res) => {
  const { vehiculeId, optionsIds } = req.body;
if (!vehiculeId || !optionsIds || !Array.isArray(optionsIds)) {
  return res.status(400).send({ message: "Invalid data format." });
  }
  const createPromises = optionsIds.map((optionId) => {
    const relationData = {
      fk_vehicule: vehiculeId,
      fk_option: optionId,
    };

    return relvehiculeoptions.create(relationData);
  });

  Promise.all(createPromises)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenue lors de la création de la relation.",
      });
    });
};
// Suppression d'une relation véhicule-option
exports.deleteRelVO = (req, res) => {
  const id_relvehiculeoption = req.params.id;
  relvehiculeoptions
    .destroy({
      where: { id_relvehiculeoption: id_relvehiculeoption },
    })
    .then((num) => {
      console.log("num", num);
      if (num === 1) {
        res.status(200).json({
          message: "La relation a été supprimée avec succès.",
        });
      } else {
        res.status(404).json({
          message: `Impossible de supprimer la relation avec l'id=${id_relvehiculeoption}. Peut-être que la relation n'a pas été trouvée.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la suppression de la relation avec l'id=" +
          id_relvehiculeoption,
      });
    });
};
