export const cleanSymbol = (symbol: string) => {
    return symbol.replace(/[^а-яё]/gi, "_");
}

export const cleaningText = (text: string) => {
    const textArr = text.split("")
    for (let i = 0; i < textArr.length; i++) {
        textArr[i] = cleanSymbol(textArr[i].toLowerCase())
    }
    return textArr.join("")
}
