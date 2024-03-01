// importe les données concernant sequelize. Utilsateur : variable adressant la table utilsateur de la base de données. op :  variable contenant les options de sequelize
const db = require("../models/index.js");
const Utilisateur = db.utilisateurs;
const op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

// Charge tous les utilisateurs de la base de données
exports.findAll = (req, res) => {
  // récupére le titre (title) du post contenu dans la requête (fonction provenant d'un exemple de post et gardé pour éviter des erreurs; à travailler pour le supprimer),condition :  varaible contenant la condition de recherche, pour nous seul l'option est à garder, on ne recherche pas par nom,
  const title = req.query.title;
  var condition = title ? { title: { [op.like]: `%${title}%` } } : null; //(attention au guillemet simple inverse)
  // Recherche dans la base de données tous les enregistrements car la condition est nulle, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Utilisateur.count()
    .then((count) => {
      var okay = "true"; // léve le drapeau de validation si les données sont trouvées
      if (count === 0) {
        // La table est vide
        okay = "false"; // flag de validation à faux
        res.send({
          message: "Table utilisateur vide, veuillez saisir un utilisateur  ",
          okay,
        }); // renvoi un message à afficher et le flag de validation à faux
      } else {
        // La table contient des enregistrements, effectuez la recherche
        Utilisateur.findAll({ where: condition })
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
          "Une erreur est intervenue lors de la recherche des utilisateurs.",
      });
    });
};
//Vérification de la personne autorisée
exports.login = (req, res) => {
  const { identifiant, mdp } = req.body; // récupére les données saisies dans la boite de dialogue connexion
  Utilisateur.count()
    .then((count) => {
      if (count === 0) {
        var okay = "false";
        res.send({ message: "base vide ", okay });
       }
      else {
       Utilisateur.findOne({
         where: { Login: identifiant }, //  recherche l'utilisateur dans la base de données
       }).then((user) => {
         // gére le résultat de la recherche
         var okay = "true"; // léve le drapeau de validation si utilisateur trouvé et mot de passe valide
         if (user) {
           // si utilisateur trouvé
           if (mdp === user.Mdp) {
             // verifie si le mot de passe est valide
             const token = jwt.sign({ userId: user.id }, "Philou", {
               expiresIn: "1h",
             }); // crée un token, voir comment l'utiliser plus tard sur les routes
             res.send({ user: user.toJSON(), token, okay }); // renvoi les données concernant l'utilisateur, le token et le flag de validation à vrai
           } else {
             // Gérer le cas où le mot de passe est invalide
             okay = "false"; // met le flag de validation à faux
             res.send({ message: "Mot de passe invalide ", okay }); // renvoi un message à afficher et le flag de validation à faux
           }
         } else {
           // Gérer le cas où l'utilisateur n'est pas trouvé
           okay = "false"; // met le flag de validation à faux
           res.send({ message: "Utilisateur non trouvé", okay }); // renvoi un message à afficher et le flag de validation à faux
         }
       });
      }
    })
 
}
// Crée un utilisateur
exports.create = (req, res) => {
  const agent = {
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Login: req.body.Login,
    Mdp: req.body.Mdp,
    Qualite: req.body.Qualite,
  };
  // enregistre les données dans la base de données
  Utilisateur.create(agent)
    .then((data) => {
      var okay = "true"; // léve le drapeau de validation
      res.send(data,);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est intervenue lors de la création de l'agent",
      });
    });
}
// Met à jour un utilisateur
exports.update = (req, res) => {
  // récupére l'index de l'enregistrement à modifier (id)
  const id = req.params.id;
  const id_utilisateur = parseInt(req.body.id_utilisateur, 10); // Utilisez parseInt pour convertir en nombre base 10 pour que le retour id_structure soit un nombre pour modifier le state, par contre directement avec append formData ca ne fonctionne pas, c'est a faire juste avant la mise à jour de la base
  req.body.id_utilisateur = id_utilisateur;
  const agent = {
    id_utilisateur: req.body.id_utilisateur,
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Login: req.body.Login,
    Mdp: req.body.Mdp,
    Qualite: req.body.Qualite,
  };
  // met à jour l'enregistrement concerné, et renvoi les données ou un message si il y a un problême, à intercepter plus tard
  Utilisateur.update(agent, {
    where: {
      id_utilisateur: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send(req.body); // on utilise req.body en retour pour pouvoir modifié le store sinon cela ne fonctionne pas
      } else {
        res.send({
          message: `Impossible de mettre à jour l'utilisateur' avec l'id=${id}. Peut-etre  que l'utilisateur n'a pas été trouvé ou alors req.body est vide!`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est intervenue lors de la mise à jour de l'utilisateur dont l'id=" +
          id,
      });
    });
};