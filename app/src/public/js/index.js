"use strict";

/* 라디오버튼 선택여부 회원가입 페이지 이동 */

let manage = document.getElementById('rdo01');
let protect = document.getElementById('rdo02');
let signUp = document.querySelector('.sign-up');
	
	function crossPage() {
		
		if(manage.checked == true && protect.checked == false){
			location.href='/signup';
		}
		else if(protect.checked == true && manage.checked== false){
			location.href='/signup_p';
		};
	};

	/* 로그인 기능 */

	const id = document.querySelector('#id'),
		  pw = document.querySelector('#pw'),
		center = document.querySelector('#select_center'),
		loginBtn = document.querySelector('#login-button'),
		loginBtn2 = document.querySelector('#login-button2');

	let radioArea = document.getElementById("rdo_area");
	
	function radio(event) {
		radioArea.innerText = event.target.value;
		console.log(radioArea.textContent)
		}



      