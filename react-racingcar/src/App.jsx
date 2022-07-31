import React from 'react';
import { useState } from 'react';

function App() {
  /* API 호출 상수 */
  const Random = global.MissionUtils.Random;

  /* 코드 작성 구역 */
  const [carsInput, setCarsInput] = useState("");  //car 종류 입력값
  const [isValid, setIsValid] = useState(false); //car 종류 입력값이 유효한지 체크
  const [tryNum, setTryNum] = useState(0);  //시도횟수 입력값
  const [result, setResult] = useState([]); //실행 결과

  //car 종류 입력창 핸들러
  const handleCarsInput = (e) => {
    setCarsInput(e.target.value);
  }

  //car 종류 입력 확인 버튼 핸들러
  const handleCarsBtn = (e) => {
    e.preventDefault();
    const tmp = carsInput.split(',');
    const regex = /^[^\s]{1,5}$/;
    setIsValid(false);
    for(let car of tmp) {
      if(!regex.test(car)) {
        return alert("이름은 공백 미포함 1 ~ 5자 사이여야 합니다.");
      }
    }
    setIsValid(true);
  }

  //시도 횟수 입력창 핸들러
  const handleTryInput = (e) => {
    const num = Number(e.target.value);
    if(num <= 0) {
      alert('시도 횟수는 1번 이상이어야 합니다.');
    } else { setTryNum(num); }
  }

  //시도 횟수 입력 확인 버튼 핸들러
  const handleTryBtn = (e) => {
    e.preventDefault();

    if(isValid) {
      startRace();
    } else {
      alert('자동차 이름을 다시 확인해주세요.');
    }
  }

  //실행 결과를 만들어 낼 경주 함수
  const startRace = () => {
    const carsArr = carsInput.split(','); 
    const carsObj = {};
    for(let car of carsArr) {
      carsObj[car] = 0;
    }

    const tryArr = [];
    for(let i = 1; i <= tryNum; i++) {
      tryOneRace(carsObj);
      tryArr.push(...createTryMsg(carsArr, carsObj));
      tryArr.push('\n');
    }

    //우승자 뽑기
    const winnerArr = []; 
    //우승자를 뽑기위해 최댓값 구하기
    let max = Math.max(...Object.values(carsObj));
    for(let car of carsArr) {
      if(carsObj[car] === max) {
        winnerArr.push(car);
      }
    }

    const winnerMsg = `최종 우승자: ${winnerArr.join(', ')}`;

    setResult([...tryArr, winnerMsg]);
  }

  //1회 경주 실행 함수
  const tryOneRace = (carsObj) => {
    for(let car in carsObj) {
      const randomNumber = Random.pickNumberInRange(1, 9);
      if(randomNumber >= 4) {
        carsObj[car] += 1;
      }
    }
  }

  //1회 경주 결과 배열을 만드는 함수 
  const createTryMsg = (carsArr, carsObj) => {
    const msgArr = [];
    for(let car of carsArr) {
      msgArr.push(`${car}: ${'-'.repeat(carsObj[car])}`);
    }
    return msgArr;
  }

  return (
    <div id="app">
      <h1>🏎️ 자동차 경주 게임</h1>
      <p>
        자동차 이름을 <strong>5자 이하로</strong> 콤마로 구분하여 입력해주세요.
        <br />
        올바른 예) east,west,south,north <br />
      </p>
      <form>
        <input id="text-input" type="text" onChange={handleCarsInput} value={carsInput}/>
        <button id="text-button" onClick={handleCarsBtn}>확인</button>
      </form>
      <h4>시도할 횟수를 입력해주세요.</h4>
      <form>
        <input id="number-input" type="number" onChange={handleTryInput} value={tryNum}/>
        <button id="number-button" onClick={handleTryBtn}>확인</button>
      </form>
      <h4>📄 실행 결과</h4>
      <p>
        {result.map((el, idx) => (
          <span key={idx}>{el}<br/></span>
        ))}
      </p>
    </div>
  );
}

export default App;