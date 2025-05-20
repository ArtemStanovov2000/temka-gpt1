// Умножение маски внимания на матрицу W_V
export const calculateValueMatrix = (embeddings: number[][], matrix: number[][]) => {
    // Создаем результирующую матрицу 512x128, заполненную нулями
    const result = new Array(embeddings.length);
    for (let i = 0; i < embeddings.length; i++) {
        result[i] = new Array(matrix[0].length).fill(0);
    }

    // Умножаем матрицы
    for (let i = 0; i < embeddings.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < embeddings[0].length; k++) {
                sum += embeddings[i][k] * matrix[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}