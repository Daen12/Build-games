# 숫자야구게임

[링크 테스트](index.js)


## 게임의 시작과 끝

### 1. 입력값 받기
```javascript
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt(`숫자를 입력하세요 :`);
rl.prompt();
rl.on("line", function (line) {
    const input = parseInt(line);
    // console.log(createAnswer());
    printResult(input); //여기를 fixed answer변수를 쓸 수 있게 만들어보기!!!!!
    if (finalStrike(input) === "3 스트라이크") {
        rl.close();
    }
    rl.prompt();
});
```
- 입력 된 값을 input 변수에 할당한다.
- printResult 함수에 input변수를 대입하여 결과를 도출한다.
- 3 스트라이크가 나오면 readline모듈에서 close이벤트가 호출되도록 한다.
- 3 스트라이크가 나오지 않으면 동일한 프롬프트가 호출되도록 한다.

### 2. 프로세스 종료하기
```javascript
rl.on("close", function () {
    console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    process.exit();
});
```
- close 이벤트가 호출되면, 정답메세지를 띄운 후
- process.exit() 을 통해 게임을 종료한다.


## 컴퓨터의 랜덤 넘버 생성

### 1. createAnswer()
```javascript
function createAnswer() {
    let answer = Math.floor(Math.random() * 889 + 111);
    while (
        String(answer).includes("0") ||
        !(
            String(answer)[0] !== String(answer)[1] &&
            String(answer)[1] !== String(answer)[2] &&
            String(answer)[0] !== String(answer)[2]
        )
    ) {
        answer = Math.floor(Math.random() * 889 + 111);
    }
    return answer;
}
const answer = createAnswer();
```
- 세자리 정수 중 하나를 뽑는다고 가정하고, 뽑을 수 있는 가장 작은 숫자 111부터 999까지 생성하여 answer 변수에 할당한다.
- 예외처리1. 뽑은 숫자에 0이 들어있을 때
- 예외처리2. 뽑은 숫자에 중복되는 수가 있을때
- 위 상황인 경우 항상 answer변수에 새로 세 자리 숫자가 생성되어 할당되도록 한다.


## 플레이어 인풋 시 예외처리

### 1. overlap() : 숫자 3개 중 중복숫자가 있는 경우
```javascript
function overlap(input) {
    const stringInput = String(input);
    return stringInput[0] !== stringInput[1] &&
        stringInput[1] !== stringInput[2] &&
        stringInput[0] !== stringInput[2]
        ? false
        : true;
}
```
- 숫자를 문자열로 치환한 후 각 인덱스의 숫자가 동일한지 비교하기
- 중복되면 true, 중복이 아니면 false를 반환

### 2. isThreeDigits() : 숫자가 3개가 아닌 경우
```javascript
function isThreeDigits(input) {
    return String(input).length === 3 ? true : false;
}
```
- 입력받은 숫자의 길이가 3이 아닌 경우 false, 맞으면 true 반환하기

### 3. hasZero() : 입력받은 숫자 중 0이 있는 경우
```javascript
function hasZero(input) {
    return String(input).includes("0") ? true : false;
}
```
- 입력받은 숫자에 0이 포함된 경우 true, 아니면 false 반환하기

## 볼, 스트라이크 판별하기

### 1. ball(input) : 정답과 플레이어의 입력 숫자를 비교하여 **동일한 숫자**의 개수를 **모두 반환**
```javascript
function ball(input) {
    let countBall = 0;
    for (let i = 0; i < String(input).length; i++) {
        if (String(answer).includes(String(input)[i])) {
            countBall++;
        }
    }
    return countBall;
}
```
- 입력값 자체에 동일한 숫자가 몇개 있는지 확인한다.
- 동일한 값이 있을 때 마다 countBall 변수에 1을 더한다.
- countBall을 반환한다.

### 2. strike(input) : 정답과 플레이어의 입력 숫자를 비교하여 **동일한 자리에 동일한 숫자가 있는** 경우의 개수를 모두 반환
```javascript
function strike(input) {
    let countStrike = 0;
    for (let i = 0; i < String(input).length; i++) {
        if (String(input)[i] === String(answer)[i]) {
            countStrike++;
        }
    }
    return countStrike;
}
```
- for 루프를 이용하여 입력값과 정답의 동일한 인덱스 중 일치하는 숫자가 있으면 
- countStrike 변수에 1을 더한 후
- countStrike를 반환한다.

### 3. finalBall(input) : 
