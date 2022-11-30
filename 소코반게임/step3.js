// - 0 상태의 o를 밀어내면 다시 o와 O로 분리된다.
// - 플레이어가 움직일 때마다 턴수를 카운트한다. -> 각 알파벳을 시행 중 '움직인' 것만 카운트
// - 모든 o를 O자리에 이동시키면 클리어 화면을 표시하고 다음 스테이지로 표시한다.
// - 주어진 모든 스테이지를 클리어시 축하메시지를 출력하고 게임을 종료한다.
// - 기타 필요한 로직은은 실제 게임을 참고해서 완성한다.

//플레이어가 만날 수 있는 모든 것 :
// 1. 빈 공간 : move
// 2. 벽 : stop
// 3. 구멍 : move
// 4. 공(박스) : 박스가 두개이거나||박스 뒤에 벽이 있으면 -> stop
//             박스 뒤에 공백이거나 || 박스 뒤에 구멍이 있으면 -> move(후자는 구멍자리를 0으로 바꾸기)

// on close() 종료조건 ; 주어진 스테이지를 클리어한다 = 공(o)이 없다.

//Prompt 부분 : 알파벳을 몇개 쓰든 상관없이,
//라인 들어올때마다 맵 바꾸어 출력.
//o이 남아있으면 'Keep trying!'
//없으면 종료조건 만족하므로 '빠밤! stage1 클리어!'
//q 입력해도 종료시키기

const fs = require("fs");
const stageMap = fs
    .readFileSync("./소코반게임/map.txt")
    .toString()
    .split("\n")
    .slice(1, 7);
// console.log(stageMap);

// input에 따른 출력 하기
function inputTest() {
    const input = "aass";
    for (let i = 0; i < input.length; i++) {
        moveCommand(input[i], currentMap);
    }
    console.log(currentMap);
    console.log(turn);
}
inputTest();
const currentMap = stageMap.map((line) => {
    return line.split("");
});

// console.log(currentMap);

//현재 p의 위치 파악하기 위한 함수
function currentPosition(map) {
    const n = map.findIndex((line) => line.includes("P"));
    const m = map[n].findIndex((str) => str.includes("P"));
    return [n, m];
}
// console.log(currentPosition(currentMap));
let turn = 0;
function moveCheck(currentMap, i) {
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
    const newX = x + movescale[i][0];
    const newY = y + movescale[i][1];
    // console.log(newX, newY);
    if (currentMap[newX][newY] === " " || currentMap[newX][newY] === "O") {
        currentMap[x][y] = " ";
        currentMap[newX][newY] = "P";
    }
    if (currentMap[newX][newY] === "#" || currentMap[newX][newY] === "0") {
        turn--;
        return; //return 해도 움직임...
    }
    if (currentMap[newX][newY] === "o") {
        const furtherX = newX + movescale[i][0];
        const furtherY = newY + movescale[i][1];
        if (
            currentMap[furtherX][furtherY] === "o" ||
            currentMap[furtherX][furtherY] === "#"
        ) {
            turn--;
            return;
        }
        if (currentMap[furtherX][furtherY] === " ") {
            currentMap[x][y] = " ";
            currentMap[newX][newY] = "P";
            currentMap[furtherX][furtherY] = "o";
        } else {
            currentMap[x][y] = " ";
            currentMap[newX][newY] = "P";
            currentMap[furtherX][furtherY] = "0";
        }
    }
    // return currentMap;
}
// moveCheck(currentMap, 1);
// moveCheck(currentMap, 1);
// moveCheck(currentMap, 2);
// moveCheck(currentMap, 2);
// moveCheck(currentMap, 2);

function moveCommand(i, currentMap) {
    [w, a, s, d] = [0, 1, 2, 3]; //위, 왼쪽, 아래, 오른쪽
    if (i === "w") {
        console.log(moveCheck(currentMap, w));
        // console.log(turn)
    } else if (i === "a") {
        console.log(moveCheck(currentMap, w));
    } else if (i === "s") {
        console.log(moveCheck(currentMap, s));
    } else if (i === "d") {
        console.log(moveCheck(currentMap, w));
    } else {
        console.log(" *** !Invalid Input! *** ");
    }
}
