class CubeParser {
    constructor() {
        this.cubes = {};
        this.sideCube = [];
        this.colors = ["B", "W", "O", "G", "Y", "R"];
        this.colorCode = {
            red: "31",
            green: "32",
            yellow: "38;5;221",
            blue: "34",
            white: "37",
            orange: "33",
        };
    }

    processParse() {
        for (const color of this.colors) {
            this.generateCube(color);
        }
        this.divideCube();
        this.printCube();
    }

    generateCube(colors) {
        const result = Array(3)
            .fill(colors)
            .map((value) => Array(3).fill(value));
        this.sideCube.push(result);
    }

    divideCube() {
        const copyCube = this.copyCube();
        const positions = ["up", "front", "right", "back", "left", "down"];
        for (const position of positions) {
            this.cubes[position] = copyCube.splice(0, 1).flat();
        }
    }

    copyCube() {
        const result = [];
        let temp;
        for (const side of this.sideCube) {
            temp = [];
            for (const cube of side) {
                temp.push([...cube]);
            }
            result.push(temp);
        }
        return result;
    }

    printCube() {
        this.printTopCube();
        this.printMidCube();
        this.printBottomCube();
    }

    getConsoleColor(color) {
        return `\x1b[${this.colorCode[color]}m`;
    }

    printTopCube() {
        for (const cube of this.cubes["up"]) {
            console.log(this.getConsoleColor("blue") + "\t\t" + cube.join(" "));
        }
    }

    printMidCube() {
        const midCubes = ["front", "right", "back", "left"]; // front -> right -> back -> left

        let str = "";
        let line;
        for (let idx = 0; idx < 3; idx++) {
            for (const position of midCubes) {
                line = this.cubes[position][idx].join(" ");
                if (position === "right") {
                    str += this.getConsoleColor("orange") + line + "\t\t";
                } else if (position === "left") {
                    str += this.getConsoleColor("yellow") + line + "\n";
                } else if (position === "back") {
                    str += this.getConsoleColor("green") + line + "\t";
                } else if (position === "front") {
                    str += this.getConsoleColor("white") + line + "\t";
                }
            }
        }
        console.log(str.trim());
    }

    printBottomCube() {
        for (const cube of this.cubes["down"]) {
            console.log(
                this.getConsoleColor("red") +
                    "\t\t" +
                    cube.join(" ") +
                    "\x1b[0m"
            );
        }
    }
}

class RubikCube {
    constructor(parser) {
        this.parser = parser;
        this.count = 0;
        this.commands = ["F", "U", "R", "L", "D", "B"];
        this.readline;
    }

    run() {
        this.init();
        this.parser.processParse();
        this.executeReadline();
    }

    init() {
        this.setReadline();
    }

    setReadline() {
        const promptMsg = "CUBE> ";
        this.readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: promptMsg,
        });
    }

    executeReadline() {
        this.readline.prompt();
        this.readline.on("line", (line) => {
            const input = this.preProcessInput(line);
            this.processCommand(input);
            this.readline.prompt();
        });
        this.readline.on("close", () => {
            process.exit(0);
        });
    }

    preProcessInput(line) {
        const validInput = this.changeValidInput(line);
        return validInput;
    }

    removeSpace(line) {
        return line.replace(/\s/g, "");
    }

    changeValidInput(line) {
        const input = this.checkInvalidInput(
            this.removeSpace(line)
        ).toUpperCase();
        const stream = [];
        const expandCommands = this.commands.concat(
            this.commands.map((command) => command + "'")
        );
        for (const char of input) {
            if (this.commands.includes(char) || char === "Q") {
                stream.push(char);
            } else if (char === "'") {
                if (this.commands.includes(stream[stream.length - 1])) {
                    stream[stream.length - 1] += char;
                }
            } else if (/\d/.test(char)) {
                if (expandCommands.includes(stream[stream.length - 1])) {
                    stream[stream.length - 1] += char;
                }
            }
        }
        return stream;
    }

    checkInvalidInput(line) {
        if (line.length < 1) {
            throw new Error("입력된 값이 없습니다.");
        }
        return line;
    }

    processCommand(input) {
        for (const command of input) {
            this.runCommand(command);
        }
    }

    runCommand(command) {
        const run = {
            F: () => console.log("Front 함수 실행"),
            "F'": () => console.log("Front Reverse 함수 실행"),
            U: () => console.log("Up 함수 실행"),
            "U'": () => console.log("Up Reverse 함수 실행"),
            R: () => console.log("Right 함수 실행"),
            "R'": () => console.log("Right Reverse 함수 실행"),
            L: () => console.log("L 함수 실행"),
            "L'": () => console.log("L Reverse 함수 실행"),
            D: () => console.log("Down 함수 실행"),
            "D'": () => console.log("Down Reverse 함수 실행"),
            B: () => console.log("B 함수 실행"),
            "B'": () => console.log("B Reverse 함수 실행"),
            Q: () => this.endGame(),
        };

        if (command in run) {
            return run[command]();
        }
    }

    endGame() {
        // 게임 종료에 대한 처리
        this.printEndGameMsg();
        this.readline.close();
    }

    printEndGameMsg() {
        const END_MESSAGE = "Bye~";
        console.log(END_MESSAGE);
    }
}

const rubikCube = new RubikCube(new CubeParser());
rubikCube.run();
