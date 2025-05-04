export const embeddings: number[][] = []

for (let i = 0; i < 50000; i++) {
    const embedding: number[] = []
    for (let j = 0; j < 768; j++) {
        embedding.push(Math.random() * 0.2 - 0.1)
    }
    embeddings.push(embedding)
}