import { tokenizationText } from "../utils/tokenizator"
import { embeddingMatrix } from "./matrix/embeddingMatrix"
import { calculatePosition } from "./attention/calculatePosition"

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

    return embeddings
}