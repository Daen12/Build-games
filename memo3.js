const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "숫자를 입력해주세요 ex)123 ",
  });
  const random = generateRandomNum();
  console.log(random);

  rl.prompt();
  rl.on("line", function ballCounter(userInput) {
    let convertToArr = userInput.toString().split("").map(Number);
    console.log(convertToArr);
    compare(convertToArr, random);
    // console.log(convertToArr, typeof convertToArr);
  }).on("close", function (data) {
    process.exit();
  });


getUserInput();

function compare(userInput, random) {
  456 567 872 874
  
  
  console.log(`random :${random}, userInput: ${userInput}`);
}