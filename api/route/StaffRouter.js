module.exports = function (app) {
  const StaffController = require("../controller/StaffControler");

  app
    .route("/Staff")
    .get(StaffController.getStaff)
    .post(StaffController.createStaff);
  app
    .route("/Staff/:id")
    .put(StaffController.updateStaff)
    .delete(StaffController.deleteStaff);
};
