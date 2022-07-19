const { DataTypes } = require("sequelize");
const sequelize = require("../../dbConnection");

const StatusModel = sequelize.define("Status", {
  idStatus: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StatusModel;
