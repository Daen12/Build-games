const fs = require("fs");
let input = fs.readFileSync("./소코반게임/map.txt").toString().split("\n");
//++수정할 부분//
// 1. converter랑 reverter 같이 쓸수있게 호환성 높이기?
//텍스트파일의 입력값들을 한 줄씩 읽으면서 for루프 통해 변환기로 변환, stage부분은 filter사용하여 제외시키기, 이후 리턴

function converter() {
    const array = [];
    for (let i = 0; i < input.length; i++) {
        let mapped = [...input[i]].map((item) => {
            return converterReference(item);
        });
        if (mapped[0] !== "S") array.push(mapped);
    }
    return array;
}
function converterReference(i) {
    if (i === "#") {
        return 0;
    } else if (i === "O") {
        return 1;
    } else if (i === "o") {
        return 2;
    } else if (i === "P") {
        return 3;
    } else if (i === "=") {
        return 4;
    } else {
        return i;
    }
}

function reverterReference(i) {
    if (i === 0) {
        return "#";
    } else if (i === 1) {
        return "O";
    } else if (i === 2) {
        return "o";
    } else if (i === 3) {
        return "P";
    } else if (i === 4) {
        //
        return "*";
    } else {
        return i;
    }
}

function reverter() {
    const converted = converter();
    const array = [];
    for (let i = 0; i < converted.length; i++) {
        let mapped = [...converted[i]].map((item) => {
            return reverterReference(item);
        });
        array.push(mapped.join(""));
    }
    return array.join("\n").split("*****");
}

function finalMaps() {
    mapArray = [];
    for (let i = 0; i < reverter().length; i++) {
        mapArray.push(reverter()[i].split("\n"));
    }
    for (let i = 0; i < mapArray.length; i++) {
        if (i === 0) {
            mapArray[0] = mapArray[0].slice(0, -1);
        } else {
            mapArray[i] = mapArray[i].slice(1);
        }
    }
    return mapArray;
}
function printinfo(i) {
    const width = Math.max(...finalMaps()[i].map((line) => line.length));
    const height = finalMaps()[i].length;
    const holes = finalMaps()
        [i].map((line) => [...line].filter((str) => str === "o").length)
        .reduce((a, b) => a + b, 0);
    const balls = finalMaps()
        [i].map((line) => [...line].filter((str) => str === "O").length)
        .reduce((a, b) => a + b, 0);
    const positionY = finalMaps()[i].findIndex((line) => line.includes("P"));
    const positionX = [...finalMaps()[i][positionY]].findIndex(
        (str) => str === "P"
    );

    return `가로크기 : ${width}
세로크기 : ${height}
구멍의 수 : ${holes}
공의 수 : ${balls}
플레이어 위치 (${positionY + 1}, ${positionX + 1})`;
}
function paintResult() {
    //for문으로 감싸기, 각 i마다 결과 페인팅하도록 루프 돌리기
    for (i = 0; i < finalMaps().length; i++) {
        console.log(`Stage ${i + 1}\n`);
        // console.log(reverter()[i].join("") + "\n");
        console.log(finalMaps()[i].join("\n") + "\n");
        console.log(printinfo(i) + "\n");
    }
}

paintResult();
