"use strict";

//모듈
const express = require('express');
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());
app.use(cors());
app.use("/", home); // use -> 미들웨어 등록해주는 메소드.

module.exports = app;

