import React from 'react'

function Management() {
  return (
    <React.Fragment>
      <h2>상품 추가하기</h2>
      <form>
        <input id='management-product-input' placeholder='상품명' type={"text"} />
        <input id='management-price-input' placeholder='가격' type={"number"} />
        <input id='management-count-input' placeholder='수량'type={"number"} />
        <button id='management-submit'>추가하기</button>
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
          {/* 아래는 테이블 예시 데이터 입니다. 확인후 지워주세요!!*/}
          <tr>
            <td>콜라</td>
            <td>1500</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Management;