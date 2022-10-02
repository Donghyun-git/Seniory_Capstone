"use strict"

	/* 회원가입 기능 */
    const id = document.querySelector('#ID'),
        pw = document.querySelector('#PW'),
        pwCheck = document.querySelector('#PW_check'),
        checkArea = document.querySelector('.PW_check_label'),
        name = document.querySelector('#signup-form__name'),
        registNum = document.querySelector('#signup-form__RN'),
        postCode = document.querySelector('#postcode'),
        adr = document.querySelector('#address'),
        extraAdr = document.querySelector('#extraAddress'),
        detailAdr = document.querySelector('#detailAddress'),
        phoneNum = document.querySelector('#signup-form__tel'),
        center = document.querySelector('#select_center'),
        signupBtn = document.querySelector('#signup-button');

    /* 비밀번호 일치여부 */
    function Check() {
            if(pw.value!='' && pwCheck.value!='') {
                if(pw.value==pwCheck.value) { 
                    checkArea.innerHTML='비밀번호가 일치합니다.';
                    checkArea.style.color='blue';
            } else { 
                checkArea.innerHTML='비밀번호가 일치하지 않습니다.'; 
                checkArea.style.color='red';
            }
        }
    }

	signupBtn.addEventListener("click", signup);

	function signup() {
        if(!id.value) return alert("아이디를 입력해주세요.");
        if(pw.value !== pwCheck.value ){
            return alert("비밀번호가 일치하지 않습니다.");
        }
        if(!name.value) {
                return alert("이름, 주민번호, 주소 및 상세주소, 연락처는 필수 입력 항목입니다.")
        }
        if(!name.value) {
                return alert("이름, 주민번호, 주소 및 상세주소, 연락처는 필수 입력 항목입니다.")
        }
        if(!registNum.value) {
            return alert("이름, 주민번호, 주소 및 상세주소, 연락처는 필수 입력 항목입니다.")
        }
        if(!phoneNum.value) {
            return alert("이름, 주민번호, 주소 및 상세주소, 연락처는 필수 입력 항목입니다.")
        }
        if(!postCode.value) {
            return alert("이름, 주민번호, 주소 및 상세주소, 연락처는 필수 입력 항목입니다.")
        }



		const req = {
            center: center.options[center.selectedIndex].text,
            id: id.value,
			pw: pw.value,
            name: name.value,
            registNum: registNum.value,
            postNum: postCode.value,
            adr: adr.value,
            extraAdr: extraAdr.value,
            detailAdr: detailAdr.value,
            phoneNum: phoneNum.value,
		};

		fetch("/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(req),
		})
		  .then((res) => res.json())
		  .then((res) => {
			if (res.success){
				location.href ="/";
			} else {
				alert(res.msg);
			}
		  })
		  .catch((err) => {
			console.error(("회원가입 중 에러 발생"));
		  });
			
	};


      