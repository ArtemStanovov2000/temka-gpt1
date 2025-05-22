import { textPreparation } from "./textPreparation/textPreparation"
import { attention } from "./attention/attention"
import { gamma1layerFirst } from "../data/matrix/layer_1/gamma1layerFirst"
import { beta1layerFirst } from "../data/matrix/layer_1/beta1layerSecond"
import { gamma1layerSecond } from "../data/matrix/layer_1/gamma1layerSecond"
import { beta1layerSecond } from "../data/matrix/layer_1/beta1layerFirst"
import { W_Q_1layer } from "../data/matrix/layer_1/W_Q_1layer"
import { W_K_1layer } from "../data/matrix/layer_1/W_K_1layer"
import { W_V_1layer } from "../data/matrix/layer_1/W_V_1layer"
import { FFN } from "./FFN/FFN"
import { W_o_1layer } from "../data/matrix/layer_1/W_o_1layer"
import { Weights1_1layer } from "../data/matrix/layer_1/Weights1_1layer"
import { Weights2_1layer } from "../data/matrix/layer_1/Weights2_1layer"

export const createToken = (text: string) => {
    const initialEmb = textPreparation(text)
    const att1 = attention(initialEmb.embeddings, gamma1layerFirst, beta1layerFirst, gamma1layerSecond, beta1layerSecond, W_Q_1layer, W_K_1layer, W_V_1layer, W_o_1layer, initialEmb.length)
    const FFN1 = FFN(att1, Weights1_1layer, Weights2_1layer)
    return att1
}