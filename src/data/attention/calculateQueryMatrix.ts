export const calculateQueryMatrix = (embeddings: number[][], matrix: number[][], start: number, end: number) => {
    const headMatrix: number[][] = []
    for (let i = start; i < end; i++) {
        headMatrix.push(matrix[i])
    }

    const result: number[][] = [];
    for (let i = 0; i < 512; i++) {
        result[i] = [];
        for (let j = 0; j < headMatrix.length; j++) {
            let sum = 0;
            for (let k = 0; k < embeddings[0].length; k++) {
                sum += embeddings[i][k] * headMatrix[j][k];
            }
            result[i][j] = sum;
        }
    }
    return result;
}