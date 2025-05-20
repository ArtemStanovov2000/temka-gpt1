import { textPreparation } from "./textPreparation/textPreparation"
import { attention } from "./attention/attention"
import { gamma1layerFirst } from "../data/matrix/layer_1/gamma1layerFirst"
import { beta1layerFirst } from "../data/matrix/layer_1/beta1layerSecond"
import { gamma1layerSecond } from "../data/matrix/layer_1/gamma1layerSecond"
import { beta1layerSecond } from "../data/matrix/layer_1/beta1layerFirst"
import { W_Q_1layer } from "../data/matrix/layer_1/W_Q_1layer"
import { W_K_1layer } from "../data/matrix/layer_1/W_K_1layer"
import { W_V_1layer } from "../data/matrix/layer_1/W_V_1layer"

export const createToken = (text: string) => {
    const initialEmb = textPreparation(text)
    attention(initialEmb, gamma1layerFirst, beta1layerFirst, gamma1layerSecond, beta1layerSecond, W_Q_1layer, W_K_1layer, W_V_1layer)
}