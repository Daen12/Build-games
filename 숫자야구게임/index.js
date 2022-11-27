//readline모듈의 rl객체는 이벤트 드리븐 방식으로 동작한다.
//line은 한 줄이 입력되는 이벤트이고, close는 close()함수를 호출 시 발생하는 이벤트이다.
//가장 기본이 되는 이벤트는 위 두개.

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
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
// createAnswer()
// console.log(answer);
//밖에서 랜덤넘버를 만든다음 모듈 안에서 이를 호출하여 이벤트 시행 시 실행되게 함.
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
rl.on("close", function () {
    console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    process.exit();
});
// function master(input, fixedAnswer) {
//     fixedAnswer = fixedAnswer;
//     printResult(input);
// }

//***예외처리***//
function overlap(input) {
    const stringInput = String(input);
    return stringInput[0] !== stringInput[1] &&
        stringInput[1] !== stringInput[2] &&
        stringInput[0] !== stringInput[2]
        ? false
        : true;
}
function isThreeDigits(input) {
    return String(input).length === 3 ? true : false;
}
function hasZero(input) {
    return String(input).includes("0") ? true : false;
}
function ball(input) {
    //먼저, 가장 큰 범위에서
    //input자체에 answer의 숫자가 몇개나 들어있는지 확인한다.
    //includes이용하여 확인 후 출력한다.
    let countBall = 0;
    for (let i = 0; i < String(input).length; i++) {
        if (String(answer).includes(String(input)[i])) {
            countBall++;
        }
    }
    return countBall;
}
function strike(input) {
    //input을 문자열로 바꾼 후, 각 문자에 대해 answer의 각 문자와 비교한다.
    //일치하면 그 수만큼 count를 업데이트 해준다.
    let countStrike = 0;
    for (let i = 0; i < String(input).length; i++) {
        if (String(input)[i] === String(answer)[i]) {
            countStrike++;
        }
    }
    return countStrike;
}

function finalBall(input) {
    const hasBall = ball(input) - strike(input);
    if (hasBall) {
        return `${hasBall}볼`;
    } else {
        return "";
    }
}
function finalStrike(input) {
    if (strike(input)) {
        return `${strike(input)} 스트라이크`;
    } else {
        return "";
    }
}

//===[조건 확인]===
//입력받은 수에 overlap이 없으면서
//isThreeDigit = true 이면서 (입력받은 숫자가 3개) 이면 그 다음 단계로 넘어간다. 아니면 "invalid input" 호출
//===[다음 단계]===
//ball에서 리턴받은 숫자 - strike에서 리턴받은 숫자 = 볼
//strike에서 리턴받은 숫자 = 스트라이크
//만약 위 두개가 없다면 = 낫싱

function hint(input) {
    if (overlap(input) || !isThreeDigits(input) || hasZero(input)) {
        return "*** Invalid input ***";
    } else if (!ball(input)) {
        return "낫싱";
    } else {
        return `${finalStrike(input)} ${finalBall(input)}`; //요부분 스트라이크 없으면 볼이 한칸 띄어짐.
    }
}
function printResult(input) {
    console.log(hint(input));
    console.log(answer);
    // if (finalStrike(input) === "3 스트라이크") {
    //     console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    // }
    // return `${hint(input)}\n${guidemsg}`;
}

// printResult(this.input);
