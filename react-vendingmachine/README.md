## 💎 배포 링크
👉 https://react-vendingmachine.netlify.app/

## 🙌 기능 요구사항

### ✅ 1) 공통
상단에 탭메뉴가 존재하며 각 탭에 따라 적절한 기능을 수행한다.

- [x] 상품 관리탭은 자판기가 보유하고 있는 상품을 추가하는 기능을 수행한다.
- [x] 잔돈 충전탭은 자판기가 보유할 금액을 충전하는 기능을 수행한다.
- [x] 상품 구매탭은 사용자가 금액을 투입할 수 있으며, 투입한 금액에 맞춰 상품을 구매하고, 남은 금액에 대해서는 잔돈을 반환하는 기능을 수행한다.
- [x] 다른 탭으로 이동했다 돌아와도 기존 탭의 상태가 유지되어야 한다. -> ❗️상품 구매 탭 예외

### ✅ 2) 상품 관리 탭
상품 관리탭에서, 다음과 같은 규칙을 바탕으로 상품을 추가한다.

- [x] 최초 상품 목록은 비워진 상태이다.
- [x] 상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.
- - [x] 상품 가격은 100원부터 시작하며, 10원으로 나누어 떨어져야 한다.
- [x] 사용자는 추가한 상품을 확인할 수 있다.

### ✅ 3) 잔돈 충전 탭 (자판기 보유 동전)
잔돈 충전 탭에서, 다음과 같은 규칙으로 자판기 보유 금액을 충전한다.

- [x] 잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
- [x] 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 충전하기 버튼을 눌러 자판기 보유 금액을 충전할 수 있다.
- - [x] 자판기 보유 금액은 {금액}원 형식으로 나타낸다.
- [x] 자판기 보유 금액만큼의 동전이 무작위로 생성된다.
- - [x] 동전의 개수는 {개수}개 형식으로 나타낸다.
- [x] 자판기 보유 금액을 누적하여 충전할 수 있다. 추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해진다.
- [x] 상품 구매 탭에서 투입한 금액은 자판기 보유 금액에 더하지 않는다.

### ✅ 4) 상품 구매 탭
- [x] 상품 구매탭에서, 다음과 같은 규칙을 바탕으로 금액을 충전하고, 상품을 구매하며, 잔돈을 반환한다.
- [x] 상품 구매 페이지에서 최초 충전 금액은 0원이며, 반환된 각 동전의 개수는 0개이다.
- [x] 사용자는 투입할 금액 입력 요소에 투입 금액을 입력한 후, 투입하기버튼을 이용하여 금액을 투입한다.
- -  [x] 금액은 10원으로 나누어 떨어지는 금액만 투입할 수 있다.
- -  [x] 자판기가 보유한 금액은 {금액}원 형식으로 나타낸다.
- [x] 금액은 누적으로 투입할 수 있다.
- [x] 품절된 상품의 구매하기 버튼은 disabled 되어야 한다.
- [x] 사용자는 반환하기 버튼을 통해 잔돈을 반환 받을 수 있다.

### ✅ 5) 상품 구매 > 잔돈 계산 모듈
상품 구매 탭에서 잔돈 반환 시 다음과 같은 규칙을 통해 잔돈을 반환한다.

- [x] 잔돈을 돌려줄 때는 현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.
- [x] 지폐를 잔돈으로 반환하는 경우는 없다고 가정한다.
- [x] 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
- [x] 동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.

## ❗️ Ex) 

### 상품 관리

<p align="center">
<img src="https://raw.githubusercontent.com/woowacourse/javascript-vendingmachine-precourse/main/images/demo_product.gif">
</p>

### 잔돈 충전

<p align="center">
<img src="https://raw.githubusercontent.com/woowacourse/javascript-vendingmachine-precourse/main/images/demo_coin.gif">
</p>

### 상품 구매 및 잔돈 반환

<p align="center">
<img src="https://raw.githubusercontent.com/woowacourse/javascript-vendingmachine-precourse/main/images/demo_purchase.gif">
</p>

## 🌈 Random API 참고 사항

Random.pickNumberInRange(startInclusive, endInclusive)   
숫자 범위를 지정하면 시작 또는 끝 숫자를 포함하여 범위의 숫자를 반환한다.
```javascript
Random.pickNumberInRange(1, 10); // 1
Random.pickNumberInRange(1, 10); // 10
Random.pickNumberInRange(1, 10); // 4
Random.pickNumberInRange(1, 10); // 5
```

Random.pickNumberInList(array)   
목록에 있는 숫자 중 하나를 반환한다.
```javascript
Random.pickNumberInList([1, 3, 10]); // 1
Random.pickNumberInList([1, 3, 10]); // 10
Random.pickNumberInList([1, 3, 10]); // 3
```

Random.pickUniqueNumbersInRange(startInclusive, endInclusive, count)   
숫자 범위 내에서 지정된 개수만큼 겹치지 않는 숫자를 반환한다.
```javascript
Random.pickUniqueNumbersInRange(1, 10, 2); // [1, 2]
Random.pickUniqueNumbersInRange(1, 10, 5); // [1, 10, 7, 8, 5]
```

Random.shuffle(array)   
무작위로 섞인 새 목록을 반환한다.
```javascript
Random.shuffle([1, 2, 3, 4, 5]); // [2, 4, 1, 3, 5]
```


## 🔮 코드리뷰 적용하기
- props의 undefined 처리는 props를 구조분해 할당으로 가져오는 부분에서 기본값 처리를 해주면 된다.
    - 리뷰 반영 전
        ```javascript
        //Management.jsx
        {/* products && 를 넣어주지 않으면 'map' undefined 가 뜬다. (테스트에서만) */}
        {/* 첫 렌더링시 products에 데이터가 안들어와서 undefined 일때 map 메서드를 써서 발생하는 오류 */}
        {products && products.map((el, idx) => (
        <tr key={idx}>
            <td>{el.product}</td>
            <td>{el.price}</td>
            <td>{el.count}</td>
        </tr>
        ))}
        ```
    - 리뷰 반영 후
        ```javascript
        ///Management.jsx
        function Management({products = [], setProducts}) { //기본값 처리
            ...
            {products.map((el, idx) => (
                <tr key={idx}>
                    <td>{el.product}</td>
                    <td>{el.price}</td>
                    <td>{el.count}</td>
                </tr>
            ))}
        }
        ```
- `e.target.reset()` 을 사용하면 입력폼을 초기화 시킬 수 있다. 버튼 누른 후 값이 남아있지 않게 하기위해 사용하면 좋다.   
    => 입력값을 받아오는 이벤트 핸들러의 하단에 `e.target.reset()` 를 추가해주었다.