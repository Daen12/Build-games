const { log } = console;

class Wordplay {
    constructor() {
        // this.variable = [word, num, direction] ;= [input[0], input[1], input[2]]
    }
    moveWords(line) {
        const splitted = line.split(" ");
        if (
            this.isWord(splitted[0]) &&
            this.isNumber(splitted[1]) &&
            this.hasDirection(splitted[2])
        ) {
        }
    }
    isWord(splitted) {
        const alphabet = new RegExp();
        alphabet.test(splitted);
    }
    isNumber(splitted) {
        const numberCheck =
            splitted.isNumber && 100 <= splitted && splitted < 100;
        return numberCheck;
        //NaN이 아니면서 100~100사이에 있어야 함.
    }
    hasDirection(line) {
        //r또는 l이어야 함.
        //추가로 lowercase() 이후 반환해주기
    }
    errorMsg(i) {
        log(`${i}가 제대로 입력되지 않았습니다.`);
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
        this.readline.setPrompt("문자를 입력하세요 : ");
        this.readline.prompt();
        this.readline.on("line", function (line) {
            //여기서 들어온 라인을 분석하는 함수를 실행

            // this.readline.prompt();
            this.readline.close();
        });
        this.readline.on("close", function () {
            process.exit();
        });
    }
}
const wordPlay = new Wordplay();
// const line = "apple 3 L";
// const input = line.split(" ");

wordPlay.gameStart();
