import { transposeMatrix } from "../../utils/mathematicalOperations/transposeMatrix";
import { config } from "../../utils/config/config";
import { mask } from "../../utils/mathematicalOperations/mask";
import { softmax } from "../../utils/mathematicalOperations/sotmax";

// Рассчет внимания путем умножения матрицы Q на матрицу K
export const calculateAttentionMatrix = (matrixQ: number[][], matrixK: number[][], length: number) => {
    // Транспонируем матрицу К
    const matrixKTranspose = transposeMatrix(matrixK)

    // Умножаем матрицы
    const attention: number[][] = new Array(config.maxLength);
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

    // Делим на квадрат ширины матрицы К
    const scaleFactor = Math.sqrt(matrixKTranspose.length);
    for (let i = 0; i < config.maxLength; i++) {
        for (let j = 0; j < config.maxLength; j++) {
            attention[i][j] /= scaleFactor;
            attention[i][j] += mask[i][j] // Маскрирование
        }
    }

    // Применяем softmax к каждому из эмбедднгу
    for (let i = 0; i < attention.length; i++) {
        attention[i] = softmax(attention[i])
    }

    // Маскируем пустые токены
    for (let i = length; i < config.maxLength; i++) {
        for (let j = 0; j < config.maxLength; j++) {
            attention[i][j] = 0
        }
    }


    return attention
}