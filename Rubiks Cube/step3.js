// const endTime = new Date().toTimeString().slice(0, 8);
// const startTime = "23:29:42";
// console.log(endTime);
// console.log(startTime);
// for(let i=0; i<startTime.length; i++){

const { time } = require("console");

// }

// const startTime = new Date().getTime() / 1000;
const startTime = 1669991570.833;
const endTime = 1669991652.402;
const timeInSeconds = Math.round(endTime - startTime);
const minute = parseInt(timeInSeconds / 60);
const second = timeInSeconds % 60;
// const fixedSeconds = timeInSeconds.toFixed(0);
console.log(minute, second);
