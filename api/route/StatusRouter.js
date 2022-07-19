module.exports = function (app) {
  const StatusController = require("../controller/StatusControler");

  app
  .route("/Status")
  .get(StatusController.getStatus)
  .post(StatusController.createStatus);
  app
  .route("/Status/:id")
  .put(StatusController.updateStatus)
  .delete(StatusController.deleteStatus);
};
