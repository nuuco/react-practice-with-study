import React from "react";
import { useState } from "react";

function Product({products, setProducts, coins, setCoins}) {
  const [leftMoney, setLeftMoney] = useState(0);
  const [changes, setChanges] = useState({ 500: 0, 100: 0, 50: 0, 10: 0 });
  const [nonRefund, setNonRefund] = useState(0);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const money = Number(e.target.money.value);
    if(money % 10 !== 0) {
      return alert("충전 금액은 10원 단위여야 합니다.");
    } else if (money < 0) {
      return alert("양수값만 입력해주세요.");
    }

    setLeftMoney((prev) => prev + money);
    setChanges({ 500: 0, 100: 0, 50: 0, 10: 0 });
    setNonRefund(0);
  }

  const handleBuyBtn = (idx) => (event) => {
    //{ product: "솔의눈", price: "1000", count: "1" }
    let {product, price, count} = products[idx];

    if(leftMoney < price) {
      return alert("금액이 부족합니다.")
    }

    count--;
    setLeftMoney((prev) => prev - price);
    setProducts([...products.slice(0, idx), {product, price, count}, ...products.slice(idx + 1)]);
  }


  const handleRefundBtn = () => {
    let left = leftMoney;

    let cnt = Math.floor(left / 500);
    const refund500 = cnt <= coins[500] ? cnt : coins[500];
    left = left - (500 * refund500);

    cnt = Math.floor(left / 100);
    const refund100 = cnt <= coins[100] ? cnt : coins[100];
    left = left - (100 * refund100);

    cnt = Math.floor(left / 50);
    const refund50 = cnt <= coins[50] ? cnt : coins[50];
    left = left - (50 * refund50);

    cnt = Math.floor(left / 10);
    const refund10 = cnt <= coins[10] ? cnt : coins[10];
    left = left - (10 * refund10);

    setChanges({ 500: refund500, 100: refund100, 50: refund50, 10: refund10 });
    setNonRefund(left);
    setLeftMoney(0);
    setCoins((prev) => (
      {
        500: prev[500] - refund500,
        100: prev[100] - refund100,
        50: prev[50] - refund50,
        10: prev[10] - refund10
      }
    ))
  }

  return (
    <React.Fragment>
      <h2>금액 투입</h2>
      <form onSubmit={handleOnSubmit}>
        <input name="money" id="product-input" type={"number"} />
        <button type="submit" id="product-input-button" >투입하기</button>
      </form>
      <div id="product-result">투입한 금액: {leftMoney}원</div>
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
          {products && products.map((el, idx) => (
            <tr key={idx}>
              <td>{el.product}</td>
              <td>{el.price}</td>
              <td>{el.count}</td>
              <td><button onClick={handleBuyBtn(idx)} disabled={el.count > 0 ? false : true} >구매하기</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>잔돈</h2>
      <button id="product-output-button" onClick={handleRefundBtn}>반환하기</button>
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
            <td>{changes[500]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>{changes[100]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>{changes[50]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>{changes[10]}개</td>
          </tr>
        </tbody>
      </table>
      <div>미반환금: {nonRefund}원</div>
    </React.Fragment>
  )
}

export default Product;