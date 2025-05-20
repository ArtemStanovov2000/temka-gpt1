import { textPreparation } from "./textPreparation/textPreparation"

export const createToken = (text: string) => {
    return textPreparation(text)
}