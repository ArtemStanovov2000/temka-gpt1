// Функция активации
export const GELU = (num: number) => {
    return 0.5 * num * (1 + Math.tanh(0.7978845608028654 * (num + 0.044715 * Math.pow(num, 3))));
}
