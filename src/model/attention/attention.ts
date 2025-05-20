import { layerNorm } from "../../utils/mathematicalOperations/layerNorn"
import { calculateAttentionMatrix } from "./calculateAttentionMatrix"
import { calculateOneHeadW_QKV_Matrix } from "./calculateQueryMatrix"

export const attention = (embeddings: number[][], gammaFirst: number[], betaFirst: number[], gammaSecond: number[], betaSecond: number[], W_q: number[][], W_k: number[][], W_v: number[][]) => {
    const embeddingsNorm = layerNorm(embeddings, gammaFirst, betaFirst)

    const W_QMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_q, 0, 128)
    const W_KMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_k, 0, 128)
    const W_VMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_v, 0, 128)

    // Применить маскирование
    const attentionMatrix = calculateAttentionMatrix(W_QMatrix, W_KMatrix)
    console.log(attentionMatrix)
    // Вычисляем внимание умножая матрицу W_q на W_k
    // Умножаем на матрицу W_v возвращаем исходную размерность

    // Нормализация
    // Полносвязный слой
}