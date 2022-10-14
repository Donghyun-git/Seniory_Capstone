module.exports = {
    HTML:function(title, pname, padr, page, sex){
        return `
        <!DOCTYPE HTML>
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
            <title>${title}</title>
            <link rel="stylesheet" type="text/css" href="src/public/css/style.css">
            </head>
            <body>
            <h1 id="title">생활관리사 맞춤 서비스</h1>


            <div id="wrap">
                <div id="gnb">
                    <a href="list1" id="gnb-back">뒤로</a>
                    <h2 id="gnb-title">${pname} 어르신</h2>
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
                    <div id="inner">
                        
                        <div class="list-myinfo">
                            <div class="detail-info">
                                <em class="detail-info__thumb" style="background:url('../img/profile_sample.jpg')no-repeat center center / cover;"></em>
                                <div class="detail-info__name">
                                    <h5><b>${pname}</b>어르신</h5>
                                    <p>${padr} / ${page} / ${sex}</p>
                                </div>
                                <ul class="detail-info__btn">
                                    <li><button class="detail-info__call" onclick="location.href='tel:010-8300-7586'">전화걸기</button></li>
                                    <li><button class="detail-info__family" onclick="location.href='tel:010-8300-7586'">보호자연락</button></li>
                                    <li><button class="detail-info__location" onclick="location.href='map'">위치정보</button></li>
                                </ul>
                                <div class="detail-info__complete">
                                    <button>방문완료</button>
                                    <!-- <button class="active">방문완료</button> -->
                                </div>
                            </div>
                        </div>

                        <div class="detail-title">
                            <h5>업무계획</h5>
                        </div>

                        <ul class="detail-plan">
                            <li><input type="checkbox" name="chk" id="chk01" checked/><label for="chk01">책 읽기</label></li>
                            <li><input type="checkbox" name="chk" id="chk02" checked/><label for="chk02">환복</label></li>
                            <li><input type="checkbox" name="chk" id="chk03" /><label for="chk03">목욕 하기</label></li>
                            <li><input type="checkbox" name="chk" id="chk04" /><label for="chk04">구강 관리</label></li>
                            <li><input type="checkbox" name="chk" id="chk05" /><label for="chk05">식사 하기</label></li>
                            <li><input type="checkbox" name="chk" id="chk06" /><label for="chk06">신체 기능 유지</label></li>
                            <li><input type="checkbox" name="chk" id="chk07" /><label for="chk07">세면도움</label></li>
                            <li><input type="checkbox" name="chk" id="chk08" /><label for="chk08">외출 동행</label></li>
                        </ul>

                        <div class="detail-title">
                            <h5>메모</h5>
                        </div>

                        <form action="">
                            <textarea name="" id="" cols="30" rows="10" class="detail-memo__textarea" placeholder="특이사항이나 메모 내용을 입력해주세요."></textarea>
                            <div class="detail-memo__submit">
                                <p><b>0</b> / 300자</p>
                                <button>저장하기</button>
                            </div>
                        </form>
                        


                        <p class="page-copy">Copyright &copy; Dongs All Rights Reserved.</p>

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

        `
    }
}