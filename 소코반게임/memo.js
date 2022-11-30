const fs = require("fs");
const map = fs.readFileSync("./소코반게임/map.txt", "utf8").split("=====");
function mapList() {
    const arr = [];
    map.forEach((map) => arr.push(map.split("\n")));
    return arr.filter((line) => line[0] !== "S");
    // return arr;
}
console.log(mapList());

// [
//     ["#####", "#OoP#", "#####"],
//     [
//         "  #######",
//         "###  O  ###",
//         "#    o    #",
//         "# Oo P oO #",
//         "###  o  ###",
//         " #   O  # ",
//         " ########",
//     ],
// ][
//     ("#####\n#OoP#\n#####\n",
//     "\n" +
//         "  #######\n" +
//         "###  O  ###\n" +
//         "#    o    #\n" +
//         "# Oo P oO #\n" +
//         "###  o  ###\n" +
//         " #   O  # \n" +
//         " ########")
// ];
