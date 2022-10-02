"use strict";

const fs = require("fs").promises;

class UserStorage2 {

    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        return users;

    }
    static getUsers(isAll, ...fields) {
        return fs
         .readFile("./src/databases/users2.json")
         .then((data) => {
            return this.#getUsers(data, isAll, fields);
         })
         .catch(console.error);

    }

    static getUserInfo(id) {
        return fs
         .readFile("./src/databases/users2.json")
         .then((data) => {
            return this.#getUserInfo(data, id);
         })
         .catch(console.error);
    }

    static #getUserInfo(data, id) {
        const users = (JSON.parse(data));
            const idx = users.id.indexOf(id);
            const usersKeys = Object.keys(users);
            const userInfo = usersKeys.reduce((newUser, info) => {
                newUser[info] = users[info][idx];
                return newUser;
             },{}); 
             console.log(userInfo);
            return userInfo;
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if(users.id.includes(userInfo.id)) {
            return new Error("이미 존재하는 아이디 입니다.");
        }
            users.center.push(userInfo.center);
            users.id.push(userInfo.id);
            users.pw.push(userInfo.pw);
            users.name.push(userInfo.name);
            users.silverName.push(userInfo.silverName);
            users.registNum.push(userInfo.registNum);
            users.postNum.push(userInfo.postNum);
            users.adr.push(userInfo.adr);
            users.extraAdr.push(userInfo.extraAdr);
            users.detailAdr.push(userInfo.detailAdr);
            users.phoneNum.push(userInfo.phoneNum);
        console.log(users);
        fs.writeFile("./src/databases/users2.json", JSON.stringify(users));
        return { success: true};
    }
};

module.exports = UserStorage2;