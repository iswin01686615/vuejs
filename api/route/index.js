module.exports = function (app) {
  const Staff = require("./StaffRouter");
  const Status = require("./StatusRouter");
  const Authen = require("./AuthenRouter");
  const Test = require("./test");
  Staff(app);
  Status(app);
  Authen(app);
  Test(app);
};
