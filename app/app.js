"use strict";

//모듈
const express = require('express');
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const data = fs.readFileSync('/Users/ddongs/Desktop/portfolio/Capstone_re/app/src/databases/user.json');
const conf = JSON.parse(data);
const mysql = require("mysql");
const app = express();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(cors());
app.use("/", home); // use -> 미들웨어 등록해주는 메소드.

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

connection.connect(function(error){
    if (error) throw error
    else console.log("connected");
});

//테이블 쿼리문
connection.query('select * from user;', function(error, results, fields) {
    if(error) throw error;
    console.log('user: ', results);
});


connection.query('select * from protect;', function(error, results, fields) {
    if(error) throw error;
    console.log('protect:', results);
})

//관리자 로그인
app.post("/",encoder, function(req, res){
    const center = req.body.center;
    const id = req.body.id;
    const pw = req.body.pw;
    
    connection.query('select * from user where center = ? and id = ? and pw = ?;',[center, id, pw], function(error, results, fields) {

            if (results.length > 0){
                res.redirect("/list");
            } else {
                res.redirect("/");
            }
            res.end();
    });
});

//보호자 로그인
app.post("/index_p",encoder, function(req, res){
    const center = req.body.center;
    const id = req.body.id;
    const pw = req.body.pw;
    
    connection.query('select * from protect where center = ? and id = ? and pw = ?;',[center, id, pw], function(error, results, fields) {

            if (results.length > 0){
                res.redirect("/mypage_p");
            } else {
                res.redirect("/");
            }
            res.end();
    });
});

//관리사 회원가입
app.post("/signup", encoder, function(req, res){
    const center = req.body.center;
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const registNum = req.body.registNum;
    const postNum = req.body.postNum;
    const adr = req.body.adr;
    const extraAdr = req.body.extraAdr;
    const detailAdr = req.body.detailAdr;
    const phoneNum = req.body.phoneNum;
    const pwCheck = req.body.pwCheck;

            if (!id){
                res.send(`<script>alert('아이디를 입력해주세요!');
                location.href='/signup'</script>`);
             }

            else if(pw !== pwCheck ){
                res.send(`<script>alert('비밀번호가 일치하지 않습니다!');
                location.href='/signup'</script>`);
            }

            else if(!name) {
                res.send(`<script>alert('이름을 입력해주세요!');
                location.href='/signup'</script>`);
                
            }
            else if(!registNum) {
                res.send(`<script>alert('주민번호를 입력해주세요!');
                location.href='/signup'</script>`);
               
            }
            else if(!postNum) {
                res.send(`<script>alert('주소를 입력해주세요!');
                location.href='/signup'</script>`);
               
            }
            else if(!phoneNum) {
                res.send(`<script>alert('연락처를 입력해주세요!');
                location.href='/signup'</script>`);
            }
               else {

    connection.query(`insert into user (center, id, pw, name, registNum, postNum, adr, extraAdr, detailAdr, phoneNum) 
    values ("${center}", "${id}", "${pw}", "${name}", "${registNum}", 
    "${postNum}", "${adr}", "${extraAdr}", "${detailAdr}", "${phoneNum}");`, function(error, results, fields){
        if (error) throw error         
            else res.redirect("/");

        res.end();
    })
}
});

//보호자 회원가입

app.post("/signup_p", encoder, function(req, res){
    const center = req.body.center;
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const silverName = req.body.silverName;
    const registNum = req.body.registNum;
    const postNum = req.body.postNum;
    const adr = req.body.adr;
    const extraAdr = req.body.extraAdr;
    const detailAdr = req.body.detailAdr;
    const phoneNum = req.body.phoneNum;
    const pwCheck = req.body.pwCheck;
    
    console.log(req.body);
            if (!id){
                res.send(`<script>alert('아이디를 입력해주세요!');
                location.href='/signup_p'</script>`);
             }

            else if(pw !== pwCheck ){
                res.send(`<script>alert('비밀번호가 일치하지 않습니다!');
                location.href='/signup_p'</script>`);
            }

            else if(!silverName) {
                res.send(`<script>alert('보호자 이름을 입력해주세요!');
                location.href='/signup_p'</script>`);
                
            }

            else if(!name) {
                res.send(`<script>alert('이름을 입력해주세요!');
                location.href='/signup_p'</script>`);
                
            }

            else if(!registNum) {
                res.send(`<script>alert('주민번호를 입력해주세요!');
                location.href='/signup_p'</script>`);
               
            }
            else if(!postNum) {
                res.send(`<script>alert('주소를 입력해주세요!');
                location.href='/signup_p'</script>`);
               
            }
            else if(!phoneNum) {
                res.send(`<script>alert('연락처를 입력해주세요!');
                location.href='/signup_p'</script>`);
            }
               else {

    connection.query(`insert into protect (center, id, pw, silverName, name, registNum, postNum, adr, extraAdr, detailAdr, phoneNum) 
    values ("${center}", "${id}", "${pw}", "${silverName}", "${name}", "${registNum}", 
    "${postNum}", "${adr}", "${extraAdr}", "${detailAdr}", "${phoneNum}");`, function(error, results, fields){
        if (error) throw error         
            else res.redirect("/index_p");

        res.end();
     })
}
});



//로그인 성공(관리자)
app.get("/list", function(req, res){
    res.sendFile(__dirname + "/list");
});

//로그인 성공(보호자)
app.get("/mypage_p", function(req, res){
    res.sendFile(__dirname + "/mypage_p");
});

//관리자 회원가입 성공
app.get("/", function(req, res){
    res.sendFile(__dirname + "/");
});

//보호자 회원가입 성강

app.get("/index_p", function(req, res){

    res.sendFile(__dirname + "/");
});




module.exports = app;

