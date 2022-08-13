import React from 'react'
import { useState } from 'react';

function Charge({coins, setCoins}) {
  const Random = global.MissionUtils.Random;
  const calcWholeMoney = (coins) => {
    return (500 * coins[500]) + (100 * coins[100]) + (50 * coins[50]) + (10 * coins[10]);
  }
  const [charge, setCharge] = useState(() => calcWholeMoney(coins)); //콜백함수로 쓰면 마운트시 1회 실행

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const money = Number(e.target.money.value);
    if(money % 10 !== 0) {
      return alert("충전 금액은 10원 단위여야 합니다.");
    } else if (money < 0) {
      return alert("양수값만 입력해주세요.");
    }

    //보유 금액 추가
    setCharge((prev) => prev + money); 
    chargeCoins(money);
  }

  const chargeCoins = (money) => {
    //코인 무작위 세팅
    const cnt500 = Random.pickNumberInRange(0, Math.floor(money / 500));
    money = money - (500 * cnt500);

    const cnt100 = Random.pickNumberInRange(0, Math.floor(money / 100));
    money = money - (100 * cnt100);

    const cnt50 = Random.pickNumberInRange(0, Math.floor(money / 50));
    money = money - (50 * cnt50);

    const cnt10 = Math.floor(money / 10);

    //coins = { 500: 0, 100: 0, 50: 0, 10: 0 };
    /* 테스트 코드에 맞게 수정 */
    let result = {...coins};
    result[500] += cnt500;
    result[100] += cnt100;
    result[50] += cnt50;
    result[10] += cnt10;
    setCoins(result);
  }

  return (
    <React.Fragment>
      <h2>자판기 동전 충전하기</h2>
      <form onSubmit={handleOnSubmit}>
        <input id='charge-input' type={"number"} name="money" />
        <button type="submit" id='charge-button' >충전하기</button>
      </form>
      <div id='charge-result'>보유 금액: {charge}원</div>
      <h2>동전 보유 현황</h2>
      <table id='charge-table'>
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td>{coins[500]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>{coins[100]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>{coins[50]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>{coins[10]}개</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Charge;