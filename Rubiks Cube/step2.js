const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
class Cube {
    // constructor 안하면
    form = [
        [R, R, W],
        [G, C, W],
        [G, B, B],
    ];
}
function setReadline() {
    readline.setPrompt("> CUBE : ");
    readline.prompt();
    readline.on("line", function (line) {
        //q가 입력되면 대소문자 상관없이 종료
        if (String(line).toUpperCase === "Q") {
            readline.close();
        }
        //입력값을 받아서 처리
        sortInput(line);
        readline.close();
    });
    readline.on("close", function () {
        console.log("루빅스 큐브를 종료합니다.");
        process.exit();
    });
}
function sortInput(line) {
    //숫자나 스페이스 들어오면 예외처리 후 종료
    line = line.split("");
    const hasException = line.some((str) => /\d|\s/g.test(str));
    if (hasException) {
        console.log("Error! 알맞은 문자열을 입력하세요");
        readline.prompt();
    } else {
        //아니면 각 문자를 돌면서 다음 단계 함수 호출
        const command = String(line).split("");
        for (let i = 0; i < command.length; i++) {
            selectMove(command[i]);
            // console.log(command[i]);
        }
    }
}
function selectMove(command) {
    command = command.toUpperCase();
}

function pushRight(i) {
    //i는 form[0] 이거나 form[2] (큐브의 위, 아래줄))
    sequence.splice(0, 0, sequence.pop());
}
function pushleft(i) {
    sequence.push(sequence.shift());
}
function pushUp(i) {
    //i는 0이거나 2(큐브의 왼쪽, 오른쪽)
    [form[0][i], form[1][i], form[2][i]] = [form[1][i], form[2][i], form[0][i]];
}
function pushDown(i) {
    [form[0][i], form[1][i], form[2][i]] = [form[1][i], form[2][i], form[0][i]];
}

function paintResult() {
    console.log(command);
    console.log(form.map((line) => line.join("")).join("\n"));
}
// test box //
const cube = new Cube();
console.log(cube.form);
setReadline();
