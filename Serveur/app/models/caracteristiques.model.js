module.exports = (sequelize, Sequelize) => {
  const Caracteristique = sequelize.define(
    "caracteristiques",
    {
      id_caracteristique: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fk_vehicule: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Provenance: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Miseencirculation: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Couleur: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Nombreporte: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Nombreplace: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Longueur: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Largeur: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Volumecoffre: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Puissancefiscale: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Puissancemoteur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Caracteristique;
};
