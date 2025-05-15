import { transposeMatrix } from "./transposeMatrix";
import { config } from "../config";
import { mask } from "./mask";
import { softmax } from "./sotmax";

export const calculateAttentionMatrix = (matrixQ: number[][], matrixK: number[][]) => {
    const matrixKTranspose = transposeMatrix(matrixK)

    const attention = new Array(config.maxLength);
    for (let i = 0; i < config.maxLength; i++) {
        attention[i] = new Array(config.maxLength);
        for (let j = 0; j < config.maxLength; j++) {
            let sum = 0;
            for (let k = 0; k < matrixKTranspose.length; k++) {
                sum += matrixQ[i][k] * matrixK[j][k];
            }
            attention[i][j] = sum;
        }
    }

    // Масштабирование
    const scaleFactor = Math.sqrt(matrixKTranspose.length);
    for (let i = 0; i < config.maxLength; i++) {
        for (let j = 0; j < config.maxLength; j++) {
            attention[i][j] /= scaleFactor;
            attention[i][j] += mask[i][j]
        }
    }

    for (let i = 0; i < attention.length; i++) {
        attention[i] = softmax(attention[i])
    }

    return attention
}