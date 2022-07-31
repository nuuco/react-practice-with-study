## 🙌 기능 요구사항

- [x] 주어진 횟수 동안 n 대의 자동차는 전진 또는 멈출 수 있다.
- [x] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [x] 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- [x] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- [x] 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- [x] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- [x] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
- [x] 사용자가 잘못된 입력 값을 작성한 경우 alert을 이용해 메시지를 보여주고, 다시 입력할 수 있게 한다.

## ❗️ Ex) 

<p align="center">
<img src="https://github.com/usageness/javascript-racingcar-precourse/raw/main/images/result.jpg">
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

## 🧩 생각 순서 
**처음에는 그냥 사용자가 다 규칙에 맞춰서 제대로 입력했을 때만 생각하자!**
1. 우선 필요한 state 를 파악한다.
2. 기본적으로 input 창이 두 개니까 각가 state 로 필요하겠지? 그리고 실행결과를 보여주는 state 도 필요.
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


## 🤔❓ 고민 거리
1) 자동차 이름 state를 문자열로 넣어줘야하 좋을까, 배열을 넣어줘야 좋을까? 
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
   ===> 이렇게 `<p style={{whiteSpace:"pre"}} >`
5) result를 map으로 뿌려줄 때, 키에 인덱스 말고 달리 줄게 있나...?   
    ===> npm 의 nanoid, shortid 모듈 다운받아 사용. 유니크한 아이디값을 사용할 수 있다. 하지만 이 문제의 경우 매번 값이 바뀌니 키값에 의미 없지 않나...?
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
    

