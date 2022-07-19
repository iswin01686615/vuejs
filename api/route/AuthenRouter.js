module.exports = function (app) {
  const AuthenController = require("../controller/AuthenController");

  app
  .route("/register")
  .post(AuthenController.register);
  app
  .route("/login")
  .post(AuthenController.login);
};
