export type ByteScopeType = 'under' | 'and_under' | 'over' | 'and_over' | 'equal'

export const calcByte = (text: string) => {
  let strCharacter = null
  let intCharCount = 0

  for (let i = 0; i < text.length; i++) {
    strCharacter = text.charAt(i)

    if (encodeURI(strCharacter).length > 4) {
      intCharCount += 2
    } else {
      intCharCount++
    }
  }

  return intCharCount
}

export const checkByte = (text: string, length: number, scope: ByteScopeType) => {
  switch (scope) {
    case 'under':
      return calcByte(text) < length
    case 'and_under':
      return calcByte(text) <= length
    case 'over':
      return calcByte(text) > length
    case 'and_over':
      return calcByte(text) >= length
    case 'equal':
      return calcByte(text) === length
    default:
      throw new Error('check byte required scope of [under, and_under, over, and_over, equal]')
  }
}
