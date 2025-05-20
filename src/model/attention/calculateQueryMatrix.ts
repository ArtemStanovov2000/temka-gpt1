// Умножение матрицы для одной головы внимания. Умножает матрицу эмбеддингов на матрицу W_Q, W_K, W_V, универсальна для всех 3х матриц
export const calculateOneHeadW_QKV_Matrix = (embeddings: number[][], matrix: number[][], start: number, end: number) => {
    // Отрезаем кусок для одной головы
    const headMatrix: number[][] = []
    for (let i = start; i < end; i++) {
        headMatrix.push(matrix[i])
    }

    // Умножаем матрицы
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