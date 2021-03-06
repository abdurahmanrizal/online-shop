const Sequalize = require("sequelize");

const sequalize = require("../helpers/database");

const Cart = sequalize.define("cart", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});
module.exports = Cart;
