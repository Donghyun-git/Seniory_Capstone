"use strict";

/* 라디오버튼 선택여부 회원가입 페이지 이동 */

let manage = document.getElementById('rdo01');
	let protect = document.getElementById('rdo02');
	let signUp = document.querySelector('.sign-up');
	
	function crossPage() {
		
		if(manage.checked == true && protect.checked == false){
			location.href='./link/signup.html';
		}
		else if(protect.checked == true && manage.checked == false){
			location.href='./link/signup_p.html';
		};
	};

      