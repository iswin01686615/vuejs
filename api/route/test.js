module.exports = function (app) {
    const UserController = require("../controller/DevideNumberController");
  
    app
    .route("/user/:id")
    .get(UserController.setStudent)
  
  };
  