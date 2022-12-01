// const { log } = console;

class Word_Shift {
    constructor() {
        this.word = "";
        this.num = 0;
        this.direction = "";
    }
    gameStart() {
        this.setReadLine();
        this.inputProcess();
    }
    setReadLine() {
        this.readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    inputProcess() {
        this.readline.setPrompt("> 입력하세요 : ");
        this.readline.prompt();
        this.readline.on("line", function (line) {
            //여기서 들어온 라인을 분석하는 함수를 실행
            //근데 this 함수앞에 안붙이면 어케 다른지??
            this.setInput(line);
            // this.readline.prompt();
            this.readline.close();
        });
        this.readline.on("close", function () {
            process.exit();
        });
    }
    setInput(line) {
        let splitted = line.split(" ");
        this.word = splitted[0];
        this.num = splitted[1];
        this.direction = splitted[2].toUpperCase();
        return this.moveWords();
    }
    moveWords() {
        // this.setCommand(line);
        if (
            this.isWord(word) &&
            this.isInteger(num) &&
            this.hasDirection(direction)
        ) {
            this.selectFunction();
        } else {
            // 어떤 부분이 잘못 입력되었는지에 따라 에러메세지 다르게 반환 -> how?
            return this.errorMsg();
        }
    }

    selectFunction() {
        //방향이 L이면서 숫자가 양수 = 방향이 R이면서 숫자가 음수
        //방향이 L이면서 숫자가 음수 = 방향이 R이면서 숫자가 양수
        // ==> 따라서 두가지 경우만 만들면 됨.
        // switch-case 사용해보기? => expression이 아니라 불가능...

        if (this.direction === "L") {
            if (this.num > 0) {
                console.log(leftPositive());
            } else if (this.num <= 0) {
                console.log(leftNegative());
            }
        }
        if (this.direction === "R") {
            if (this.num > 0) {
                console.log(leftNegative());
            } else if (this.num <= 0) {
                console.log(leftPositive());
            }
        }
    }

    leftPositive() {
        let result = this.word.split("");
        for (let i = 0; i < this.num; i++) {
            result.push(input.shift());
        }
        return result.join("");
    }
    leftNegative() {
        let result = input.split("");
        for (let i = 0; i < this.num; i++) {
            result.splice(0, 0, result.pop());
        }
        return result.join("");
    }
    isWord(word) {
        //잉글리쉬만
        // const alphabet = new RegExp("a-z", "i");
        const alphabet = /a-z/i;
        return alphabet.test(word);
    }
    isInteger(num) {
        //NaN이 아니면서 100~100사이에 있어야 함.
        const numberCheck = Number.isInteger(num) && 100 <= num && num < 100;
        return numberCheck;
    }
    hasDirection(direction) {
        //r또는 l이어야 함.
        return direction === "R" || "L";
    }
    errorMsg() {
        console.log(`입력값이 제대로 입력되지 않았습니다.`);
        this.readline.prompt();
    }
}
const wordShifter = new Word_Shift();
// const line = "apple 3 L";
// const input = line.split(" ");

wordShifter.gameStart();
