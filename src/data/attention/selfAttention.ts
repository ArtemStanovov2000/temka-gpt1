import { layerNorm } from "./layerNorn"
import { workersList } from "./workersList"

export const selfAttention = (emb: number[][], gamma: number[], beta: number[], matrixQ?: number[][], matrixK?: number[][], matrixV?: number[][]) => {
    const normEmb = layerNorm(emb, gamma, beta)

    workersList.headAttention1Query.postMessage({ embeddings: normEmb, matrix: matrixQ, start: 0, end: 8 })
    workersList.headAttention1Key.postMessage({ embeddings: normEmb, matrix: matrixK, start: 0, end: 8 })
    workersList.headAttention1Value.postMessage({ embeddings: normEmb, matrix: matrixV, start: 0, end: 8 })

    /*workersList.headAttention1Query.onmessage = function (e) {
        console.log(e.data)
    }
    workersList.headAttention1Key.onmessage = function (e) {
        console.log(e.data)
    }
    workersList.headAttention1Value.onmessage = function (e) {
        console.log(e.data)
    }*/

    const waitForWorker1 = new Promise(resolve => {
        workersList.headAttention1Query.onmessage = function (e) {
            console.log("Worker1:", e.data);
            resolve(e.data); // Резолвим промис с данными
        };
    });

    const waitForWorker2 = new Promise(resolve => {
        workersList.headAttention1Key.onmessage = function (e) {
            console.log("Worker2:", e.data);
            resolve(e.data);
        };
    });

    const waitForWorker3 = new Promise(resolve => {
        workersList.headAttention1Value.onmessage = function (e) {
            console.log("Worker3:", e.data);
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

            console.log("Итоговый объект:", finalObject);
            return finalObject;
        })
        .catch(error => {
            console.error("Ошибка в воркере:", error);
        });
}