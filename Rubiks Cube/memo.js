let input = "apple"; //leapp / r이면 pleap
const num = 0;
const direction = "L";

function moveWords(input, num, direction) {
    //방향이 L이면서 숫자가 양수 = 방향이 R이면서 숫자가 음수
    //방향이 L이면서 숫자가 음수 = 방향이 R이면서 숫자가 양수
    // ==> 따라서 두가지 경우만 만들면 됨.
    // switch-case 사용해보기? => expression이 아니라 불가능...

    if (direction === "L") {
        if (num > 0) {
            console.log(leftPositive());
        } else if (num <= 0) {
            console.log(leftNegative());
        }
        if (direction === "R") {
            if (num > 0) {
                console.log(leftNegative());
            } else if (num <= 0) {
                console.log(leftPositive());
            }
        }
    }
}
function leftPositive() {
    input = input.split("");
    for (let i = 0; i < num; i++) {
        input.push(input.shift());
    }
    return input.join("");
}
function leftNegative() {
    input = input.split("");
    for (let i = 0; i < num; i++) {
        input.splice(0, 0, input.pop());
    }
    return input.join("");
}
// console.log(leftNegative(input));
moveWords(input, num, direction);
