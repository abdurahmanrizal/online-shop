const express = require('express')

const app = express();

const path = require('path');

app.set("view engine", "ejs");
app.set("views", "views");

const productRoute = require('./routes/product');

const rootDir = require("./helpers/path");

const bodyParser = require("body-parser");

const handlerController = require("./controllers/handler");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, 'public')));

app.use('/product', productRoute.routes);

app.use(handlerController.getHandler);
  
app.listen(4000);