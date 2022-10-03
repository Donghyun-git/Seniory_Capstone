/* 인수인계 */

/* 날짜 클릭했을 떄 해당 날짜 리스트 랜더링 */
          
          
let todayList = [{
    name: "김춘배"
  }, {
    name: "송승현"
  }, {
    name: "김연수"
  }, {
    name: "이갑용"
  }];

  let thisList = [{
    name: "김춘배"
  }, {
    name: "김상만"
  }, {
    name: "김연수"
  }, {
    name: "이유한"
  }, {
    name: "이갑탄"
  }, {
    name: "채승민"
  }];

  let otherList = [{
    name: "안동삼"
  }, {
    name: "동동삼"
  }, {
    name: "동동이"
  }, {
    name: "우영우"
  }];
 
  let today = {
    mode: "this today"
  }

  let otherDay = {
    mode: "this"
  }

  let otherMonthDay = {
    mode: "other"
  }

  /* 종합업무 캘린더 이벤트 */
 
let year = document.querySelector('.year');
let month = document.querySelector('.month');

  let listRendering = (e) => {
    let state = e.target.className;
    let resultHTML = '';


    if(state == otherDay.mode){
       
      for(i=0; i<todayList.length; i++){
        resultHTML += `
                <a href="detail"><li><span>${todayList[i].name} 어르신 방문</span></li></a>
                `;
      };
      
    } else if(state == otherMonthDay.mode){
        
      for(i=0; i<otherList.length; i++){
        resultHTML += `
                <a href="detail"><li><span>${otherList[i].name} 어르신 방문</span></li></a>
                `;

      }
    } else if(state == today.mode){
        
      for(i=0; i<thisList.length; i++){
        resultHTML += `
                <a href="detail"><li><span>${thisList[i].name} 어르신 방문</span></li></a>
                `;

      }
    }
    document.querySelector('.calender-plan').innerHTML = resultHTML;
};

