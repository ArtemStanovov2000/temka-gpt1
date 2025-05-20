import { positionMatrix } from "../../data/matrix/positionMatrix"

// Складывает матрицу токенов с матрицей эмбеддингов, нужна только на 1м шаге
export const calculatePosition = (tokens: number[][]) => {
    for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 128; j++) {
            tokens[i][j] += positionMatrix[i][j]
        }
    }
}