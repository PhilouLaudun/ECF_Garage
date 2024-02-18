module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define(
    "options",
    {
      id_option: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Optionvehicule: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      
    },
    {
      timestamps: false,
    }
  );
  return Option;
};
