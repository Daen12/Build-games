// - 0 상태의 o를 밀어내면 다시 o와 O로 분리된다.
// - 모든 o를 O자리에 이동시키면 클리어 화면을 표시하고 다음 스테이지로 표시한다.
// - 주어진 모든 스테이지를 클리어시 축하메시지를 출력하고 게임을 종료한다.

//플레이어가 만날 수 있는 모든 것 :
// 1. 빈 공간 : move
// 2. 벽 : stop
// 3. 구멍 : move
// 4. 공(박스) : 박스가 두개이거나||박스 뒤에 벽이 있으면 -> stop
//             박스 뒤에 공백이거나 || 박스 뒤에 구멍이 있으면 -> move(후자는 구멍자리를 0으로 바꾸기)
// 5. "0"(박스+구멍 합쳐진것) : 0 뒤에 벽이 있으면 -> stop
//                         0 뒤랑 그 뒤에 아무것도 없으면 -> 다시 o + O 분리

// on close() 종료조건 ; 주어진 스테이지를 클리어한다 = 공(o)이 없다.

//Prompt 부분 : 알파벳을 몇개 쓰든 상관없이,
//라인 들어올때마다 맵 바꾸어 출력.
//o이 남아있으면 'Keep trying!'
//없으면 종료조건 만족하므로 '빠밤! stage1 클리어!'
//q 입력해도 종료시키기
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const stageMap = fs
    .readFileSync("./소코반게임/map.txt")
    .toString()
    .split("\n")
    .slice(1, 7);
console.log(stageMap);
const currentMap = stageMap.map((line) => {
    return line.split("");
});
// console.log(currentMap);

// input에 따른 출력 하기
console.log(" 소코반의 세계에 오신 것을 환영합니다! " + "\n");
console.log("Stage 1" + "\n" + stageMap.join("\n") + "\n");
rl.prompt();
rl.setPrompt("> Sokoban : ");

rl.on("line", function (line) {
    const command = String(line).toLowerCase();
    if (command === "q") {
        rl.close();
    }
    async function inputTest() {
        // command = command.toLowerCase();
        for (let i = 0; i < command.length; i++) {
            moveCommand(command[i]);
        }
        return currentMap;
    }
    inputTest()
        .then((map) => {
            // console.log(map);
            console.log(`\n${map.map((line) => line.join("")).join("\n")}

턴수 : ${turn}`);
            turn = 0;
            return map;
        })
        .then((map) => {
            if (!hasBox(map)) rl.close();
            // map에 박스가 없으면 종료하기.
            else {
                console.log("~~Keep Trying~~");
                rl.prompt();
            }
        });

    //o이 없을 때 종료조건생성
});
rl.on("close", function () {
    console.log("************" + "\n" + "* Next Stg *" + "\n" + "************");
    process.exit();
});
//남은 box가 있는지 (종료 조건) 확인하기 위한 함수
function hasBox(map) {
    return map.filter((line) => line.includes("o")).length !== 0;
}
//현재 p의 위치 파악하기 위한 함수
function currentPosition(map) {
    const n = map.findIndex((line) => line.includes("P"));
    const m = map[n].findIndex((str) => str.includes("P"));
    return [n, m];
}
// console.log(currentPosition(currentMap));
let turn = 0;
function moveCheck(i) {
    turn++;
    [x, y] = currentPosition(currentMap);
    console.log(x, y);
    const movescale = [
        //위, 왼쪽, 아래, 오른쪽 = [0,1,2,3]
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
    ];
    const nextX1 = x + movescale[i][0];
    const nextY1 = y + movescale[i][1];
    const nextX2 = nextX1 + movescale[i][0];
    const nextY2 = nextY1 + movescale[i][1];
    const nextX3 = nextX2 + movescale[i][0];
    const nextY3 = nextY2 + movescale[i][1];
    if (
        currentMap[nextX1][nextY1] === " " ||
        currentMap[nextX1][nextY1] === "O"
    ) {
        currentMap[x][y] = " ";
        currentMap[nextX1][nextY1] = "P";
    }
    if (
        currentMap[nextX1][nextY1] === "#" ||
        currentMap[nextX1][nextY1] === "0"
    ) {
        turn--;
        return; //return 해도 움직임 => 이거 어케 고쳤는지 기억 안남..적어놓기ㅠn
    }
    if (currentMap[nextX1][nextY1] === "o") {
        if (
            currentMap[nextX2][nextY2] === "o" ||
            currentMap[nextX2][nextY2] === "#"
        ) {
            turn--;
            return;
        }
        if (currentMap[nextX2][nextY2] === " ") {
            currentMap[x][y] = " ";
            currentMap[nextX1][nextY1] = "P";
            currentMap[nextX2][nextY2] = "o";
        } else {
            currentMap[x][y] = " ";
            currentMap[nextX1][nextY1] = "P";
            currentMap[nextX2][nextY2] = "0";
        }
    }
    if (currentMap[nextX1][nextY1] === "0") {
        if (currentMap[nextX2][nextY2] === "#") {
            turn--;
            return;
        } else if (currentMap[nextX2][nextY2] === " ") {
            currentMap[x][y] = " ";
            currentMap[nextX1][nextY1] = "P";
            currentMap[nextX2][nextY2] = "O";
            currentMap[nextX3][nextY3] = "o";
        }
    }
}
// moveCheck(currentMap, 1);
// moveCheck(currentMap, 1);
// moveCheck(currentMap, 2);
// // moveCheck(currentMap, 2);
// // moveCheck(currentMap, 2);
// console.log(currentMap);

function moveCommand(i) {
    [w, a, s, d] = [0, 1, 2, 3]; //위, 왼쪽, 아래, 오른쪽
    if (i === "w") {
        moveCheck(w);
        // console.log(turn)
    } else if (i === "a") {
        moveCheck(a);
    } else if (i === "s") {
        moveCheck(s);
    } else if (i === "d") {
        moveCheck(d);
    } else if (i !== "q") {
        console.log(" *** !Invalid Input! *** ");
    }
}
