module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "tuan2312",
  DB: "tuan",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
