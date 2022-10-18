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
	
		/* 제출 */
	let memo = document.getElementById("memo");
	let book = document.getElementById("chk01");
	let cloth = document.getElementById("chk02");
	let wash = document.getElementById("chk03");
	let tooth = document.getElementById("chk04");
	let eat = document.getElementById("chk05");
	let health = document.getElementById("chk06");
	let facewash = document.getElementById("chk07");
	let picnic = document.getElementById("chk08");

	function submit(){
		const req = {
			memo: memo.value,
			book: book.checked,
			cloth: cloth.checked,
			wash: wash.checked,
			tooth: tooth.checked,
			eat: eat.checked,
			health: health.checked,
			facewash: facewash.checked,
			picnic: picnic.checked,
		}
		fetch('/detail1', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		})
	}



      