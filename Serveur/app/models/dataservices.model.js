module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define(
    "dataservices",
    {
      id_service: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Image: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Titre: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Texte: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Service;
};
