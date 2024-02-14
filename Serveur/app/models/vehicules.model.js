module.exports = (sequelize, Sequelize) => {
  const Vehicule = sequelize.define(
    "vehicules", // à changer par vehicules par la suite
    {
      id_vehicule: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Marque: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Modele: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Modeleprecis: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      Annee: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Kilometrage: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Energie: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Transmission: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Prix: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      UrlPhoto: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Vehicule;
};
