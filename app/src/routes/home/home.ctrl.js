"use strict";

const User = require("../../models/User");

const output = {
    index: (req, res) => {
        res.render("home/index");
    },
    list: (req, res) => {
        res.render("home/list");
    },
    signup: (req, res) => {
        res.render("home/signup");
    },
    signup_p: (req, res) => {
        res.render("home/signup_p");
    }
};

const process = {
    index: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    signup: (req, res) => {
        const user = new User(req.body);
        const response = user.signup();
        return res.json(response);
    }
};


module.exports = {
    output,
    process,
};



