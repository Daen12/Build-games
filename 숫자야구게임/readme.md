# 숫자야구게임

[링크 테스트](index.js)


# 1. 게임 시작(입력), 게임 끝(출력)

## 입력값 받기
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

## 프로세스 종료하기
```javascript
rl.on("close", function () {
    console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    process.exit();
});
```
- close 이벤트가 호출되면, 정답메세지를 띄운 후
- process.exit() 을 통해 게임을 종료한다.


# 2. 컴퓨터의 랜덤 넘버 생성

## createAnswer()
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
> 예외처리1. 뽑은 숫자에 0이 들어있을 때
> 예외처리2. 뽑은 숫자에 중복되는 수가 있을때
- 위 상황인 경우 항상 answer변수에 새로 랜덤함수를 통해 세자리 숫자가 생성되도록 한다.

