import React from 'react'
import { useState } from 'react';

function Management({products, setProducts}) {
  // products의 요소 데이터 형식 { product: "솔의눈", price: "1000", count: "1" }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const product = e.target.product.value;
    const price = e.target.price.value;
    const count = e.target.count.value;

    if(product === "") return alert("상품명을 입력해주세요.");
    else if(price === "") return alert("겨격을 입력해주세요.");
    else if(count === "") return alert("수량을 입력해주세요.");
    else if(Number(count) <= 0) return alert("수량은 0보다 커야합니다.");
    else if(Number(price) < 100 || Number(price) % 10 !== 0) return alert("가격은 100원 이상이여야하고, 10원 단위여야 합니다.");

    const newProduct = {
      product,
      price,
      count
    }

    setProducts([...products, newProduct]);
  }

  return (
    <React.Fragment>
      <h2>상품 추가하기</h2>
      <form onSubmit={handleOnSubmit}>
        <input name="product" id='management-product-input' placeholder='상품명' type={"text"} />
        <input name="price" id='management-price-input' placeholder='가격' type={"number"} />
        <input name="count" id='management-count-input' placeholder='수량' type={"number"} />
        <button type="submit" id='management-submit' >추가하기</button>
      </form>
      <h2>상품 현황</h2>
      <table id='management-table'>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {/* products && 를 넣어주지 않으면 'map' undefined 가 뜬다. (테스트에서만) */}
          {/* 첫 렌더링시 products에 데이터가 안들어와서 undefined 일때 map 메서드를 써서 발생하는 오류 */}
          {products && products.map((el, idx) => (
            <tr key={idx}>
              <td>{el.product}</td>
              <td>{el.price}</td>
              <td>{el.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Management;