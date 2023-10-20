const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
