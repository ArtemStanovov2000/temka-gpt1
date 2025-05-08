export const removeDuplicateWordsWithout_ = (textArr: string[]) => {
    const nonDuplicate: string[] = []
    for (let i = 0; i < textArr.length; i++) {
        if (!nonDuplicate.includes(textArr[i])) {
            nonDuplicate.push(textArr[i])
        }
    }
    return nonDuplicate
}

export const add_ = (textArr: string[]) => {
    for (let i = 0; i < textArr.length; i++) {
        if(!textArr[i].startsWith("_")) {
            textArr[i] = "_" + textArr[i]
        }
    }
    return textArr
}