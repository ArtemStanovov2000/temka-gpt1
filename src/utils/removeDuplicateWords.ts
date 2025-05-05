const start = 0
const end = 200000

export const removeDuplicateWords = (textArr: string[]) => {
    const nonDuplicate: string[] = []
    for (let i = 0; i < textArr.length; i++) {
        if (!nonDuplicate.includes(textArr[i])) {
            nonDuplicate.push(textArr[i])
        }
    }

    /*for (let i = 0; i < 1000; i++) {
        if(!nonDuplicate[i].startsWith("_")) {
            nonDuplicate[i] = "_" + nonDuplicate[i]
        }
    }*/
    return nonDuplicate
}

export const removeDuplicateWordsWithout_ = (textArr: string[]) => {
    const nonDuplicate: string[] = []
    for (let i = 0; i < textArr.length; i++) {
        if (!nonDuplicate.includes(textArr[i])) {
            nonDuplicate.push(textArr[i])
        }
    }
    return nonDuplicate
}