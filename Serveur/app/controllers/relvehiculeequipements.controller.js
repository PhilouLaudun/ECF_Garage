// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index");
const relvehiculeequipements = db.relvehiculeequipements;
const op = db.Sequelize.Op;

// Charge tous les relations equipements vehciules de la base de données
exports.listeRelVE = (req, res) => {
  // test si la table est vide
  const fk_vehicule = req.query.data; // ici on utilise directement le data sans le transformer en nombre, on utilise la forme string
  const condition = fk_vehicule ? { fk_vehicule: fk_vehicule } : {}; // Utilisez un objet vide pour ne pas appliquer de filtre si fk_structure n'est pas spécifié
relvehiculeequipements
  .count()
  .then((count) => {
    okay = "true"; // flag de chargement correct des données
    vide = "false"; // flag pour exprimer que la table est vide afin de differencier ce cas avec l'absence de structure pour ce partenaire
    if (count === 0) {
      // La table est vide
      okay = "false"; // flag de validation à faux
      vide = "true"; // flag levé pour signifier que la table est vide
      res.send({
        message: "La table relation vehicule-équipements est vide ",
        okay,
        vide,
      }); // renvoi un message à afficher et le flag de validation à faux
    } else {
      // La table contient des enregistrements, effectuez la recherche
      relvehiculeequipements
        .findAll({ where: condition })
        .then((data) => {

          if (data.length === 0) {
            okay = "false"; // flag de validation à faux
            res.send({
              message: "Aucun équipement trouvé pour ce véhicule",
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
              "Une erreur s'est produite lors de la récupération des relations vehicule-équipements.",
          });
        });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        "Une erreur s'est produite lors de la récupération des relations vehicule-équipements.",
    });
  });

};
// Crée un ralation entre un équipement et un vehicule
exports.createRelVE = (req, res) => {
  const { vehiculeId, equipementsIds } = req.body;
if (!vehiculeId || !equipementsIds || !Array.isArray(equipementsIds)) {
  return res.status(400).send({ message: "Invalid data format." });
  }
  const createPromises = equipementsIds.map((equipementId) => {
    const relationData = {
      fk_vehicule: vehiculeId,
      fk_equipement: equipementId,
    };

    return relvehiculeequipements.create(relationData);
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
// Supprime une raltion vehicule-equipement
exports.deleteRelVE = (req, res) => {
  const id_relVehiculeEquipement = req.params.id;
  relvehiculeequipements
    .destroy({
      where: { id_relVehiculeEquipement: id_relVehiculeEquipement },
    })
    .then((num) => {
      console.log("num", num);
      if (num === 1) {
        res.status(200).json({
          message: "La relation a été supprimée avec succès.",
        });
      } else {
        res.status(404).json({
          message: `Impossible de supprimer la relation avec l'id=${id_relVehiculeEquipement}. Peut-être que la relation n'a pas été trouvée.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la suppression de la relation avec l'id=" +
          id_relStructPresta,
      });
    });
};
