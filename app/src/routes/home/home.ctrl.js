"use strict";

const hello = (req, res) => {
    res.render("home/index");
};

const list = (req, res) => {
    res.render("home/list")
};

module.exports = {
    hello,
    list,
};