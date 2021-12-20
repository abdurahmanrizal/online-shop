const express = require("express");

const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

const rootDir = require("./helpers/path");

const bodyParser = require("body-parser");

const sequalize = require("./helpers/database");

const handlerController = require("./controllers/handler");

const Product = require("./models/product");
const User = require("./models/User");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoute.routes);

app.use("/admin", adminRoute.routes);

app.use(handlerController.getHandler);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);

User.hasOne(Cart);

Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);

User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

sequalize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Sky", email: "sky@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((user) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
