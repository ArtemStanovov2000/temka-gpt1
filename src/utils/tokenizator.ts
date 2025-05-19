import { vocab } from "../data/vocab/vocab"

//словарь символов
const char: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

//Замещает символы текста универсальными токенами
const tokenizator = (text: string, searchWord: string, replaceWord: string) => {
  const regex = new RegExp(searchWord, 'g');
  return text.replace(regex, replaceWord);
}

//Разделяет текст на массив по символу |
const splitCodedText = (text: string) => {
  return text.split("|")
}

//Конвертирует число из 10-ричной в 26-ричную систему
const replaceTokenByCode = (num: number) => {
  let result: string = '';

  num++
  while (num > 0) {
    num--; // Корректировка для нумерации с 0
    const remainder: number = num % char.length;
    result = char[remainder] + result;
    num = Math.floor(num / char.length);
  }

  return result + "|";
}

//Конвертирует 26-ричное число в 10-ричное
const replaceCodeByTokenIndex = (code: string) => {
  const codeArr = code.split("")
  const indexArrReverse = codeArr.map((element) => char.indexOf(element)).reverse()
  const correctCharindexArrReverse = indexArrReverse.map((element) => element + 1)
  let sum = 0
  for (let i = 0; i < correctCharindexArrReverse.length; i++) {
    if (i === 0) {
      sum += correctCharindexArrReverse[0]
    } else {
      sum += correctCharindexArrReverse[i] * Math.pow(char.length, i)
    }
  }
  return sum - 1
}

//замещает пробелы символом _
const replaceSpaces = (str: string) => str.replace(/\s/g, '_')

//Универсальный токенизатор текста
export const tokenizationText = (text: string) => {
  let normalizeText = replaceSpaces(text).toLocaleLowerCase()

  for (let i = 0; i < vocab.length; i++) {
    normalizeText = tokenizator(normalizeText, vocab[i], replaceTokenByCode(i))
  }

  let tokensCodeArr = splitCodedText(normalizeText)

  let tokensArr = []
  for (let i = 0; i < tokensCodeArr.length; i++) {
    tokensArr.push(replaceCodeByTokenIndex(tokensCodeArr[i]))
  }

  tokensArr.pop()

  return tokensArr
}



