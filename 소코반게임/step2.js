const readline = require("readline");
const fs = require("fs");
const { start } = require("repl");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const startMap = fs
    .readFileSync("./소코반게임/map.txt")
    .toString()
    .split("\n")
    .slice(6);
// .join("\n");

rl.setPrompt(
    "Stage 2" + "\n" + startMap.join("\n") + "\n" + "\n" + "> Sokoban Start : "
);
rl.prompt();
rl.on("line", function (line) {
    const input = line;
    if (input === "q") {
        rl.close();
    } else {
        //여기서 input을 분석
        rl.close();
    }
});
rl.on("close", function () {
    console.log("Bye~");
    process.exit();
});

//이전단계에서 해당 명령을 수행할 수 없으면 이전 프롬프트의 맵을 띄우고 실행할 수 없다는 메세지 출력
console.log(startMap);
