import { layerNorm } from "./layerNorn"
import { calculateOneHeadW_QKV_Matrix } from "./calculateQueryMatrix"
import { embeddingMatrix } from "../matrix/embeddingMatrix"
import { W_Q_1layer } from "../matrix/layer_1/W_Q_1layer"
import { W_K_1layer } from "../matrix/layer_1/W_K_1layer"
import { W_V_1layer } from "../matrix/layer_1/W_V_1layer"

export const selfAttention = (emb?: number[][], matrixQ?: number[][], matrixK?: number[][], matrixV?: number[][], gamma?: number[], beta?: number[]) => {
    //const normEmb = layerNorm(emb, gamma, beta) /

    const headAttention1Query = new Worker(new URL("./worker.ts", import.meta.url))
    const headAttention1Key = new Worker(new URL("./worker.ts", import.meta.url))
    const headAttention1Value = new Worker(new URL("./worker.ts", import.meta.url))

    headAttention1Query.postMessage({ embeddings: embeddingMatrix, matrix: W_Q_1layer, start: 0, end: 8 })
    headAttention1Key.postMessage({ embeddings: embeddingMatrix, matrix: W_K_1layer, start: 0, end: 8 })
    headAttention1Value.postMessage({ embeddings: embeddingMatrix, matrix: W_V_1layer, start: 0, end: 8 })

    headAttention1Query.onmessage = function (e) {
        console.log(e.data)
    }
    headAttention1Key.onmessage = function (e) {
        console.log(e.data)
    }
    headAttention1Value.onmessage = function (e) {
        console.log(e.data)
    }
}