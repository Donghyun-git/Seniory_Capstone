"use strict";

//모듈
const express = require('express');
const app = express();
const fs = require("fs");
const data = fs.readFileSync('/Users/ddongs/Desktop/portfolio/Capstone_re/app/src/databases/user.json');
const conf = JSON.parse(data);
const cors = require("cors");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const mysql = require("mysql");
const session = require("express-session");
const MySqlStore = require("express-mysql-session")(session);

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(cors());
app.use("/", home); // use -> 미들웨어 등록해주는 메소드.
app.use(session({
    secret              : 'ABCD1234ABAB!@',
    resave              : false,
    saveUninitialized   : true,
    store               : new MySqlStore({
        host: conf.host,
        user: conf.user,
        password: conf.password,
        port: conf.port,
        database: conf.database
        })
}));

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
});


connection.query('select * from protect;', function(error, results, fields) {
    if(error) throw error;
})

//보호자 환자 조인

//관리자 로그인
app.post("/",encoder, async function(req, res){
    const center = req.body.center;
    const id = req.body.id;
    const pw = req.body.pw;
    const info = [];
    
    connection.query('select center, id, pw, name from user where center = ? and id = ? and pw = ?;',[center, id, pw], function(error, results, fields) {
        let userName = results[0].name;
        connection.query('select user.name, patient.pname, patient.page, patient.sex, patient.pregistNum, patient.ppostNum, patient.padr, patient.pcenter, patient.memo, patient.book, patient.cloth, patient.bath, patient.tooth, patient.eat, patient.health, patient.facewash, patient.picnic from user inner join patient on user.name = patient.manName where user.name = ?;',[userName],
        function(error, results, field) {
            if(error) throw error
                if (results.length > 0){
                    for(let i=0; i<results.length; i++){
                        let patient = {
                                "pname": results[i].pname,
                                "page":  results[i].page,
                                "sex":   results[i].sex,
                                "padr":  results[i].padr 
                             }
                        info.push(patient);
                  }
                        if(results[0] !==undefined){
                                    req.session.name = userName;
                                    req.session.isLogined = true;
                                    req.session.info = info;
                                    req.session.workCount = info.length;
                                    console.log(req.session.info[0].pname);
                                    req.session.save(() => {
                                        res.redirect('/list1');
                                    });
                            }
                            } else {
                                res.send(`<script>alert('로그인에 실패하였습니다! 사용자 정보를 다시 확인해주세요!');
                                location.href='/'</script>`);
                            }
         });
     });
 });


//보호자 로그인
app.post("/index_p",encoder, function(req, res){
    const center = req.body.center;
    const id = req.body.id;
    const pw = req.body.pw;
    
    connection.query('select center, id, pw, name, silverName, phoneNum from protect where center = ? and id = ? and pw = ?;',[center, id, pw], function(error, results, fields) {

        if(error) throw error
            if (results.length > 0){
                 for(let i=0; i<results.length; i++){
                    if(results[i] !==undefined){
                        req.session.name = results[i].name;
                        req.session.sname = results[i].silverName;
                        req.session.pnum = results[i].phoneNum;
                        req.session.isLogined = true;
                        req.session.save(() => {
                            res.redirect('/mypage_p1');
                        });
                    }
                }
            } else {
                res.send(`<script>alert('로그인에 실패하였습니다! 사용자 정보를 다시 확인해주세요!');
                location.href='/index_p'</script>`);
            }
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
            else {
                res.send(`<script>alert('회원가입이 완료되었습니다.');
                location.href='/'</script>`);
            }
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
            else {
                res.send(`<script>alert('회원가입이 완료되었습니다.');
                location.href='/'</script>`);
            }

        res.end();
     })
}
});



