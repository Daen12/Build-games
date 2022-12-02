function sortInput(line) {
    //숫자나 스페이스 들어오면 예외처리 후 종료
    line = line.split("");
    const hasException = line.some((str) => /\d|\s/g.test(str));
    if (hasException) {
        console.log("Error! 알맞은 문자열을 입력하세요");
        readline.prompt();
    } else {
        //아니면 각 문자를 돌면서 다음 단계 함수 호출
        const command = String(line).split("");
        for (let i = 0; i < command.length; i++) {
            selectMove(command[i]);
            // console.log(command[i]);
        }
    }
}
// =====> this turned

function sortInput(line) {
    const command = String(line).split("");
    for (let i = 0; i < command.length; i++) {
        selectMove(command[i]);
    }
}
