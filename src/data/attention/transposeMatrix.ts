export const transposeMatrix = (matrix: number[][]) => {
    return matrix[0].map((_, colIdx) => matrix.map(row => row[colIdx]));
}