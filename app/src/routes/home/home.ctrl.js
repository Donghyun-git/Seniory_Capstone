"use strict";

const UserStorage = require("../../models/UserStorage");

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
        const user = req.body.user;
        const center = req.body.center;
        const id = req.body.id;
        const pw = req.body.pw;
        
        const users = UserStorage.getUsers("user", "center", "id" ,"pw");
        
        const response = {};
        if (users.id.includes(id)){
            const idIdx = users.id.indexOf(id);
            if(users.user.includes(user)){
                const userIdx = users.user.indexOf(user);
                if(users.center.includes(center)){
                    const centerIdx = users.center.indexOf(center);
                    if(users.pw[idIdx]===pw && users.pw[userIdx]===pw &&
                        users.pw[centerIdx]===pw) {
                        response.success = true;
                        return res.json(response);
                    }
                };
            };
        }

        response.success = false;
        response.msg = "센텨명 사용자유형 및 아이디 비밀번호를 확인해주세요!"
        return res.json(response);
    },
};

module.exports = {
    output,
    process
};



