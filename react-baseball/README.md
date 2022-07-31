## 🙌 기능 요구사항

- [x] 기본적으로 1부터 9까지 서로 다른 수로 이루어진 3자리의 수를 맞추는 게임이다.
- [x] 같은 수가 같은 자리에 있으면 스트라이크, 다른 자리에 있으면 볼, 같은 수가 전혀 없으면 낫싱이란 힌트를 얻고, 그 힌트를 이용해서 먼저 상대방(컴퓨터)의 수를 맞추면 승리한다.
- [x] 위 숫자 야구게임에서 상대방의 역할을 컴퓨터가 한다. 컴퓨터는 1에서 9까지 서로 다른 임의의 수 3개를 선택한다. 게임 플레이어는 컴퓨터가 생각하고 있는 3개의 숫자를 입력하고, 컴퓨터는 입력한 숫자에 대한 결과를 출력한다.
- [x] 이 같은 과정을 반복해 컴퓨터가 선택한 3개의 숫자를 모두 맞히면 게임이 종료되고, 재시작 버튼이 노출된다.
- [x] 게임이 종료된 후 재시작 버튼을 클릭해 게임을 다시 시작할 수 있다.
- [x] 사용자가 잘못된 값을 입력한 경우 alert으로 에러 메시지를 보여주고, 다시 입력할 수 있게 한다.

## ❗️ Ex) 
- 상대방(컴퓨터)의 수가 425일 때
- 123을 제시한 경우 : 1스트라이크
- 456을 제시한 경우 : 1볼 1스트라이크
- 789를 제시한 경우 : 낫싱

<p align="center">
<img src="https://raw.githubusercontent.com/woowacourse/javascript-baseball-precourse/main/images/baseball_demo.gif">
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