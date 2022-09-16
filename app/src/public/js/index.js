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

	/* 로그인 기능 */

	const id = document.querySelector('#id'),
		  pw = document.querySelector('#pw'),
		center = document.querySelector('#select_center'),
		loginBtn = document.querySelector('#login-button');

	let radioArea = document.getElementById("rdo_area");
	

	loginBtn.addEventListener("click", login);
	
	function radio(event) {
		radioArea.innerText = event.target.value;
		console.log(radioArea.textContent)
		}

	function login() {
		const req = {
			user: radioArea.textContent,
			center: center.options[center.selectedIndex].text,
			id: id.value,
			pw: pw.value,
		};

		console.log(req);
	
	};


      