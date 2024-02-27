module.exports = (sequelize, Sequelize) => {
  const Presentation = sequelize.define(
    "datapresentations",
    {
      id_presentation: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Titre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Message1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Message2: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      Message3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return Presentation;
};
