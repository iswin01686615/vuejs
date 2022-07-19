const { DataTypes } = require("sequelize");
const sequelize = require("../../dbConnection");

const StaffModel = sequelize.define("Staff", {
  idStaff: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameStaff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Diachi: {
    type: DataTypes.STRING,
  },
});

module.exports = StaffModel;
