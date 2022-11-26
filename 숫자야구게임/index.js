const input = 617;
const answer = 723;
// const answer = Math.floor(Math.random() * 889 + 111);
// console.log("answer :" + answer);
//***예외처리***//
function overlap(input) {
    const stringInput = String(input);
    return stringInput[0] !== stringInput[1] &&
        stringInput[1] !== stringInput[2]
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
    if (finalStrike(input) === "3 스트라이크") {
        console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    }
    // return `${hint(input)}\n${guidemsg}`;
}
printResult(input);
