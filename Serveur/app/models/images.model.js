module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define(
    "images",
    {
      id_photo: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fk_vehicule: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      UrlPhoto: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Image;
};
