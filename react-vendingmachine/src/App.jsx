import React, { useState } from 'react';
// SPA 구성 라이브러리
// import { Routes, Route, Link } from 'react-router-dom';
import Management from './pages/Management';
import Charge from './pages/Charge';
import Product from './pages/Product';

function App() {
  // products의 요소 데이터 형식 { product: "솔의눈", price: "1000", count: "1" }
  const [products, setProducts] = useState([]);
  // 잔돈의 데이터 형식입니다.
  const [coins, setCoins] = useState({ 500: 0, 100: 0, 50: 0, 10: 0 });
  /* API 호출 상수 */
  // const Random = global.MissionUtils.Random;
  // const randomNumber = Random.pickNumberInRange(1, 10);
  /* API 예시 입니다. 확인하시고 지우시면 됩니다. */
  // console.log(randomNumber);
  /* react-router-dom으로 SPA를 먼저 구성해주세요. */
  return (
    <React.Fragment>
        <button id='management-button'>상품 관리</button>
        <button id='charge-button'>잔돈 충전</button>
        <button id='product-button'>상품 구매</button>
        <Management products={products} setProducts={setProducts}/>
        <Charge coins={coins} setCoins={setCoins}/>
        <Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>
    </React.Fragment>
  );
}

export default App;