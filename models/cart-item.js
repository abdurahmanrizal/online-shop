const Sequalize = require("sequelize");

const sequalize = require("../helpers/database");

const CartItem = sequalize.define("cartItem", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: Sequalize.INTEGER,
});
module.exports = CartItem;
