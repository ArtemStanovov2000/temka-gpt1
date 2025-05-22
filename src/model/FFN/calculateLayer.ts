export const calculateLayer = (inputLayer: number[], weights: number[][], funcActivation: Function, bias: number[]) => {
    const activationLayer = []
    for (let i = 0; i < weights[0].length; i++) {
        let weightedSum = 0
        for (let j = 0; j < weights.length; j++) {
            weightedSum += weights[j][i] * inputLayer[j]
        }
        activationLayer.push(funcActivation(weightedSum + bias[i]))
    }
    return activationLayer
}