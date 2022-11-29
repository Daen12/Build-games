const startMap = [
    "  #######",
    "###  O  ###",
    "#    o    #",
    "# Oo P oO #",
    "###  o  ###",
    " #   O  # ",
    " ########",
];
//제일 처음단계, 위 맵을 분석가능한 상태로 만든 후 출발.
const currentMap = startMap.map((line) => {
    return line.split("");
});
//방향키가 입력되면 이를 하나씩 읽고 함수 수행
const command = "ddd";
for (let i = 0; i < command.length; i++) {
    paintMap(command[i]);
}
function currentPosition(map) {
    const n = map.findIndex((line) => line.includes("P"));
    const m = map[n].findIndex((str) => str.includes("P"));
    return [n, m];
}
// console.log(splittedMap[0][2]);
// console.log(currentPosition(currentMap));

//오른쪽 한칸 이동
function paintD(map) {
    let x = currentPosition(map)[0]; //3
    let y = currentPosition(map)[1];
    console.log(x, y);
    if (map[x][y + 1] === " ") {
        // const nextMap = startMap;
        map[x][y] = " ";
        map[x][y + 1] = "P";
        y++; //6
        console.log(map.map((line) => line.join("")));
        console.log("D : 오른쪽으로 이동합니다.");
        // return map;
    } else {
        return endGame("D");
    }
}
function endGame(i) {
    console.log(currentMap.map((line) => line.join("")));
    console.log(`${i} : (경고!) 해당 명령을 수행할 수 없습니다!`);
}
function paintMap(i) {
    if (i === "w") {
        return paintD(currentMap);
    }
    if (i === "a") {
        return paintD(currentMap);
    }
    if (i === "s") {
        return paintD(currentMap);
    }
    if (i === "d") {
        return paintD(currentMap);
        // console.log("D : 오른쪽으로 이동합니다.");
    }
}

// mapSneakPeek = paintD(splittedMap).map((line) => line.join(""));
// console.log(mapSneakPeek);
