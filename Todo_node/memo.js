const form = [
    ["R", "R", "W"],
    ["G", "C", "W"],
    ["G", "B", "B"],
];
const sequence = form[2];
sequence.push(sequence.shift());

// [form[0][2], form[1][2], form[2][2]] = [form[1][2], form[2][2], form[0][2]];
console.log(form);
