// importe les données concernant sequelize. Utilsateur : variable adressant la table utilsateur de la base de données. op :  variable contenant les options de sequelize
const db = require("../models/index.js");
const Blog = db.blogs;
const op = db.Sequelize.Op;



// Charge tous les utilisateurs de la base de données
exports.findAll = (req, res) => {
  // récupére le titre (title) du post contenu dans la requête (fonction provenant d'un exemple de post et gardé pour éviter des erreurs; à travailler pour le supprimer),condition :  varaible contenant la condition de recherche, pour nous seul l'option est à garder, on ne recherche pas par nom,
  console.log("findAll controleur blog");
  const title = req.query.title;
  var condition = title ? { title: { [op.like]: `%${title}%` } } : null; //(attention au guillemet simple inverse)
  // Recherche dans la base de données tous les enregistrements car la condition est nulle, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Blog.count()
    .then((count) => {
      var okay = "true"; // léve le drapeau de validation si les données sont trouvées
      console.log("blog",okay);
      if (count === 0) {
        // La table est vide
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Table utilisateur vide, veuillez saisir un utilisateur  ",
          okay,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        // La table contient des enregistrements, effectuez la recherche
        Blog.findAll({ where: condition })
          .then((data) => {
            res.send({ data, okay }); // renvoi les données
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Une erreur est intervenue lors de la recherche des partenaires.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est intervenue lors de la recherche des partenaires.",
      });
    });
  /*okay = "false"; // flag de validation à faux
  res.send({
    message: "Table partenaire vide, veuillez saisir un partenaire ",
    okay,
  }); */ // renvoi un message à afficher et le flag de validation à faux
};

exports.create = (req, res) => {
  console.log("req.body", req.body);
  // Convertir la date de la chaîne en objet Date
  const [day, month, year] = req.body.DateM.split("/");
  const dateStr = `${year}-${month}-${day}`;
  const datem = new Date(dateStr);
const satisfaction = parseInt(req.body.Satisfaction, 10);
  // Convertir l'heure de la chaîne en objet Date
  // Notez que nous devons utiliser la même date de référence pour l'heure
  // que celle utilisée par Sequelize pour les champs TIME, c'est-à-dire le 1er janvier 1970
  const heure = new Date(`1970-01-01T${req.body.Heure}`);

  const message = {
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Message: req.body.Message,
    DateM: datem,
    Heure: heure,
    Approuve: req.body.Approuve,
    Satisfaction: satisfaction,
  };
  console.log("constante Date", message.DateM, typeof message.DateM);
  console.log("constante Heure", message.Heure, typeof message.Heure);
  console.log("constante Approuve", message.Approuve, typeof message.Approuve);
  // enregistre les données dans la base de données
  Blog.create(message)
    .then((data) => {
      var okay = "true"; // léve le drapeau de validation
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est intervenue lors de la création de l'agent",
      });
    });
};
exports.update = (req, res) => {
  // récupére l'index de l'enregistrement à modifier (id)
  const id = req.params.id;
  const avis = {
    Approuve: req.body.Approuve,
  };

  // met à jour l'enregistrement concerné, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Blog.update(avis, {
    where: {
      id_message: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send(req.body); // on utilise req.body en retour pour pouvoir modifié le store sinon cela ne fonctionne pas
      } else {
        res.send({
          message: `Impossible de mettre à jour la structure avec l'id=${id}. Peut-etre  que le la strucuture n'a pas été trouvé ou alors req.body est vide!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est intervenue lors de la mise à jour du partenaire dont l'id=" +
          id,
      });
    });
};
exports.delete = (req, res) => {
  const id_message = req.params.id;
  console.log("id_message", id_message);
  Blog.destroy({
      where: { id_message: id_message },
    })
    .then((num) => {
      console.log("num", num);
      if (num === 1) {
        res.status(200).json({
          message: "Le message a été supprimée avec succès.",
        });
      } else {
        res.status(404).json({
          message: `Impossible de supprimer le message avec l'id=${id_message}. Peut-être que le message n'a pas été trouvée.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la suppression du message avec l'id=" +
          id_message,
      });
    });
};