//로그인 성공(관리자)
app.get("/list1", function(req, res){
    let output = "";
    let list ="";
    if(req.session.name && req.session.info && req.session.workCount){
        for(let i=0; i<2; i++){
            list += `
            <li class="list-item">
                                <a href="detail1" class="list-item__link">
                                    <em class="list-item__thumb" style="background:url('../../img/profile_sample.jpg')no-repeat center center / cover;"></em>
                                    <div class="list-item__text">
                                        <h5><b>${req.session.info[i].pname}</b>어르신</h5>
                                        <p>${req.session.info[i].padr} / ${req.session.info[i].page} / ${req.session.info[i].sex}</p>
                                    </div>
                                    <ul class="list-item__todo">
                                        <li><span>책읽기</span></li>
                                        <li><span>목욕하기</span></li>
                                    </ul>
                                </a>
                                <a href="tel:010-8300-7586" class="list-item__tel">전화걸기</a>
                            </li>
            `;
        }
        output += `<!DOCTYPE HTML>
            <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
            <head>
            <meta charset="utf-8">
            <meta name="HandheldFriendly" content="True">
            <meta name="MobileOptimized" content="320">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
            <meta name="mobile-web-app-capable" content="yes">	
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <meta name="format-detection" content="telephone=no">
            <meta name="Robots" content="ALL" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>생활관리사 맞춤 서비스</title>
            <link rel="stylesheet" type="text/css" href="css/style.css">
            </head>
            <body>
            <h1 id="title">생활관리사 맞춤 서비스</h1>
            
            
            <div id="wrap">
                <div id="gnb">
                    <h2 id="gnb-title">시니어리</h2>
                    <button id="gnb-menu"><span>메뉴</span></button>
                    <ul id="gnb-list">
                        <li><a href="list1">오늘업무</a></li>
                        <li><a href="calender">종합업무</a></li>
                        <li><a href="workshare">인수인계</a></li>
                        <li><a href="manage">어르신 관리</a></li>
                        <li><a href="mypage">마이페이지</a></li>
                        <li><a href="/logout">로그아웃</a></li>
                    </ul>
                </div>
                <div id="contents">
                    <div id="inner">
                        
                        <div class="list-myinfo">
                            <h4 class="list-myinfo__name"><b>${req.session.name}</b> 관리사님<br/>반갑습니다!</h4>				
                        </div>
                        <dl class="list-myinfo__list">
                            <dt>
                                <h5>오늘 업무</h5>
                                <p>총 <b>10</b>건</p>
                            </dt>
                            <dd>
                                <ul>
                                    <li>
                                        <a href="fixwork1">
                                            <h5>고정 업무</h5>
                                            <p><b>${req.session.workCount}</b>건</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="morework">
                                            <h5>추가 업무</h5>
                                            <p><b>2</b>건</p>
                                        </a>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
            
            
                        <div class="list-title">
                            <h5>고정 업무</h5>
                            <a href="fixwork1">전체보기</a>
                        </div>
                        
                        <ul class="list-group">
                         ${list}
                        </ul>
            
            
            
                        <div class="list-title">
                            <h5>추가 업무</h5>
                            <a href="morework">전체보기</a>
                        </div>
            
                        <ul class="list-group">
                            <li class="list-item">
                                <a href="#" class="list-item__link">
                                    <em class="list-item__thumb" style="background:url('../../img/profile_sample.jpg')no-repeat center center / cover;"></em>
                                    <div class="list-item__text">
                                        <h5><b>김춘배</b>어르신</h5>
                                        <p>경기도 광명시 하안3동 / 67세 / 남</p>
                                    </div>
                                    <ul class="list-item__todo">
                                        <li><span>책읽기</span></li>
                                        <li><span>목욕하기</span></li>
                                    </ul>
                                </a>
                                <a href="#" class="list-item__tel">전화걸기</a>
                            </li>
                            <li class="list-item">
                                <a href="#" class="list-item__link">
                                    <em class="list-item__thumb" style="background:url('../../img/profile_sample.jpg')no-repeat center center / cover;"></em>
                                    <div class="list-item__text">
                                        <h5><b>김춘배</b>어르신</h5>
                                        <p>경기도 광명시 하안3동 / 67세 / 남</p>
                                    </div>
                                    <ul class="list-item__todo">
                                        <li><span>책읽기</span></li>
                                        <li><span>목욕하기</span></li>
                                    </ul>
                                </a>
                                <a href="#" class="list-item__tel">전화걸기</a>
                            </li>
                        </ul>
            
                        <p class="page-copy">Copyright &copy; Dongs All Rights Reserved.</p>
            
                    </div><!--  inner -->
                </div><!--  content -->
            </div><!--  wrap -->
            
            
            
            
            <!-- JS -->
            <script src="js/jquery-2.2.1.min.js"></script>
            <script src="js/placeholders.min.js"></script>
            <script src="js/common.js"></script>
            <script>
            
            </script>
            </body>
            </html>
            `;
        console.log(req.session.info);

        res.send(output);
    } 
});

