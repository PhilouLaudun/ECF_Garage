// importe les données concernant sequelize. Utilsateur : variable adressant la table utilsateur de la base de données. op :  variable contenant les options de sequelize
const db = require("../models/index.js");
const Presentation = db.datapresentations;
const op = db.Sequelize.Op;



// Charge toutes les présentations de la base de données
exports.findAll = (req, res) => {
  // récupére le titre (title) du post contenu dans la requête (fonction provenant d'un exemple de post et gardé pour éviter des erreurs; à travailler pour le supprimer),condition :  varaible contenant la condition de recherche, pour nous seul l'option est à garder, on ne recherche pas par nom,
  const title = req.query.title;
  var condition = title ? { title: { [op.like]: `%${title}%` } } : null; //(attention au guillemet simple inverse)
  // Recherche dans la base de données tous les enregistrements car la condition est nulle, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Presentation.count()
    .then((count) => {
      var okay = "true"; // léve le drapeau de validation si les données sont trouvées
      console.log("blog", okay);
      if (count === 0) {
        // La table est vide
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Table présentation vide  ",
          okay,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        // La table contient des enregistrements, effectuez la recherche
        Presentation.findAll({ where: condition })
          .then((data) => {
            res.send({ data, okay }); // renvoi les données
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Une erreur est intervenue lors de la recherche des présentations.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est intervenue lors de la recherche des présentations.",
      });
    });
}
// Met à jout une présentation de la base de données
exports.update = async (req, res) => {
  const id = req.params.id;
  const message2 = {
    Message2: req.body.Message2,
  };
  Presentation.update(message2, {
    where: {
      id_presentation: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send(req.body); // on utilise req.body en retour pour pouvoir modifié le store sinon cela ne fonctionne pas
      } else {
        res.send({
          message: `Impossible de mettre à jour la donnée message2 de datapresentation avec l'id=${id}. Peut-etre  que le le messsage n'a pas été trouvé ou alors req.body est vide!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est intervenue lors de la mise à jour de la presentation dont l'id=" +
          id,
      });
    });
};
