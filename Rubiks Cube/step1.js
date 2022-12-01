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
        this.readline.on("line", (line) => {
            this.setInput(String(line));
            this.readline.close();
        });
        this.readline.on("close", function () {
            process.exit();
        });
    }
    setInput(line) {
        let splitted = line.split(" ");
        this.word = splitted[0];
        this.num = Number(splitted[1]);
        this.direction = splitted[2].toUpperCase();
        this.moveWords();
    }
    moveWords() {
        if (
            this.isWord(this.word) &&
            this.isInteger(this.num) &&
            this.hasDirection(this.direction)
        ) {
            this.selectFunction();
        } else {
            return this.errorMsg();
        }
    }

    selectFunction() {
        //방향이 L이면서 숫자가 양수 = 방향이 R이면서 숫자가 음수
        //방향이 L이면서 숫자가 음수 = 방향이 R이면서 숫자가 양수
        // ==> 따라서 두가지 경우만 만들면 됨.
        if (this.direction === "L") {
            if (this.num > 0) {
                console.log(this.leftPositive());
            } else if (this.num <= 0) {
                this.num = Math.abs(this.num);
                console.log(this.leftNegative());
            }
        }
        if (this.direction === "R") {
            if (this.num > 0) {
                console.log(this.leftNegative());
            } else if (this.num <= 0) {
                this.num = Math.abs(this.num);
                console.log(this.leftPositive());
            }
        }
    }

    leftPositive() {
        let result = this.word.split("");
        for (let i = 0; i < this.num; i++) {
            result.push(result.shift());
        }
        return result.join("");
    }
    leftNegative() {
        let result = this.word.split("");
        for (let i = 0; i < this.num; i++) {
            result.splice(0, 0, result.pop());
        }
        return result.join("");
    }
    isWord(word) {
        //잉글리쉬만
        const alphabet = /[a-z]/i;
        return alphabet.test(word);
    }
    isInteger(num) {
        //NaN이 아니면서 100~100사이에 있어야 함.
        const numberCheck = Number.isInteger(num) && -100 <= num && num < 100;
        return numberCheck;
    }
    hasDirection(direction) {
        //r또는 l이어야 함.
        return direction === "R" || direction === "L";
    }
    errorMsg() {
        console.log(`입력값이 제대로 입력되지 않았습니다.`);
        this.readline.prompt();
    }
}

const wordShifter = new Word_Shift();
wordShifter.gameStart();
