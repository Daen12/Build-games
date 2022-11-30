async function inputTest() {
    const input = "aass";
    const arr = [];
    for (let i = 0; i < input.length; i++) {
        arr.push(input[i]);
    }
    return arr;
}
inputTest().then((map) => console.log(map));
