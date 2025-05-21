// Умножение матрицы для одной головы внимания. Умножает матрицу эмбеддингов на матрицу W_Q, W_K, W_V, универсальна для всех 3х матриц
export const calculateOneHeadW_QKV_Matrix = (embeddings: number[][], matrix: number[][]) => {
    // Умножаем матрицы
    const result: number[][] = [];
    for (let i = 0; i < 512; i++) {
        result[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            let sum = 0;
            for (let k = 0; k < embeddings[0].length; k++) {
                sum += embeddings[i][k] * matrix[j][k];
            }
            result[i][j] = sum;
        }
    }
    return result;
}