"use strict"

const User2 =require("../../models/User2");


const output = {
    index_p: (req, res) => {
        res.render("home/index_p");
    },
    list: (req, res) => {
        res.render("home/list");
    },
    signup_p: (req, res) => {
        res.render("home/signup_p");
    }
};

const process = {
    login: async (req, res) => {
        const user = new User2(req.body);
        const response = await user.login2();
        return res.json(response); // 여기서 바꿔줘야 할거 같은데 ㅠㅠ,.
    },
    signup_p: (req, res) => {
        const user = new User2(req.body);
        const response = user.signup_p();
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
};