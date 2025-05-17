export const layerNorm = (x: number[][], gamma: number[], beta: number[], epsilon = 1e-5) => {
    
    const normalized = [];
    
    for (let i = 0; i < x.length; i++) {
        const mean = x[i].reduce((sum, val) => sum + val, 0) / x[i].length;
        const variance = x[i].reduce((sum, val) => sum + (val - mean) ** 2, 0) / x[i].length;
        
        const normalizedToken = x[i].map(val => 
            (val - mean) / Math.sqrt(variance + epsilon)
        );
        
        const scaled = normalizedToken.map((val, j) => 
            gamma[j] * val + beta[j]
        );
        
        normalized.push(scaled);
    }
    
    return normalized;
}