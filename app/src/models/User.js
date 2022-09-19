"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    login() {
        const body = this.body;
        const { center, user, id, pw } = UserStorage.getUserInfo(body.id);
        
        if (id) {
            if ( id === body.id && center === body.center 
                && user === body.user && pw === body.pw ){
                    return { success: true };
                }
                return { success: false, msg: "센터명 사용자 유형 및 아이디 비밀번호를 확인해주세요!"};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    }
}

module.exports = User;