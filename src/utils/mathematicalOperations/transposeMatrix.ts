// Транспонирование матрицы это "поворот" её набок матрица 512х8 становится 8х512
export const transposeMatrix = (matrix: number[][]) => {
    return matrix[0].map((_, colIdx) => matrix.map(row => row[colIdx]));
}