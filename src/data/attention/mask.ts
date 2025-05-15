export const mask = new Array(512);
for (let i = 0; i < 512; i++) {
    mask[i] = new Array(512);
    for (let j = 0; j < 512; j++) {
        mask[i][j] = (j > i) ? -Infinity : 0;
    }
}