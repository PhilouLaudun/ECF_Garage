module.exports = (sequelize, Sequelize) => {
  const Utilisateur = sequelize.define(
    "utilisateur",
    {
      id_utilisateur: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Nom: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Prenom: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Qualite: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Mdp: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Login: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Utilisateur;
};
