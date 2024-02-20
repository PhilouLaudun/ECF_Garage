module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define(
    "blogs",
    {
      id_message: {
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
      Message: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      DateM: {
        type: Sequelize.DATE(),
        allowNull: false,
      },
      Heure: {
        type: Sequelize.TIME(),
        allowNull: false,
      },
      Approuve: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Blog;
};
