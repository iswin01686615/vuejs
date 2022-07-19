const { StaffModel } = require("../model/index");
const { UserModel } = require("../model/index");
const sequelize = require("../../dbConnection");

const setStudent = async (req, res) => {
  const { QueryTypes } = require("sequelize");
  const getStudentNull = await sequelize.query(
    "SELECT * from students where holdAcc is null order by createdAt asc limit 1 ",
    { type: QueryTypes.SELECT }
  );
  sequelize.transaction(async (t) => {
    const id = req.params.id;

    const findAcc = await UserModel.findAll({
      where: {
        id: id,
      },
    });

    const options = { transaction: t, raw: true };
    if (findAcc[0].holdStudent === null) {
      const updateAcc = await UserModel.update(
        { holdStudent: getStudentNull[0].MaSV },
        { where: { id: findAcc[0].id } },
        options
      );
      console.log(getStudentNull[0] , "đang  log day neeeee");
      const updateStudent = await StaffModel.update(
        { holdAcc: findAcc[0].id },
        { where: { MaSV: getStudentNull[0].MaSV } },
        options
      );
      res.json({updateAcc, updateStudent,  message: "liên kết thành công " });
    } else {
      res.status(200).json({ findAcc, message: "tài khoản đã liên kết r " });
    }
    // res.json(getStudent);
  });
};

const updateStudent = (req, res) => {
  const id = req.params.id;
  const { TenSV, Diachi, TeacherMaGV } = req.body;
  console.log(id, TenSV, Diachi, TeacherMaGV, "Đang log ở đây này ");
  sequelize.transaction(async (t) => {
    const options = { transaction: t, raw: true };
    const updateStudent = await StaffModel.update(
      {
        TenSV: TenSV,
        Diachi: Diachi,
        TeacherMaGV: TeacherMaGV,
      },
      { where: { MaSV: id } },
      options
    ).then;
    res.json({ message: "Update Thành Công" });
  });
};

module.exports = {
  setStudent,
  updateStudent,
};
