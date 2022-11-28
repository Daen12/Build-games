const fs = require("fs");
let input = fs.readFileSync("./소코반게임/map.txt").toString().split("\n");

console.log(input.length);
function converter() {
    const array = [];
    for (let i = 0; i < input.length; i++) {
        let mapped = [...input[i]].map((item) => {
            return converterReference(item);
        });
        array.push(mapped);
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
console.log(converter());

function reverter() {
    const converted = converter();
    const array = [];
    for (let i = 0; i < converted.length; i++) {
        let mapped = [...converted[i]].map((item) => {
            return reverterReference(item);
        });
        // const toPush = mapped.join("")
        array.push(mapped.join(""));
    }
    return array.join("\n");
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
        return " ";
    } else {
        return i;
    }
}
console.log(reverter());

// function printinfo() {
//     return `가로크기 : ${1 + 2}
// 세로크기 : ${1}
// 구멍의 수 : ${1}
// 공의 수 : ${1}
// 플레이어 위치 ${1}`;
// }
// console.log(printinfo());
