import { layerNorm } from "./layerNorn"
import { workersList } from "./workersList"

export const selfAttention = (emb: number[][], gamma: number[], beta: number[], matrixQ?: number[][], matrixK?: number[][], matrixV?: number[][]) => {
    const normEmb = layerNorm(emb, gamma, beta)

    workersList.headAttention1Query.postMessage({ embeddings: normEmb, matrix: matrixQ, start: 0, end: 8 })
    workersList.headAttention1Key.postMessage({ embeddings: normEmb, matrix: matrixK, start: 0, end: 8 })
    workersList.headAttention1Value.postMessage({ embeddings: normEmb, matrix: matrixV, start: 0, end: 8 })

    const waitForWorker1 = new Promise(resolve => {
        workersList.headAttention1Query.onmessage = function (e) {
            resolve(e.data);
        };
    });

    const waitForWorker2 = new Promise(resolve => {
        workersList.headAttention1Key.onmessage = function (e) {
            resolve(e.data);
        };
    });

    const waitForWorker3 = new Promise(resolve => {
        workersList.headAttention1Value.onmessage = function (e) {
            resolve(e.data);
        };
    });

    Promise.all([waitForWorker1, waitForWorker2, waitForWorker3])
        .then(([result1, result2, result3]) => {
            // Формируем итоговый объект
            const finalObject = {
                значение1: result1,
                значение2: result2,
                значение3: result3
            };
            return finalObject;
        })
        .catch(error => {
            console.error("Ошибка в воркере:", error);
        });
}