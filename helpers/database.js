const { Sequelize } = require("sequelize");

const sequalize = new Sequelize("node_app", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequalize;
