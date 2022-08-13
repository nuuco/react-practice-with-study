import React, { useState } from 'react';
// SPA 구성 라이브러리
import { Routes, Route, Link } from 'react-router-dom';
import Management from './pages/Management';
import Charge from './pages/Charge';
import Product from './pages/Product';

function App() {
  // products의 요소 데이터 형식 { product: "솔의눈", price: "1000", count: "1" }
  const [products, setProducts] = useState([]);
  // 잔돈의 데이터 형식입니다.
  const [coins, setCoins] = useState({ "500": 0, "100": 0, "50": 0, "10": 0 });
  return (
    <React.Fragment>
        <Link to='/'><button id='management-button'>상품 관리</button></Link>
        <Link to='/charge'><button id='charge-button'>잔돈 충전</button></Link>
        <Link to='/product'><button id='product-button'>상품 구매</button></Link>
      <Routes>
        <Route path='/' element={<Management products={products} setProducts={setProducts}/>}/>
        <Route path='/charge' element={<Charge coins={coins} setCoins={setCoins}/>}/>
        <Route path='/product' element={<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;