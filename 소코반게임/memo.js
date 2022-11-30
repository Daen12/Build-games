const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log(currentMap);
rl.setPrompt("> Sokoban Start : ");
rl.prompt();
rl.on("line", function (line) {
    const command = String(line);
    if (command === "q") {
        rl.close();
    }
    for (let i = 0; i < command.length; i++) {
        moveCommand(command[i], currentMap);
    }
    //o이 없을 때 종료조건생성
    rl.prompt();
});
rl.on("close", function () {
    console.log("************" + "\n" + "* Game End *" + "\n" + "************");
    process.exit();
});
