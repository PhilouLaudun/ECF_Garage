// importe les données concernant sequelize. Utilsateur : variable adressant la table utilsateur de la base de données. op :  variable contenant les options de sequelize
const db = require("../models/index.js");
const Horaire = db.horaires;
const op = db.Sequelize.Op;



// Charge tous les horaires de la base de données
exports.findAll = (req, res) => {
  // récupére le titre (title) du post contenu dans la requête (fonction provenant d'un exemple de post et gardé pour éviter des erreurs; à travailler pour le supprimer),condition :  varaible contenant la condition de recherche, pour nous seul l'option est à garder, on ne recherche pas par nom,
  const title = req.query.title;
  var condition = title ? { title: { [op.like]: `%${title}%` } } : null; //(attention au guillemet simple inverse)
  // Recherche dans la base de données tous les enregistrements car la condition est nulle, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Horaire.count()
    .then((count) => {
      var okay = "true"; // léve le drapeau de validation si les données sont trouvées
      console.log("blog", okay);
      if (count === 0) {
        // La table est vide
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Table horaire vide  ",
          okay,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        // La table contient des enregistrements, effectuez la recherche
        Horaire.findAll({ where: condition })
          .then((data) => {
            res.send({ data, okay }); // renvoi les données
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Une erreur est intervenue lors de la recherche des horaires.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est intervenue lors de la recherche des horaires.",
      });
    });
}
// Met à jour tous les horaires de la base de données
exports.update = async (req, res) => {
  try {
    const updatedHoraires = req.body; // Les nouvelles données à mettre à jour
    // Mettre à jour tous les horaires dans la base de données
    await Horaire.bulkCreate(updatedHoraires, {
      updateOnDuplicate: ['Horaires'], // Mettre à jour le champ Horaires en cas de doublon
      fields: ['id_horaire', 'Jour', 'Horaires'] // Les champs à mettre à jour
    });
    res.status(200).send("Horaires updated successfully");
  } catch (error) {
    console.error("Error updating horaires:", error);
    res.status(500).send("Error updating horaires");
  }
};