//고정 업무 버튼 로직
app.get("/fixwork1", function(req, res){
    let output = "";
    let list ="";
    if(req.session.name && req.session.info && req.session.workCount){
        for(let i=0; i<req.session.info.length; i++){
            list += `
            <li class="list-item">
                                <a href="detail" class="list-item__link">
                                    <em class="list-item__thumb" style="background:url('../img/profile_sample.jpg')no-repeat center center / cover;"></em>
                                    <div class="list-item__text">
                                        <h5><b>${req.session.info[i].pname}</b>어르신</h5>
                                        <p>${req.session.info[i].padr} / ${req.session.info[i].page} / ${req.session.info[i].sex}</p>
                                    </div>
                                </a>
                                <a href="tel:010-8300-7586" class="list-item__tel">전화걸기</a>
                            </li>
            `;
        }
        output += `<!DOCTYPE HTML>
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
        
        <head>
            <meta charset="utf-8">
            <meta name="HandheldFriendly" content="True">
            <meta name="MobileOptimized" content="320">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
            <meta name="mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <meta name="format-detection" content="telephone=no">
            <meta name="Robots" content="ALL" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>생활관리사 맞춤 서비스</title>
            <link rel="stylesheet" type="text/css" href="css/style.css">
        </head>
        
        <body>
            <h1 id="title">생활관리사 맞춤 서비스</h1>
        
        
            <div id="wrap">
                <div id="gnb">
                    <h2 id="gnb-title">고정 업무</h2>
                    <button id="gnb-menu"><span>메뉴</span></button>
                    <ul id="gnb-list">
                        <li><a href="list1">오늘업무</a></li>
                        <li><a href="calender">종합업무</a></li>
                        <li><a href="workshare">인수인계</a></li>
                        <li><a href="manage">어르신 관리</a></li>
                        <li><a href="mypage">마이페이지</a></li>
                        <li><a href="/">로그아웃</a></li>
                    </ul>
                </div>
                <div id="contents">
                    <div id="fix-inner">
                        <div class="list-area">
                        <ul class="list-group">
                            ${list}
                        </ul>
                    </div>
                    </div><!-- inner -->
                </div><!-- content -->
            </div><!-- wrap -->
        
        
        
        
            <!-- JS -->
            <script src="js/jquery-2.2.1.min.js"></script>
            <script src="js/placeholders.min.js"></script>
            <script src="js/common.js"></script>
            <script>
        
            </script>
        </body>
        
        </html>
        
            `;
        res.send(output);
}
});

//상세페이지
app.get("/detail1", function(req, res){
        console.log(info);
    }
)

//로그인 성공(보호자)
app.get("/mypage_p1", function(req, res){
    let output ="";
    if(req.session.name && req.session.sname && req.session.pnum){
        output += `<!DOCTYPE HTML>
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
        
        <head>
            <meta charset="utf-8">
            <meta name="HandheldFriendly" content="True">
            <meta name="MobileOptimized" content="320">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
            <meta name="mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <meta name="format-detection" content="telephone=no">
            <meta name="Robots" content="ALL" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>생활관리사 맞춤 서비스</title>
            <link rel="stylesheet" type="text/css" href="css/style.css">
        </head>
        
        <body>
            <h1 id="title">생활관리사 맞춤 서비스</h1>
        
        
            <div id="wrap">
                <div id="gnb">
                    <h2 id="gnb-title">마이페이지</h2>
                    <button id="gnb-menu"><span>메뉴</span></button>
                    <ul id="gnb-list">
                        <li><a href="list">오늘업무</a></li>
                        <li><a href="calender">종합업무</a></li>
                        <li><a href="workshare">인수인계</a></li>
                        <li><a href="manage">어르신 관리</a></li>
                        <li><a href="mypage">마이페이지</a></li>
                        <li><a href="/">로그아웃</a></li>
                    </ul>
                </div>
                <div id="contents">
                    <div id="inner">
                        <div class="profile">
                            <em class="profile-photo" style="background:url('../../img/profile_sample.jpg') no-repeat center center / cover"></em>
                            <h5>${req.session.name}</h5>
                        </div>
                                <dl class="profile-list">
                                    <dt><i class="fa fa-phone" aria-hidden="true"></i>${req.session.pnum}</dt>
                                    <dd><i class="fa fa-user" aria-hidden="true" style="float: left; padding-top: 7px;"></i><a href="#">${req.session.sname} 어르신</a><i class="fa fa-angle-right" aria-hidden="true"></i></dd>
                                </dl>        
                        <div class="mypage-list">
                            <ul>
                               <li><a href="modify">회원정보수정</a></li>
                               <li><a href="#">설정</a></li>
                               <li><a href="/">로그아웃</a></li>
                               <li><a href="tel:010-8300-7586">1:1 전화문의</a></li>
                               <li><a href="#">앱 버전</a></li>
                            </ul>
                        </div>
                    </div><!-- inner -->
                </div><!-- content -->
            </div><!-- wrap -->
        
        
        
        
            <!-- JS -->
            <script src="js/jquery-2.2.1.min.js"></script>
            <script src="js/placeholders.min.js"></script>
            <script src="js/common.js"></script>
            <script>
        
            </script>
        </body>
        
        </html>`;
        res.send(output);
    }
});

//로그아웃(관리자)
app.get("/logout", function(req, res) {
    var session = req.session;
    delete session.name, session.info, session.isLogined;
    req.session.save(() => {
        res.redirect('/');
    });
    console.log(session);
});

//로그아웃(보호자)
app.get("/list1", function(req, res) {
    delete req.session.name;
    delete req.session.sname;
    delete req.session.pnum;
    req.session.save(() => {
        res.redirect('/');
    });
});

//로그인 성공(보호자)
app.get("/index_p", function(req, res){
    res.sendFile(__dirname + "/mypage_p");
});


//관리자 회원가입 성공
app.get("/", function(req, res){
    res.sendFile(__dirname + "/");
});

//보호자 회원가입 성공

app.get("/index_p", function(req, res){

    res.sendFile(__dirname + "/");
});




module.exports = app, conf;

