// Полносвязный слой принимает в себя матрицу эмбеддингов, увеличивает размерность, потом сокращает размерность до исходной
import { biasHidden1layer } from "../../data/matrix/layer_1/biasHidden1layer"
import { calculateLayer } from "./calculateLayer"
import { GELU } from "./GELU"

export const FFN = (outputEmb: number[][], weightMatrix1: number[][], weightMatrix2: number[][]) => {
    for (let i = 0; i < outputEmb.length; i++) {
        calculateLayer(outputEmb[i], weightMatrix1, GELU, biasHidden1layer)
    }
}