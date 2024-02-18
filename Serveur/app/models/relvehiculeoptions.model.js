module.exports = (sequelize, Sequelize) => {
  const relvehiculeoptions = sequelize.define(
    "relvehiculeoptions",
    {
      id_relvehiculeoption: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fk_vehicule: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      fk_option: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return relvehiculeoptions;
};
