"use strict";

const User = require("../../models/User");

const output = {
    index: (req, res) => {
        res.render("home/index");
    },
    list: (req, res) => {
        res.render("home/list");
    },
};

const process = {
    index: (req, res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    },
};

module.exports = {
    output,
    process
};



