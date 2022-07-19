const { StaffModel } = require("../model/index");
// const sequelize = require("../../dbConnection");
const sequelize = require("../../dbConnection");

const getStaff = (req, res) => {
  // const { idStaff, nameStaff, Diachi } = req.body;
  //   console.log(idStaff, nameStaff, Diachi);
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const getStaff = await StaffModel.findAll( {include: ["Status"]},options);
    res.json(getStaff);
  });
};

const createStaff = (req, res) => {
  const { idStaff, nameStaff, Diachi, StatusIdStatus } = req.body;
  console.log(idStaff, nameStaff, Diachi, StatusIdStatus);
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const newStaff = await StaffModel.create(
      {
        // idStaff: idStaff,
        nameStaff: nameStaff,
        Diachi: Diachi,
        StatusIdStatus: StatusIdStatus,
      },
      options
    );
    res.json(newStaff);
  });
};
const updateStaff = (req, res) => {
  const id = req.params.id;
  const { nameStaff, Diachi, StatusIdStatus } = req.body;
  console.log(id, nameStaff, Diachi, StatusIdStatus, "Đang log ở đây này ");
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const updateStaff = await StaffModel.update(
      {
        nameStaff: nameStaff,
        Diachi: Diachi,
        StatusIdStatus: StatusIdStatus,
      },
      { where: { idStaff: id } },
      options
    ).then;
    res.json({ message: "Update Thành Công" });
  });
};

const deleteStaff = (req, res) => {
  const id = req.params.id;
  console.log(id);
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    await StaffModel.destroy({ where: { idStaff: id } }, options).then;
    res.json({ message: "Xóa Thành Công" });
  });
};
module.exports = {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
};
