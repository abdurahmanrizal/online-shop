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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use(shopRoute.routes);

app.use("/admin", adminRoute.routes);

app.use(handlerController.getHandler);

sequalize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(4000);
  })
  .catch((err) => console.log(err));
