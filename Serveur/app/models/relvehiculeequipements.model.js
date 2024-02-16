module.exports = (sequelize, Sequelize) => {
  const relvehiculeequipements = sequelize.define(
    "relvehiculeequipements",
    {
      id_relVehiculeEquipement: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fk_vehicule: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      fk_equipement: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return relvehiculeequipements;
};
