// Превращает массив чисел в распределение вероятностей. сумма всех значений ~1 с очень высокой точностью
export const softmax = (row: number[]) => {
    const max = Math.max(...row);
    const exps = row.map(x => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
}