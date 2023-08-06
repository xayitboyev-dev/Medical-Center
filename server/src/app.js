const express = require('express');
const app = express();
const error = require('./routes/error');
const main = require("./routes/main");
const cors = require("cors");

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// cors setting
app.use(cors());

// routing
app.use(main);
app.use(error);

// bot
require("./bot/bot");

module.exports = app;