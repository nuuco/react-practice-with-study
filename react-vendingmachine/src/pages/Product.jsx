import React from "react";

function Product() {
  return (
    <React.Fragment>
      <h2>금액 투입</h2>
      <form>
        <input id="product-input"/>
        <button id="product-input-button">투입하기</button>
      </form>
      <div id="product-result">투입한 금액: </div>
      <h2>구매할 수 있는 상품 현황</h2>
      <table id="product-table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody>
          {/* 아래는 테이블 예시 데이터 입니다. 확인후 지워주세요!!*/}
          <tr>
            <td>콜라</td>
            <td>1500</td>
            <td>20</td>
            <td><button>구매하기</button></td>
          </tr>
        </tbody>
      </table>
      <h2>잔돈</h2>
      <button id="product-output-button">반환하기</button>
      <table id="product-coin-table">
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

export default Product;