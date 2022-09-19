"use strict";
const users = {
    user: ["관리사", "보호자"],
    center: ["천안센터", "아산센터"],
    id: ["donghyun", "yeonsu"],
    pw: ["1234", "12345"],
};

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

        if (users.id.includes(id)){
            const idIdx = users.id.indexOf(id);
            if(users.user.includes(user)){
                const userIdx = users.user.indexOf(user);
                if(users.center.includes(center)){
                    const centerIdx = users.center.indexOf(center);
                    if(users.pw[idIdx]===pw && users.pw[userIdx]===pw &&
                        users.pw[centerIdx]===pw) {
                        return res.json({
                            success: true,
                            msg: "로그인 성공",
                        });
                    }
                };
            };
        }

        return res.json({
            success: false,
            msg: "센텨명 사용자유형 및 아이디 비밀번호를 확인해주세요",
        })
    },
};

module.exports = {
    output,
    process
};



