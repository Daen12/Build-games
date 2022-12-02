const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
const cube = [
    ["R", "R", "W"],
    ["G", "C", "W"],
    ["G", "B", "B"],
];
function gameStart() {
    const firstDisplay = cube.map((line) => line.join(" ")).join("\n");
    console.log(firstDisplay);
    readline.setPrompt("> CUBE : ");
    readline.prompt();
    readline.on("line", function (line) {
        sortInput(line);
    });
    readline.on("close", function () {
        console.log("Bye~");
        process.exit();
    });
}
function sortInput(line) {
    const command = String(line).split("");
    for (let i = 0; i < command.length; i++) {
        selectMove(command[i]);
    }
}
function selectMove(command) {
    command = command.toUpperCase();
    // 얘네 키값이 따옴표가 불규칙함.
    const func = {
        U: () => {
            pushLeft(cube[0]);
        },
        "U'": () => {
            pushRight(cube[0]);
        },
        R: () => {
            pushUp(2);
        },
        "R'": () => {
            pushDown(2);
        },
        L: () => {
            pushDown(0);
        },
        "L'": () => {
            pushUp(0);
        },
        B: () => {
            pushRight(cube[2]);
        },
        "B'": () => {
            pushLeft(cube[2]);
        },
        Q: () => {
            readline.close();
        },
    };
    //예외처리는 여기서 하는게 나을듯
    if (command in func) {
        async function getResult() {
            func[command]();
            paintResult(command);
        }
        getResult().then(() => readline.prompt());
    } else {
        console.log("알맞은 명령어가 아닙니다.");
        readline.close();
    }
}

function pushRight(arr) {
    //i는 form[0] 이거나 form[2] (큐브의 위, 아래줄))
    arr.splice(0, 0, arr.pop());
}
function pushLeft(arr) {
    arr.push(arr.shift());
}
function pushUp(i) {
    //i는 0이거나 2(큐브의 왼쪽, 오른쪽)
    [cube[0][i], cube[1][i], cube[2][i]] = [cube[1][i], cube[2][i], cube[0][i]];
}
function pushDown(i) {
    [cube[0][i], cube[1][i], cube[2][i]] = [cube[1][i], cube[2][i], cube[0][i]];
}
function paintResult(command) {
    const wholeCube = cube.map((line) => line.join(" ")).join("\n");
    console.log(command + "\n" + wholeCube + "\n");
}
// test line //
gameStart();
