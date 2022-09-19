"use strict";

class UserStorage {
   static #users = {
        user: ["관리사", "보호자"],
        center: ["천안센터", "아산센터"],
        id: ["donghyun", "yeonsu"],
        pw: ["1234", "12345"],
        name: ["송승현", "김연수", "안동현"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});


        return newUsers;
    }
};

module.exports = UserStorage;