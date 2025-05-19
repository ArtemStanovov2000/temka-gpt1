import { tokenizationText } from "../utils/tokenizator"
import { embeddingMatrix } from "./matrix/embeddingMatrix"
import { calculatePosition } from "./attention/calculatePosition"
import { selfAttention } from "./attention/selfAttention"
import { gamma1layerFirst } from "./matrix/layer_1/gamma1layerFirst"
import { beta1layerFirst } from "./matrix/layer_1/beta1layerSecond"
import { W_Q_1layer } from "./matrix/layer_1/W_Q_1layer"
import { W_K_1layer } from "./matrix/layer_1/W_K_1layer"
import { W_V_1layer } from "./matrix/layer_1/W_V_1layer"

export const createToken = (text: string) => {
    // Токенизируем текст
    const tokens = tokenizationText(text)

    // Создаем матрицу эмбеддингов
    const embeddings = []
    for (let i = 0; i < tokens.length; i++) {
        embeddings.push(embeddingMatrix[i])
    }

    // Заполняем матрицу контекста токенами-паддингами (длина контекста 512, токенов текста 121, токенов паддингов 512-121 = 391)
    for (let i = tokens.length; i < 512; i++) {
        embeddings.push(new Array(128).fill(0))
    }

    // Сложение эмбеддингов с матрицей позиций
    calculatePosition(embeddings)

    return selfAttention(embeddings, gamma1layerFirst, beta1layerFirst, W_Q_1layer, W_K_1layer, W_V_1layer)
}