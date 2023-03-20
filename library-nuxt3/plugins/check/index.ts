import { defineNuxtPlugin } from '#app'
import checkSpecialCharacters from '@/plugins/check/check-special-characters'
import { checkByte, calcByte, ByteScopeType } from '@/plugins/check/check-byte'
import checkHttpProtocol from '@/plugins/check/checkHttpProtocol'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      checkSpecialCharacters: (text: string) => checkSpecialCharacters(text),
      calcByte: (text: string) => calcByte(text),
      checkByte: (text: string, length: number, scope: ByteScopeType) => checkByte(text, length, scope),
      checkHttpProtocol: (url: string) => checkHttpProtocol(url)
    }
  }
})
