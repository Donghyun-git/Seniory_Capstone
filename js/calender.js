let date = new Date();

const renderCalender = () => {
const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

document.querySelector('.year').textContent = `${viewYear}년`;
document.querySelector('.month').textContent = ` ${viewMonth + 1}월`;
const prevLast = new Date(viewYear, viewMonth, 0);
const thisLast = new Date(viewYear, viewMonth + 1, 0 /*day*/); //지난달 마지막날 데이터 가져옴

const PLDate = prevLast.getDate();
const PLDay = prevLast.getDay();

const TLDate = thisLast.getDate();
const TLDay = thisLast.getDay();

const prevDates = [];
const thisDates = [...Array(TLDate + 1).keys()].slice(1);
const nextDates = [];

if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

const dates = prevDates.concat(thisDates, nextDates);

const firstDateIndex = dates.indexOf(1);
const lastDateIndex = dates.lastIndexOf(TLDate);

dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';

    dates[i] = `<div class="date"><div class="c-1"></div><span class="${condition}" onclick="listRendering(event)"> ${date}</span></div>`;
  })

document.querySelector('.dates').innerHTML = dates.join(''); 

const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
console.log(dates);
console.log(TLDate)
};

renderCalender();

const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalender();
  };
  
  const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalender();
  };
  
  const goToday = () => {
    date = new Date();
    renderCalender();
  };

/* 인수인계 */

/* 
날짜 클릭했을 떄 해당 날짜 리스트 랜더링

		<div class="ws-list-box">
                    <ul class="ws-plan">
                            <li><input type="checkbox" name="chk" id="chk09" checked /><label for="chk09">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk10" checked /><label for="chk10">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk11" checked/><label for="chk11">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk12" checked/><label for="chk12">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk13" checked/><label for="chk13">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk14" checked/><label for="chk14">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk15" checked/><label for="chk15">김춘배 어르신 방문</label></li>
                            <li><input type="checkbox" name="chk" id="chk16" checked/><label for="chk16">김춘배 어르신 방문</label></li>
                    </ul>
					*/
          
          
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

          /* 인수인계 캘린더 이벤트 */

          let listRendering = (e) => {
            let state = e.target.className;
            let resultHTML = '';

            if(state == otherDay.mode){
              for(i=0; i<todayList.length; i++){
                resultHTML += `
                        <li><input type="checkbox" name="chk" id="chk${i+9}" checked /><label for="chk${i+9}">${todayList[i].name} 어르신 방문</label></li>
                        `;

              }
            } else if(state == otherMonthDay.mode){
              for(i=0; i<otherList.length; i++){
                resultHTML += `
                        <li><input type="checkbox" name="chk" id="chk${i+9}" checked /><label for="chk${i+9}">${otherList[i].name} 어르신 방문</label></li>
                        `;

              }
            } else if(state == today.mode){
              for(i=0; i<thisList.length; i++){
                resultHTML += `
                        <li><input type="checkbox" name="chk" id="chk${i+9}" checked /><label for="chk${i+9}">${thisList[i].name} 어르신 방문</label></li>
                        `;

              }
            }
            document.querySelector('.ws-plan').innerHTML = resultHTML;

            
          };

          /* 종합업무 캘린더 이벤트 */

          let listRendering1 = (e) => {
            let state = e.target.className;
            let resultHTML = '';

            if(state == otherDay.mode){
              for(i=0; i<todayList.length; i++){
                resultHTML += `
                        <li><input type="checkbox" name="chk" id="chk${i+9}" checked /><label for="chk${i+9}">${todayList[i].name} 어르신 방문</label></li>
                        `;

              }
            } else if(state == otherMonthDay.mode){
              for(i=0; i<otherList.length; i++){
                resultHTML += `
                        <li><input type="checkbox" name="chk" id="chk${i+9}" checked /><label for="chk${i+9}">${otherList[i].name} 어르신 방문</label></li>
                        `;

              }
            } else if(state == today.mode){
              for(i=0; i<thisList.length; i++){
                resultHTML += `
                        <li><input type="checkbox" name="chk" id="chk${i+9}" checked /><label for="chk${i+9}">${thisList[i].name} 어르신 방문</label></li>
                        `;

              }
            }
            document.querySelector('.ws-plan').innerHTML = resultHTML;

            
          };
        
          
          /* function randomIDGenerate(){
            return '_' + Math.random().toString(36).substr(2, 9);
          }; */



 
