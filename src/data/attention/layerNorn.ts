export const layerNorm = (emb: number[][], gamma: number[], beta: number[], epsilon = 1e-5) => {
    
    const normalized = [];
    
    for (let i = 0; i < emb.length; i++) {
        const mean = emb[i].reduce((sum, val) => sum + val, 0) / emb[i].length;
        const variance = emb[i].reduce((sum, val) => sum + (val - mean) ** 2, 0) / emb[i].length;
        
        const normalizedToken = emb[i].map(val => 
            (val - mean) / Math.sqrt(variance + epsilon)
        );
        
        const scaled = normalizedToken.map((val, j) => 
            gamma[j] * val + beta[j]
        );
        
        normalized.push(scaled);
    }
    
    return normalized;
}