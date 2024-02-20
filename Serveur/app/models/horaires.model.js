module.exports = (sequelize, Sequelize) => {
  const Horaire = sequelize.define(
    "horaires",
    {
      id_horaire: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Jour: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Horaires: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      
    },
    {
      timestamps: false,
    }
  );
  return Horaire;
};
