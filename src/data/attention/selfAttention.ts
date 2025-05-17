import { layerNorm } from "./layerNorn"
import { calculateOneHeadW_QKV_Matrix } from "./calculateQueryMatrix"

export const selfAttention = (emb?: number[][], matrixQ?: number[][], matrixK?: number[][], matrixV?: number[][], gamma?: number[], beta?: number[]) => {
    //const normEmb = layerNorm(emb, gamma, beta)

    const worker = new Worker(new URL("./worker.ts", import.meta.url))
    worker.postMessage({ message: '415-ый, я база, ответьте' })

    worker.onmessage = function (e) {
        console.log(e.data)
    }
}