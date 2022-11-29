const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const startMap = fs
    .readFileSync("./소코반게임/map.txt")
    .toString()
    .split("\n")
    .slice(6);
// 처음 시작할 때는 2단계 맵을 보여주기
console.log("Stage 2" + "\n" + "\n" + startMap.join("\n") + "\n");
// 반복되는 프롬프트 설정
rl.setPrompt("> Sokoban Start : ");
rl.prompt();
rl.on("line", function (line) {
    const command = String(line);
    if (command === "q") {
        rl.close();
    }
    for (let i = 0; i < command.length; i++) {
        paintMap(command[i]);
    }
    rl.prompt();
    // rl.close();
});
rl.on("close", function () {
    console.log("************" + "\n" + "* Game End *" + "\n" + "************");
    process.exit();
});
//제일 처음 단계, 위 맵을 분석가능한 상태로 만든 후 출발.
const currentMap = startMap.map((line) => {
    return line.split("");
});
//현재 P의 위치를 파악하기 위한 함수
function currentPosition(map) {
    const n = map.findIndex((line) => line.includes("P"));
    const m = map[n].findIndex((str) => str.includes("P"));
    return [n, m];
}
//프롬프트에서 입력값을 읽은 후 호출되는 함수
function paintMap(i) {
    if (i === "w") {
        return paintW(currentMap);
    }
    if (i === "a") {
        return paintA(currentMap);
    }
    if (i === "s") {
        return paintS(currentMap);
    }
    if (i === "d") {
        return paintD(currentMap);
    }
}
//======== P의 위치 이동시키는 함수세트 ============//
//오른쪽 한칸 이동
function paintD(map) {
    let x = currentPosition(map)[0]; //3
    let y = currentPosition(map)[1];
    console.log(x, y);
    if (map[x][y + 1] === " ") {
        map[x][y] = " ";
        map[x][y + 1] = "P";
        y++; //6
        console.log("\n" + map.map((line) => line.join("")).join("\n"));
        console.log("\n" + "D : 오른쪽으로 이동합니다.");
    } else {
        return endGame("D");
    }
}
//왼쪽으로 한 칸 이동
function paintA(map) {
    let x = currentPosition(map)[0];
    let y = currentPosition(map)[1];
    console.log(x, y); //이전 맵의 좌표가 콘솔로그 찍힘.
    if (map[x][y - 1] === " ") {
        map[x][y] = " ";
        map[x][y - 1] = "P";
        y--;
        console.log("\n" + map.map((line) => line.join("")).join("\n"));
        console.log("\n" + "A : 왼쪽으로 이동합니다.");
    } else {
        return endGame("A");
    }
}
//위쪽으로 한 칸 이동
function paintW(map) {
    let x = currentPosition(map)[0];
    let y = currentPosition(map)[1];
    console.log(x, y);
    if (map[x - 1][y] === " ") {
        map[x][y] = " ";
        map[x - 1][y] = "P";
        x--;
        console.log("\n" + map.map((line) => line.join("")).join("\n"));
        console.log("\n" + "W : 위로 이동합니다.");
    } else {
        return endGame("W");
    }
}
function paintS(map) {
    let x = currentPosition(map)[0];
    let y = currentPosition(map)[1];
    console.log(x, y);
    if (map[x + 1][y] === " ") {
        map[x][y] = " ";
        map[x + 1][y] = "P";
        x++;
        console.log("\n" + map.map((line) => line.join("")).join("\n"));
        console.log("\n" + "S : 아래로 이동합니다.");
    } else {
        return endGame("S");
    }
}
//paint시 장애물에 막히면 호출되는 함수.
function endGame(i) {
    console.log(currentMap.map((line) => line.join("")).join("\n") + "\n");
    console.log(`${i} : (경고!) 해당 명령을 수행할 수 없습니다!`);
}
