module.exports = (sequelize, Sequelize) => {
  const Equipement = sequelize.define(
    "equipements",
    {
      id_equipement: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Equipement: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      
    },
    {
      timestamps: false,
    }
  );
  return Equipement;
};
