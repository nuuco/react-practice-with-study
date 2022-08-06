import React from 'react'

function Charge() {
  return (
    <React.Fragment>
      <h2>자판기 동전 충전하기</h2>
      <form>
        <input id='charge-input' type={"number"}/>
        <button id='charge-button'>충전하기</button>
      </form>
      <div id='charge-result'>보유 금액:</div>
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
            <td>0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>0개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>0개</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Charge;