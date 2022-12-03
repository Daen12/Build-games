class Rubiks_Cube {
    constructor() {
        this.UP = this.makeCubeFace("B", 3);
        this.LEFT = this.makeCubeFace("W", 3);
        this.FRONT = this.makeCubeFace("O", 3);
        this.RIGHT = this.makeCubeFace("G", 3);
        this.BACK = this.makeCubeFace("Y", 3);
        this.DOWN = this.makeCubeFace("R", 3);
    }
    setReadLine() {
        this.readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    gameStart() {
        this.startTime = new Date().getTime() / 1000;
        this.setReadLine();
        this.spreadCube();
        this.readline.setPrompt("> CUBE : ");
        this.readline.prompt();
        this.readline.on("line", (line) => {
            if (String(line.toUpperCase()) === "Q") {
                this.readline.close();
            }
            this.sortCommand(line);
        });
        this.readline.on("close", () => {
            this.measureTime();
            console.log("이용해주셔서 감사합니다. 뚜뚜뚜.");
            process.exit();
        });
    }
    measureTime() {
        const endTime = new Date().getTime() / 1000;
        const timeInSeconds = Math.round(endTime - this.startTime);
        const minute = String(parseInt(timeInSeconds / 60));
        const second = String(timeInSeconds % 60);
        console.log(
            `경과시간: ${minute.padStart(2, "0")}:${second.padStart(2, "0")}`
        );
    }
    makeCubeFace(i, num) {
        const cubeLine = new Array(num).fill(i); // [B, B, B]
        const cubeFace = [cubeLine, cubeLine, cubeLine];
        return cubeFace;
    }
    mergeFace(array) {
        const merged = array.map((line) => line.join(" ")).join("\n");
        return merged;
    }
    spreadCube() {
        // const space = mergeFace(makeCubeFace("S", 9));
        console.log(
            this.mergeFace(this.UP) +
                "\n" +
                "\n" +
                this.mergeFace(this.LEFT) +
                "\n" +
                "\n" +
                this.mergeFace(this.FRONT) +
                "\n" +
                "\n" +
                this.mergeFace(this.RIGHT) +
                "\n" +
                "\n" +
                this.mergeFace(this.BACK) +
                "\n" +
                "\n" +
                this.mergeFace(this.DOWN) +
                "\n"
        );
    }
    sortCommand(line) {
        //'가 붙어있으면 그앞의 알파벳에 대한 카운터 실행
        //숫자가 있으면 그 뒤의 알파벳에 대해 숫자만큼 반복 실행.
        // for (let i = 0; i < line.length; i++) {
        //     this.selectMove(String(line[i]));
        // }
        this.selectMove(String(line));
    }
    selectMove(i) {
        const func = {
            U: () => {
                this.U();
            },
            "U'": () => {
                this.counterU();
            },
            F: () => {
                this.F();
            },
            "F'": () => {
                this.counterF();
            },
            D: () => {
                this.D();
            },
            "D'": () => {
                this.counterD();
            },
        };
        if (i in func) {
            console.log(i + "\n");
            func[i]();
            this.spreadCube();
        } else {
            console.log("!Invalid Input");
            this.readline.close();
        }
    }
    U() {
        [this.LEFT[0], this.FRONT[0], this.RIGHT[0], this.BACK[0]] = [
            this.FRONT[0],
            this.RIGHT[0],
            this.BACK[0],
            this.LEFT[0],
        ];
    }
    counterU() {
        [this.LEFT[0], this.FRONT[0], this.RIGHT[0], this.BACK[0]] = [
            this.BACK[0],
            this.LEFT[0],
            this.FRONT[0],
            this.RIGHT[0],
        ];
    }
    D() {
        [this.LEFT[2], this.FRONT[2], this.RIGHT[2], this.BACK[2]] = [
            this.BACK[2],
            this.LEFT[2],
            this.FRONT[2],
            this.RIGHT[2],
        ];
    }
    counterD() {
        [this.LEFT[2], this.FRONT[2], this.RIGHT[2], this.BACK[2]] = [
            this.FRONT[2],
            this.RIGHT[2],
            this.BACK[2],
            this.LEFT[2],
        ];
    }
    F() {
        this.UP[2] = [this.LEFT[0][2], this.LEFT[1][2], this.LEFT[2][2]];
        [this.LEFT[0][2], this.LEFT[1][2], this.LEFT[2][2]] = this.DOWN[0];
        this.DOWN[0] = [this.RIGHT[2][0], this.RIGHT[1][0], this.RIGHT[0][0]];
        [this.RIGHT[0][0], this.RIGHT[1][0], this.RIGHT[2][0]] = this.UP[2];
    }
    counterF() {
        this.UP[2] = [this.RIGHT[0][0], this.RIGHT[1][0], this.RIGHT[2][0]];
        [this.RIGHT[0][0], this.RIGHT[1][0], this.RIGHT[2][0]] = [
            this.DOWN[0][2],
            this.DOWN[0][1],
            this.DOWN[0][0],
        ];
        this.DOWN[0] = [this.LEFT[0][2], this.LEFT[1][2], this.LEFT[2][2]];
        [this.LEFT[0][2], this.LEFT[1][2], this.LEFT[2][2]] = [
            this.UP[2][2],
            this.UP[2][1],
            this.UP[2][0],
        ];
    }
}
const cube = new Rubiks_Cube();
// cube.spreadCube();
cube.gameStart();
