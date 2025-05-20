import { layerNorm } from "../../utils/mathematicalOperations/layerNorn"
import { calculateAttentionMatrix } from "./calculateAttentionMatrix"
import { calculateOneHeadW_QKV_Matrix } from "./calculateQueryMatrix"
import { calculateValueMatrix } from "./calculateValueMatrix"

export const attention = (embeddings: number[][], gammaFirst: number[], betaFirst: number[], gammaSecond: number[], betaSecond: number[], W_q: number[][], W_k: number[][], W_v: number[][], length: number) => {
    const embeddingsNorm = layerNorm(embeddings, gammaFirst, betaFirst)

    const W_QMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_q, 0, 128)
    const W_KMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_k, 0, 128)
    const W_VMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_v, 0, 128)

    // Применить маскирование
    const attentionMatrix = calculateAttentionMatrix(W_QMatrix, W_KMatrix, length)
    const valueMatrix = calculateValueMatrix(attentionMatrix, W_VMatrix)

    const newEmbeddingsNorm = layerNorm(valueMatrix, gammaSecond, betaSecond)
    console.log(newEmbeddingsNorm)

    // Полносвязный слой
}