var express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  morgan = require("morgan");
mongoose.Promise = global.Promise;

const sequelize = require("./dbConnection");
const { StaffModel, StatusModel, UserModel } = require("./api/model/index");

//RELATIONS:
//1 to many relation between user and article
StatusModel.hasMany(StaffModel, {
  onDelete: "SET NULL",
  // type: DataTypes.ARRAY(DataTypes.STRING),
});
StaffModel.belongsTo(StatusModel);

StaffModel.belongsTo(UserModel, {
  foreignKey: "holdAcc",
  // as:""
});
// UserModel.belongsTo( StaffModel, {
//   foreignKey: "holdStudent",
// });

// StudentModel.belongsTo(TeacherModel);

app.use(cors({}));
app.use(morgan("dev"));
const sync = async () => await sequelize.sync({ alter: true });
sync();
app.use(bodyParser.json());

var routes = require("./api/route");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("Server started on: " + port);
