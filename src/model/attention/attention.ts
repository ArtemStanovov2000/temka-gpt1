import { layerNorm } from "../../utils/mathematicalOperations/layerNorn"
import { calculateAttentionMatrix } from "./calculateAttentionMatrix"
import { calculateOneHeadW_QKV_Matrix } from "./calculateQueryMatrix"
import { calculateValueMatrix } from "./calculateValueMatrix"

export const attention = (embeddings: number[][], gammaFirst: number[], betaFirst: number[], gammaSecond: number[], betaSecond: number[], W_q: number[][], W_k: number[][], W_v: number[][], W_o: number[][], length: number) => {
    const embeddingsNorm = layerNorm(embeddings, gammaFirst, betaFirst)

    const W_QMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_q)
    const W_KMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_k)
    const W_VMatrix = calculateOneHeadW_QKV_Matrix(embeddingsNorm, W_v)

    const attentionMatrix = calculateAttentionMatrix(W_QMatrix, W_KMatrix, length)
    const valueMatrix = calculateValueMatrix(attentionMatrix, W_VMatrix)
    const accentMatrix = calculateOneHeadW_QKV_Matrix(valueMatrix, W_o)

    for (let i = 0; i < accentMatrix.length; i++) {
        for (let j = 0; j < accentMatrix[i].length; j++) {
            accentMatrix[i][j] += embeddings[i][j]
        }
    }

    const newEmbeddingsNorm = layerNorm(accentMatrix, gammaSecond, betaSecond)
    return newEmbeddingsNorm
}