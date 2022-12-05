//   U
// L F R B
//   D
// > U  Up side을 시계방향으로 90도 회전 (o)
// > F  Front side을 시계방향으로 90도 회전
// > L  Left side을 시계방향으로 90도 회전
// > R  Right side을 시계방향으로 90도 회전
// > B  Back side을 시계방향으로 90도 회전
// > D  Down side을 시계방향으로 90도 회전 (o)
// > M  다시 섞기
// > Q  프로그램을 종료한다.
// 문자에 ' 를 붙이면 반시계으로 90도 회전, 숫자 2 를 붙이면 2번 회전(180도) 합니다!
// 명령을 실행하면 각 '면'단위로 실행되어야 함. 따라서 3*3의 인덱스로 6개의 면 구성하기.
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
//전역으로 쓰지 않으려면.. 클래스로 만들어야???
const startTime = new Date().getTime() / 1000;

function gameStart() {
    spreadCube();
    readline.setPrompt("> CUBE : ");
    readline.prompt();
    readline.on("line", function (line) {
        if (String(line) === "Q") {
            readline.close();
        }
        console.log(line);
    });
    readline.on("close", function () {
        measureTime();
        console.log("이용해주셔서 감사합니다. 뚜뚜뚜.");
        process.exit();
    });
}
function measureTime() {
    const endTime = new Date().getTime() / 1000;
    const timeInSeconds = Math.round(endTime - startTime);
    const minute = String(parseInt(timeInSeconds / 60));
    const second = String(timeInSeconds % 60);
    console.log(
        `경과시간: ${minute.padStart(2, "0")}:${second.padStart(2, "0")}`
    );
}
function makeCubeFace(i, num) {
    const cubeLine = new Array(num).fill(i); // [B, B, B]
    const cubeFace = [cubeLine, cubeLine, cubeLine];
    return cubeFace;
}
// console.log(makeCubeFace("B"));
function spreadCube() {
    const B = makeCubeFace("B", 3);
    const W = makeCubeFace("W", 3);
    const O = makeCubeFace("O", 3);
    const G = makeCubeFace("G", 3);
    const Y = makeCubeFace("Y", 3);
    const R = makeCubeFace("R", 3);
    // const space = mergeFace(makeCubeFace("S", 9));
    console.log(
        mergeFace(B) +
            "\n" +
            "\n" +
            mergeFace(W) +
            "\n" +
            "\n" +
            mergeFace(O) +
            "\n" +
            "\n" +
            mergeFace(G) +
            "\n" +
            "\n" +
            mergeFace(Y) +
            "\n" +
            "\n" +
            mergeFace(R) +
            "\n"
    );
}
function mergeFace(array) {
    const merged = array.map((line) => line.join(" ")).join("\n");
    return merged;
}
gameStart();

console.log(B);
