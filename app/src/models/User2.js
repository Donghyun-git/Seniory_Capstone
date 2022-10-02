"use strict";

const { response } = require("../../app");
const UserStorage2 = require("./UserStorage2");

class User2 {
    constructor(body) {
        this.body = body;
    }

    async login2() {
        const client = this.body;
        const { id, center, pw } = await UserStorage2.getUserInfo(client.id);
        if (id) {
            if ( id === client.id && center === client.center && 
                pw === client.pw ){
                    return { success: true };
                }
                return { success: false, msg: "센터명 사용자 유형 및 아이디 비밀번호를 확인해주세요!"};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    }

    signup_p() {
        const client = this.body;
        const response = UserStorage2.save(client);
        return response;
    }
}





module.exports = User2;