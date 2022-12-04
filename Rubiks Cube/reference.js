function Cube() {
    this.front = [
        ["W", "W", "W"],
        ["W", "W", "W"],
        ["W", "W", "W"],
    ];
    this.right = [
        ["O", "O", "O"],
        ["O", "O", "O"],
        ["O", "O", "O"],
    ];
    this.back = [
        ["G", "G", "G"],
        ["G", "G", "G"],
        ["G", "G", "G"],
    ];
    this.left = [
        ["Y", "Y", "Y"],
        ["Y", "Y", "Y"],
        ["Y", "Y", "Y"],
    ];
    this.up = [
        ["B", "B", "B"],
        ["B", "B", "B"],
        ["B", "B", "B"],
    ];
    this.down = [
        ["R", "R", "R"],
        ["R", "R", "R"],
        ["R", "R", "R"],
    ];
    this.startTime = new Date();
    this.count = 0;
}

const printCube = (cube) => {
    const largeGap = "               ";
    const gap = "     ";
    let upText = "";
    let middleText = "";
    let downText = "";
    cube.up.forEach((line) => (upText += largeGap + line.join(" ") + "\n"));
    cube.front.forEach((_, index) => {
        middleText += cube.front[index].join(" ") + gap;
        middleText += cube.right[index].join(" ") + gap;
        middleText += cube.back[index].join(" ") + gap;
        middleText += cube.left[index].join(" ") + "\n";
    });
    cube.down.forEach((line) => (downText += largeGap + line.join(" ") + "\n"));
    console.log(upText);
    console.log(middleText);
    console.log(downText);
};

const cube = new Cube();
// printCube(cube);

const string = "'";
console.log(string);
