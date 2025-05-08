const char: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export const summValue = (index: number) => {
  let sum = 0
  for (let i = index; i > 0; i--) {
    sum += 26 ** i
  }
  return sum - 1
}

export const replaceTokenByCode = (num: number) => {
  let result: string = '';

  num++
  while (num > 0) {
    num--; // Корректировка для нумерации с 0
    const remainder: number = num % 26;
    result = char[remainder] + result;
    num = Math.floor(num / 26);
  }

  return result + "|";
}

export const splitCodedText = (text: string) => {
  return text.split("|")
}

export const replaceCodeByTokenIndex = (code: string) => {
  const codeArr = code.split("")
  const indexArrReverse = codeArr.map((element) => char.indexOf(element)).reverse()
  const correctCharindexArrReverse = indexArrReverse.map((element) => element + 1)
  let sum = 0
  for (let i = 0; i < correctCharindexArrReverse.length; i++) {
    if (i === 0) {
      sum += correctCharindexArrReverse[0]
    } else {
      sum += correctCharindexArrReverse[i] * Math.pow(26, i)
    }
  }
  return sum - 1
}



