const Sequalize = require("sequelize");

const sequalize = require("../helpers/database");

const OrderItem = sequalize.define("orderItem", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: Sequalize.INTEGER,
});
module.exports = OrderItem;
