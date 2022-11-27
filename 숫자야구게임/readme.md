# 숫자야구게임

[링크 테스트](index.js)


## 게임 시작 & 끝

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
    printResult(input);
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


## 컴퓨터의 정답 생성

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

### 3. finalBall(input) : 최종 볼을 계산
```javascript
function finalBall(input) {
    const hasBall = ball(input) - strike(input);
    if (hasBall) {
        return `${hasBall}볼`;
    } else {
        return "";
    }
}
```
- hasBall 변수에 실제 볼이 있는지(ball() - strike())를 계산하여 할당한다.
- 만약 볼이 있으면 볼의 개수를 문자열로 반환하고 ("0볼")
- 없으면 빈 문자열을 리턴한다.

### 4. finalStrike(input) : 최종 스트라이크를 계산
```javascript

```
- 스트라이크가 존재할 시
- 스트라이크 개수를 문자열로 반환한다. ("0 스트라이크")


## 정답과 비교한 최종 결과 출력

### 1. hint(input) : 예외처리, 낫싱, 결과 계산
```javascript

function hint(input) {
    if (overlap(input) || !isThreeDigits(input) || hasZero(input)) {
        return "*** Invalid input ***";
    } else if (!ball(input)) {
        return "낫싱";
    } else {
        return `${finalStrike(input)} ${finalBall(input)}`;
    }
}
```
- 입력받은 수에 중복숫자가 있거나/ 숫자가 3개이거나/ 0이 포함된 경우 "*** invalid input***"을 반환한다.
- 위 경우가 아니면서 볼이 아니면 "낫싱"을 반환한다.
- 위 경우가 아니면 스트라이크, 볼의 순서대로 반환한다.


## 보완해야 할 것
- 힌트 출력 시 스트라이크 -> 볼의 순서로 출력되어 스트라이크가 없는 경우 볼이 한칸 띄어져서 출력됨.
- createAnswer() 10줄 넘음... 13줄...
- createAnswer() 시 매번 다른 랜덤넘버 생성됨
- 

