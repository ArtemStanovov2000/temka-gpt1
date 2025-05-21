import { positionMatrix } from "../../data/matrix/positionMatrix"

// Складывает матрицу токенов с матрицей эмбеддингов, нужна только на 1м шаге
export const calculatePosition = (tokens: number[][]) => {
    const poz: number[][] = new Array(512)
    for (let i = 0; i < poz.length; i++) {
        poz[i] = new Array(128)
        for (let j = 0; j < poz[0].length; j++) {
            poz[i][j] = tokens[i][j] + positionMatrix[i][j]
        }
    }
    return poz
}