// const startTime = new Date().getTime() / 1000;
const startTime = 1669991570.833;
const endTime = 1669991652.402;
const timeInSeconds = Math.round(endTime - startTime);
const minute = parseInt(timeInSeconds / 60);
const second = timeInSeconds % 60;
// const fixedSeconds = timeInSeconds.toFixed(0);
console.log(minute, second);
