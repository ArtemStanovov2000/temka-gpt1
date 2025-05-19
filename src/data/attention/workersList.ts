export const workersList = {
    headAttention1Query: new Worker(new URL("./headAttention.ts", import.meta.url)),
    headAttention1Key: new Worker(new URL("./headAttention.ts", import.meta.url)),
    headAttention1Value: new Worker(new URL("./headAttention.ts", import.meta.url))
}