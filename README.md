# react-practice-with-study
🍌 바닐라 스터디에서 진행한 리액트 구현 과제를 올립니다.

## 과제 목록 (배포 링크)
1. 리액트 계산기  👉 https://react-calculator-nuuco.netlify.app/
1. 리액트 숫자야구 게임  👉 https://react-number-baseball.netlify.app/
1. 리액트 자동차 경주 게임  👉 https://react-racingcar.netlify.app/
1. 리액트 자판기 구현  👉 https://react-vendingmachine.netlify.app/

## 코드 리뷰 적용기
처음 경험해본 코드 리뷰...! 팀원분들께 받은 피드백을 실제로 적용해보았다.
### ep1. 선 생각 후 코딩
> 앞선 과제 1과 2 수행 후, @YHJ96 님의 '코드 짜기 전 먼저 생각해보는 습관을 들이는 게 좋다.'는 이야기를 들었다.       
> 👉 어떤 순서를 코드를 짜고 어떤 로직을 적용시켜야 문제를 해결할 수 있는지 미리 생각해보기!
<details>
<summary> 🚗 리액트 자동차 경주 게임 - 🧩 생각 순서</summary>
<div markdown="1">
<br/>

**👉 처음에는 그냥 사용자가 다 규칙에 맞춰서 제대로 입력했을 때만 생각하자!**
1. 우선 필요한 state 를 파악한다.
2. 기본적으로 input 창이 두 개니까 각각 state 로 필요하겠지? 그리고 실행결과를 보여주는 state 도 필요.
3. 자동차 이름 state 와 시도할 횟수 state, 그리고 실행 결과 state 를 만든다. (carsInput, tryNum, result)
3. 앞의 두 state를 바탕으로 입력값을 받아와서 state에 저장해주는 로직(이벤트핸들러)을 먼저 짜면 되겠구나. 예외처리는 나중에 생각.
4. 각 버튼도 필요한 기능이 있으니 해당하는 이벤트핸들러를 만들어줘야겠네...    
   a) 자동차 이름 확인 버튼     
    -> 클릭했을 때, 입력값 유효성 검사해주면 되겠다. alert 창 띄우기    
    -> 에외처리니까 나중에 구현하자...     
   b) 시도할 횟수 확인 버튼       
   -> 클릭했을 때, 유효한 수인지 검사하고(alert 창 띄워주기) 유효하면 경주를 실행하자.   
   -> 예외처리는 나중에 한다 치고 일단 버튼 클릭시 경주 실행하게만 만들어 놓자...
5. 두 값을 이용해 경주를 하는 함수를 만든다. 경주 함수의 로직은 이 정도면 되겠지?   
   a) 자동자 이름을 쉼표 기준으로 나눠서 배열로 만들어준다.    
   ->  바로 객체로 만들면 입력 순서에 따라 결과값이 나오지 않음. (b, a, 12 하면 12, a, b 순서로 나옴)   
   b) 그 배열의 요소를 키로 하는 객체를 만들어 준다.   
   c) 시도 횟수 만큼 for 문을 돈다.     
   d) 각 자동차가 랜덤함수를 돌려 4이상이 나오면 해당 자동차를 키로 하는 값에 +1   
   e) 한 횟수 시도할 때마다의 객체 값을 실행 결과를 따로 저장해둔다.    
   f) for 문이 끝나면 이제 객체에는 최종결과가 담겨있다. 이 최종결과로 우승자를 뽑는다.      
   g) 각 횟수별 결과 + 우승 결과를 result 에 저장해야지.
6. result 가 다 나왔으니까 return 부분에 이 result를 보여주면 되겠다.

    **---- 예외 처리 ----**
7. 자동차 이름 예외처리를 한다.    
  -> 일단, split(,)로 배열어 담아오고 각 요소를 검사한다.   
  -> 빈 값이 있는지, 공백이 있는지, 5자를 초과하는지
8. 시도할 횟수 예외처리를 한다.    
  -> 0이나 음수면 alert     
  -> 자동차 이름이 유효성 검사를 통과 못했으면 alert (아... 유효성 검사 통과 여부 저장하는 state 도 필요하겠네....)
9. 자동차 이름이 유효성 검사 통과했는지 여부 저장하는 state를 만든다. (isValid)
10. 자동차 이름 확인 버튼 클릭시 유효성 검사 통과한 경우만 경주 실행.


**🤔❓ 고민 거리**
1) 자동차 이름 state를 문자열로 넣어줘야 좋을까, 배열을 넣어줘야 좋을까? 
  input 값을 받아오는 state는 정제해서 넣는게 좋은가 아님 그냥 넣고 쓸 때 상황맞춰 정제? 
2) 나는 input 태그에 value 값을 꼭 넣어주는데, 다른 사람도 넣어주는지, 이게 꼭 필요한건지 다른 사람 코드 확인해보자.
3) 어떤 이벤트에서 어떤 처리를 해줘하는지 헷갈린다. 좀 기획 부분이긴 한데...     
   -> 입력할 때 잘못 입력시 바로 alert가 좋을까, 확인 버튼 누른 뒤 alert가 좋을까?
4) 처음에는 result를 개행문자를 넣은 문자열로 세팅해서 {result}로 한번에 보여주려 했다.     
   -> 하지만 개행문자가 html 에서는 출력되지 않았다. 한줄로만 나옴...      
   -> `<pre>{result}</pre>` 로 넣으면 줄바꿈은 되나, 폰트 느낌이 달라져서 기각      
   -> 그래서 result를 배열로 만들고 map을 돌려 각 문자열을 `<span>{item}<br/></span>` 으로 출력 함.     
   -> 더 좋은 방법은 없을까?      
   ==> 해결 : css 로 white-space : pre 를 주면 폰트가 달라지지 않고 개행문자가 적용된다!        
   ===> 이렇게 `<p style={{whiteSpace:"pre"}} >`(개행문자 & 연속공백 인식) or pre-line(개행문자만 인식, 연속공백은 하나로 인식)
