const Sequalize = require("sequelize");

const sequalize = require("../helpers/database");

const Order = sequalize.define("order", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});
module.exports = Order;
