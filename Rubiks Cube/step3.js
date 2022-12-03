function makeCubeFace(i, num) {
    const cubeLine = new Array(num).fill(i); // [B, B, B]
    const cubeFace = [cubeLine, cubeLine, cubeLine];
    return cubeFace;
}
// console.log(makeCubeFace("B"));
function spreadCube() {
    const B = makeCubeFace("B", 3);
    const W = makeCubeFace("W", 3);
    const O = makeCubeFace("O", 3);
    const G = makeCubeFace("G", 3);
    const Y = makeCubeFace("Y", 3);
    const R = makeCubeFace("R", 3);
    // const space = mergeFace(makeCubeFace("S", 9));
    console.log(
        mergeFace(B) +
            "\n" +
            "\n" +
            mergeFace(W) +
            "\n" +
            "\n" +
            mergeFace(O) +
            "\n" +
            "\n" +
            mergeFace(G) +
            "\n" +
            "\n" +
            mergeFace(Y) +
            "\n" +
            "\n" +
            mergeFace(R) +
            "\n"
    );
}
function mergeFace(array) {
    const merged = array.map((line) => line.join(" ")).join("\n");
    return merged;
}