5) result를 map으로 뿌려줄 때, 키에 인덱스 말고 달리 줄게 있나...?   
    ===> npm 의 nanoid, shortid 모듈 다운받아 사용. 유니크한 아이디값을 사용할 수 있다. 하지만 이 문제의 경우 매번 값이 바뀌니 어차피 결과 전체를 리랜더해야해서 idx로 넣어주었다.
    ```bash
    $ npm i shortid
    ```
    ```jsx
    import shortid from 'shortid';

    ...
    //적용
    shortid.generate();  
    //ex) o5I6xwNG6j
    ```
</div>
</details>

### ep2. 코드 리뷰, 제가 한번 적용해보겠습니다. 
<details>
<summary> 🚗 리액트 자동차 경주 게임 - 🍌 코드 리뷰</summary>
<div markdown="1">

1. handleCarsBtn 핸들러를 더 최적화 시키면 좋을 것 같다.   
   - 처음에 setIsValid(false) 로 하고 예외처리에서 걸리면 return 해버리고 걸리지 않으면 맨 마지막에 setIsValid(false) 해주면 코드를 더 줄일 수 있다.
   - 또한 alert 와 return 문은 합칠 수 있다. `return alert(...)` 이렇게.
   - 아니면 정규표현식을 써서 더 간략하게 예외처리 해줄 수 있지 않을까?
   - 💻 이전 코드
      ```jsx
      //car 종류 입력 확인 버튼 핸들러
      const handleCarsBtn = (e) => {
         e.preventDefault();
         const tmp = carsInput.split(',');
         setIsValid(true);
         for(let car of tmp) {
            if(car === '') {
               alert('빈 이름이 있습니다.');
               setIsValid(false);
               return;
            }else if(car.includes(' ')) {
               alert('공백을 포함할 수 없습니다.');
               setIsValid(false);
               return;
            }else if(car.length > 5) {
               alert('이름은 5자 이하만 가능합니다.');
               setIsValid(false);
               return;
            }
         }
      }
      ```
   - 💻 리뷰 반영 1
      ```jsx
      //car 종류 입력 확인 버튼 핸들러
      const handleCarsBtn = (e) => {
         e.preventDefault();
         const tmp = carsInput.split(',');
         setIsValid(false);
         for(let car of tmp) {
            if(car === '') {
               return alert('빈 이름이 있습니다.');
            }else if(car.includes(' ')) {
               return alert('공백을 포함할 수 없습니다.');
            }else if(car.length > 5) {
               return alert('이름은 5자 이하만 가능합니다.');
            }
         }
         setIsValid(true);
      }
      ``` 
   - 💻 리뷰 반영 2 : 정규 표현식 사용
      ```jsx
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
      ```

1. 중첩 for 문과 중첩 if 사용으로 가독성이 안 좋다.
   - 중첩이 많아지는 부분은 따로 함수로 빼도 될 것 같다.
   - 💻 이전 코드
      ```jsx
      const tryArr = [];
      let max = 0; //우승자를 뽑기위해 최댓값 구하기
      for(let i = 1; i <= tryNum; i++) {
         for(let car in carsObj) {
            const randomNumber = Random.pickNumberInRange(1, 9);
            if(randomNumber >= 4) {
               carsObj[car] += 1;
               if(max < carsObj[car]) {
                  max = carsObj[car];
               }
            }
         }
         tryArr.push(...createTryMsg(carsArr, carsObj));
         tryArr.push('\n');
      }
      ```
   - 💻 리뷰 반영
      ```jsx
      const tryArr = [];
      for(let i = 1; i <= tryNum; i++) {
         tryOneRace(carsObj);
         tryArr.push(...createTryMsg(carsArr, carsObj));
         tryArr.push('\n');
      }

      ...
      //최댓값 구하는 로직은 마지막 시도가 끝난 뒤 실행
      let max = Math.max(...Object.values(carsObj));
      ...

      //1회 경주 실행 함수
      const tryOneRace = (carsObj) => {
         for(let car in carsObj) {
            const randomNumber = Random.pickNumberInRange(1, 9);
            if(randomNumber >= 4) {
               carsObj[car] += 1;
            }
         }
      }
      ```

</div>
</details>
<details>
<summary> 🥫 리액트 자판기 구현 - 🍌 코드 리뷰</summary>
<div markdown="1">

1. props의 undefined 처리는 props를 구조분해 할당으로 가져오는 부분에서 기본값 처리를 해주면 된다.
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
1. `e.target.reset()` 을 사용하면 입력폼을 초기화 시킬 수 있다. 버튼 누른 후 값이 남아있지 않게 하기위해 사용하면 좋다.   
    => 입력값을 받아오는 이벤트 핸들러의 하단에 `e.target.reset()` 를 추가해주었다.

</div>
</details>


## Git Commit Message

| 태그이름    | 설명                                                  |
| ----------- | -----------------------------------------------------|
| feat     | 새로운 기능 추가                                      |
| fix      | 버그 수정                                             |
| design   | CSS 등 사용자 UI 수정                                 |
| style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| refactor | 코드 리팩토링                                         |
| comment  | 주석 추가 및 변경                                    |
| docs     | 문서 수정 (MD 파일)                                  | 
| chore    | 빌드 테스트, 패키지 매니저 설정                      |
| rename   | 파일 혹은 폴더명 수정하거나 옮기는 작업               |
| remove   | 파일을 삭제하는 작업만 하는 경우                     |
| change   | 문자만 변경한 경우                                  |


