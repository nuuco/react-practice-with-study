import React from 'react';
import { useState } from 'react';

function App() {
  /* 코드 작성 구역 */
  const Random = global.MissionUtils.Random;
  const [randomNum] = useState(Random.pickUniqueNumbersInRange(1, 9, 3));
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isHomeRun, setIsHomeRun] = useState(false);
  
  //입력값 변경 시 실행되는 핸들러
  const handleChange = (e) => {
    if(checkInput(e.target.value)){
      setInput(e.target.value);
    }
  }

  //확인 버튼 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    //무조건 form 안에 button 을 누르면 input 값이 리셋되나? 
    //button 타입이 reset 이나 submit 이 아니어도?
    //button 이면 무조건 새로고침 되니까, preventDefalut 해야되나?...

    if(checkInput(input)) { //유효성 검사 통과
      checkResult(input);
      setInput("");
    }

  }

  //확인 버튼 눌렀을 때 input 값이 예외처리 & 경고창 띄워주는 메소드
  const checkInput = (input) => {
    //1. 숫자가 아닌 것을 입력했을 경우
    if(/\D/.test(input)) {
      global.alert("숫자만 입력해주세요.");
      return false;
    }

    //2. 숫자 0 을 입력했을 경우
    if(/0/.test(input)) {
      alert("1 ~ 9 사이의 수를 입력해주세요.");
      return false;
    }

    //3. 숫자 세 개가 미만 또는 초과로 입력했을 경우
    const regex = /^[1-9]{0,3}$/;
    if(!regex.test(input)) {
      alert("숫자 3개를 입력해주세요.");
      return false;
    }

    //4. 숫자를 중복해서 입력했을 경우
    if(regex.test(input)) {
      //중복 숫자 체크
      const doublingCheck = new Set(input.split("")).size === input.length;
      //Set 의 길이는 size 다. length 가 아니다!
      if(!doublingCheck) { //중복일 때
        alert("서로 다른 수를 입력해주세요.");
        return false;
      } else {  //중복이 아닐 때
        return true;
      }
    }

    return false;
  }

  //결과값(볼 스트라이크 수) 만들어주는 메소드
  const checkResult = (input) => {
    //input 값 숫자 배열로 바꾸기. "123" => [1, 2, 3];
    const numArr = input.split("").map(el => Number(el));

    console.log("정답", randomNum);
    //console.log("입력", numArr);
    let strikeCnt = 0;
    let ballCnt = 0;
    
    //인덱스 상관없이 일치하는 숫자 개수
    const sameNumCnt = numArr.filter(num => {
      if(randomNum.includes(num)) return true;
      return false;
    }).length;

    //인덱스까지 일치하는 숫자 개수
    strikeCnt = numArr.filter((num, idx) => {
      if(randomNum[idx] === num) return true;
      return false;
    }).length;

    //ballCnt 는 sameNumCnt(일치하는 개수) - strikeCnt(인덱스까지 일치하는 개수) 가 된다.
    ballCnt = sameNumCnt - strikeCnt;

    let msg = "";
    if(ballCnt + strikeCnt === 0) {
      msg = "낫싱";
    } else if(ballCnt !== 0 && strikeCnt === 0) {
      msg = ballCnt + "볼";
    } else if(ballCnt === 0 && strikeCnt !== 0) {
      msg = strikeCnt + "스트라이크";
    } else {
      msg = ballCnt + "볼 " + strikeCnt + "스트라이크";
    }
    //긴 삼항연산자 -> if else 가독성(에어비엔비) (리팩토링하기)

    if(strikeCnt === 3) {
      msg = "승리";
    }

    setResult(msg);

    if(strikeCnt === 3) {
      setIsHomeRun(true);
    }
  }

  //재시작 버튼 핸들러
  const handleRestart = () => {
    const isRestart = global.confirm("재시작 하시겠습니까?");
    if(isRestart) {
      window.location.reload(); // 이 한 줄로 초기화!
    }
  }

  return (
    <div id="app">
    <h1>⚾ 숫자 야구 게임 (테스트 실패용) </h1>
    <p>
      <strong>1~9까지의 수</strong>를 중복없이
      <strong>3개</strong> 입력해주세요. <br />
      올바른 예) 139 <br />
      틀린 예) 122
    </p>
    <form>
      <input type="text" id="user-input" value={input} onChange={handleChange}/>
      <button id="submit" onClick={handleSubmit} >확인</button>
    </form>
    <h3>📄 결과</h3>
    <div id="result">{result}</div>
    {isHomeRun ? 
      <>
        <h4>🎉정답을 맞추셨습니다🎉</h4>
        <div>게임을 새로 시작하시겠습니까?</div>
        <br />
        <button id="game-restart-button" onClick={handleRestart}>재시작</button>
      </> :
      null
    }
  </div>
  );
}

export default App;