onmessage = function (e) {
    const headMatrix: number[][] = []
    for (let i = e.data.start; i < e.data.end; i++) {
        headMatrix.push(e.data.matrix[i])
    }

    const result: number[][] = [];
    for (let i = 0; i < 512; i++) {
        result[i] = [];
        for (let j = 0; j < headMatrix.length; j++) {
            let sum = 0;
            for (let k = 0; k < e.data.embeddings[0].length; k++) {
                sum += e.data.embeddings[i][k] * headMatrix[j][k];
            }
            result[i][j] = sum;
        }
    }
    postMessage(result)
}