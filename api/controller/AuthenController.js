const { UserModel } = require("../model/index");
const sequelize = require("../../dbConnection");
const saltRounds = parseInt(process.env.SALT_ROUNDS || 10);
const authHandler = require("../auth");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let findUser = async (body) => {
  return await UserModel.findOne({
    where: {
      userName: body.userName,
    },
  });
};

const register = (req, res) => {
  sequelize.transaction(async (t) => {
    const { userName, fullName, password } = req.body;
    //   console.log(MaSV, TenSV, Diachi);
    const validateRes = await findUser(req.body);
    if (validateRes === null) {
      const hashPassword = bcrypt.hashSync(password, saltRounds);

      const options = { transaction: t, raw: true };
      const newAcc = await UserModel.create(
        {
          userName: userName,
          fullName: fullName,
          password: hashPassword,
        },
        options
      );
      res.json({ newAcc, message: "Tạo tài khoản thành công rùi nè " });
    }
  });
};

const login = (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password,"ok day roi")
  sequelize.transaction(async (t) => {
    const validateAccount = await findUser(req.body);
    console.log(validateAccount, "validateAccount");
    const isValidatePass = bcrypt.compareSync(
      req.body.password,
      validateAccount.password
    );
    console.log(isValidatePass, "isValidatePass");
    if (isValidatePass === true) {
      const options = { transaction: t, raw: true };
      const loginAcc = await UserModel.findOne(
        { where: { id: validateAccount.id } },
        options
      );
      console.log(loginAcc,"tt tai khoan")
      res.json({
        token: authHandler.getToken({ userName: userName, password: password }),
        loginAcc,
      });
    } else {
      res.json({ message: "Thôi được rồi" });
    }
  });
};
module.exports = {
  register,
  login,
};
