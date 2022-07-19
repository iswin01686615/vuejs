const { StatusModel } = require("../model/index");
// const sequelize = require("../../dbConnection");
const sequelize = require("../../dbConnection");
const getStatus = (req, res) => {
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const getStatus = await StatusModel.findAll(options);
    res.json(getStatus);
  });
};
const createStatus = (req, res) => {
  const { nameStatus, priority } = req.body;
  console.log(nameStatus, priority);
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const newStatus = await StatusModel.create(
      {
        // idStatus:idStatus,
        nameStatus: nameStatus,
        priority: priority,
      },
      options
    );
    res.json({newStatus});
  });
};
const updateStatus = (req, res) => {
  const id = req.params.id;
  const { nameStatus, priority } = req.body;
  console.log(id, nameStatus, priority,"Đang log ở đây này ");
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const updateStatus = await StatusModel.update(
      {
        nameStatus: nameStatus,
        priority: priority,
      },
      { where: {idStatus:id} },
      options
    ).then;
    res.json({ message: "Update Thành Công" });
  });
};

const deleteStatus = (req, res) => {
  const id = req.params.id;
  // console.log(MaSV);
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const deleteStatus = await StatusModel.destroy(
      { where: { idStatus: id } },
      options
    ).then;
    res.json({ message: "Xóa Thành Công" });
  });
};

module.exports = {
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus,
};
