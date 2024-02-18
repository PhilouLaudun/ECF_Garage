// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index");
const Option = db.options;
const op = db.Sequelize.Op;

// Charge tous les partenaires de la base de données
exports.fetchOpt = (req, res) => {
  // test si la table est vide
  console.log("controller option");
  var okay = false;
  var vide = false;
  Option.count()
    .then((count) => {
    if (count === 0) {
      // La table est vide
      okay = "false"; // flag de validation à faux
      vide = "true";
      res.send({
        message: "Table equipement vide",
        okay,
        vide,
      }); // renvoi un message à afficher et le flag de validation à faux
    } else {
      // La table contient des enregistrements, effectuez la recherche
      okay = "true"; // flag de chargement correct des données
      vide = "false"; // flag pour exprimer que la table est vide afin de differencier ce cas avec l'absence de structure pour ce partenaire
      Option.findAll()
        .then((data) => {
          //console.log("data controller ", data);
          res.send({ data, okay, vide });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Une erreur s'est produite lors de la récupération des equipements.",
          });
        });
    }
  });
};
exports.createOpt = (req, res) => {
  const option = {
    Optionvehicule: req.body.data,
  };
      Option.create(option)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Une erreur est intervenue lors de la création de l'option",
          });
        });
  
  /*var flagmodifdonnee = false;
  Caracteristique.create(newvaracteristique)
    .then((data) => {
      var flagmodifdonnee = true;
      // Renvoyez une réponse au client
      res.send({ flagmodifdonnee, data }); // renvoi les données;
    })
    .catch((err) => {
      console.error("Erreur lors de la création des caractéristiques :", err);
      res
        .status(500)
        .json({ message: "Erreur lors de la création des caractéristiques." });
    });*/
};

