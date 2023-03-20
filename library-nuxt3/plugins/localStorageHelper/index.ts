import { defineNuxtPlugin } from '#app'
import { ELocalStorageName } from './types'
import { checkEmpty } from './checkEmpty'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getLocalStorage: (storageName: ELocalStorageName): boolean => {
        if (checkEmpty(storageName)) throw new Error('storage name is not match')
        const result = localStorage.getItem(storageName)
        return result !== null && result !== undefined ? JSON.parse(result) : null
      },
      setLocalStorage: (storageName: ELocalStorageName, data: any): void => {
        if (checkEmpty(storageName)) throw new Error('storage name is not match')
        localStorage.setItem(storageName, JSON.stringify(data))
      },
      deleteLocalStorage: (storageName: ELocalStorageName): void => {
        if (checkEmpty(storageName)) throw new Error('storage name is empty')
        localStorage.removeItem(storageName)
      }
    }
  }
})
