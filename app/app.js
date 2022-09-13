"use strict";

//모듈
const express = require('express');
const app = express();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", home); // use -> 미들웨어 등록해주는 메소드.

module.exports = app;








/*app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/link"));
app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname+ "/font-awesome"));
app.use(express.static(__dirname+ "/fonts"));
app.use(express.static(__dirname+ "/NotoSansKr"));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/list.html");
}); */


