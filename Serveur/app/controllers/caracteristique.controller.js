// importe les données concernant sequelize. Partenaire : variable adressant la table partenaires de la base de données. op :  varaible contenant les options de sequelize
const db = require("../models/index.js");
const Caracteristique = db.caracteristiques;
const op = db.Sequelize.Op;

// Charge tous les partenaires de la base de données
exports.fetchCaractById = (req, res) => {
  // test si la table est vide
  console.log("controller caracteristique");
  var okay = false;
  var vide = false;
  Caracteristique.count().then((count) => {
    if (count === 0) {
      // La table est vide
      okay = "false"; // flag de validation à faux
      vide = "true";
      res.send({
        message: "Table caractéristique vide",
        okay,
        vide,
      }); // renvoi un message à afficher et le flag de validation à faux
    } else {
      const fk_vehicule = req.query.data; // ici on utilise directement le data sans le transformer en nombre, on utilise la forme string
      const condition = fk_vehicule ? { fk_vehicule: fk_vehicule } : {}; // Utilisez un objet vide pour ne pas appliquer de filtre si fk_parten n'est pas spécifié
      console.log("condition", condition);

      // La table contient des enregistrements, effectuez la recherche
      okay = "true"; // flag de chargement correct des données
      vide = "false"; // flag pour exprimer que la table est vide afin de differencier ce cas avec l'absence de structure pour ce partenaire
      Caracteristique.findAll({ where: condition })
        .then((data) => {
          if (data.length === 0) {
            // Aucune structure trouvée pour ce partenaire
            okay = "false"; // flag de validation à faux
            res.send({
              message: "Aucune caractéristique trouvée pour ce vehicule",
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
              "Une erreur s'est produite lors de la récupération des caractéristiques.",
          });
        });
    }
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
exports.createCaract = (req, res) => {
  console.log("req.body", req.body);
  const newvaracteristique = {
    fk_vehicule: req.body.fk_vehicule,
    Provenance: req.body.Provenance,
    Miseencirculation: req.body.Miseencirculation,
    Couleur: req.body.Couleur,
    Nombreporte: parseInt(req.body.Nombreporte), // Convertir la valeur en un nombre entier
    Nombreplace: parseInt(req.body.Nombreplace), // Convertir également si nécessaire
    Longueur: req.body.Longueur,
    Largeur: req.body.Largeur,
    Volumecoffre: req.body.Volumecoffre,
    Puissancefiscale: parseInt(req.body.Puissancefiscale),
    Puissancemoteur: parseInt(req.body.Puissancemoteur),
  };
  var flagmodifdonnee = false
  Caracteristique.create(newvaracteristique)
    .then((data) => {
var flagmodifdonnee = true;
      // Renvoyez une réponse au client
      res.send({flagmodifdonnee, data }); // renvoi les données;
    })
    .catch((err) => {
      console.error("Erreur lors de la création des caractéristiques :", err);
      res
        .status(500)
        .json({ message: "Erreur lors de la création des caractéristiques." });
    });
};
exports.updateCaract = (req, res) => {
  const id = req.params.id;
  // transforme les valeurs numeriques en nombre avant enregistrement dans la BD, sinon en retour l'index est un string au lieu d'un nombre
  const fk_vehicule = parseInt(req.body.fk_vehicule, 10);
  const nombreporte = parseInt(req.body.Nombreporte, 10); // Utilisez parseInt pour convertir en nombre base 10 pour que le retour id_structure soit un nombre pour modifier le state, par contre directement avec append formData ca ne fonctionne pas, c'est a faire juste avant la mise à jour de la base
  const nombreplace = parseInt(req.body.Nombreplace, 10);
  const puissancefiscale = parseInt(req.body.Puissancefiscale, 10);
  const puissancemoteur = parseInt(req.body.Puissancemoteur, 10);
  req.body.Nombreporte = nombreporte;
  req.body.Nombreplace = nombreplace;
  req.body.Puissancefiscale = nombreporte;
  req.body.Puissancemoteur = puissancemoteur;
  req.body.fk_vehicule = fk_vehicule;
    var flagmodifdonnee = false;
  // met à jour l'enregistrement concerné, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Caracteristique.update(req.body, {
    where: {
      id_caracteristique: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        var flagmodifdonnee = true;
        req.body.flagmodifdonnee = flagmodifdonnee;
        res.send(req.body); // on utilise req.body en retour pour pouvoir modifié le store sinon cela ne fonctionne pas
      } else {
        res.send({
          message: `Impossible de mettre à jour la structure avec l'id=${id}. Peut-etre  que le la caracteristique n'a pas été trouvé ou alors req.body est vide!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est intervenue lors de la mise à jour de la cracteristique avec l'id=" +
          id,
      });
    });
};
