import { defineNuxtPlugin } from '#app'

interface Cookie {
  name: string
  value: any
}

/**
 * 쿠키 맵핑하여 가져오기
 * @param cookie
 */
const cookies = (cookie?: string): Cookie[] => {
  const calcTarget = cookie || document.cookie

  return calcTarget.split(';').map(cookie => {
    const cookieSplit = cookie.split('=')

    return {
      name: cookieSplit[0].replace(' ', ''),
      value: cookieSplit[1]
    }
  })
}

/**
 * 쿠키 가져오기
 * @param cookieName
 * @param cookie
 */
export const getCookie = (cookieName: string, cookie?: string): any => {
  const findTarget = cookie ? cookies(cookie) : cookies()
  return findTarget.find(cookie => cookie.name === cookieName)?.value
}

/**
 * 쿠키 설정하기
 * @param name
 * @param value
 * @param days
 */
export const setCookie = (name: string, value: any, days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 1000 * 60 * 60 * 24)
  document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`
}

/**
 * 쿠키 삭제
 * @param name
 */
export const deleteCookie = (name: string) => {
  const date = new Date()
  document.cookie = `${name}= ;expires=${date.toUTCString()};path=/`
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getCookie: (name: string, cookie?: string) => getCookie(name, cookie),
      setCookie: (name: string, value: any, days: number) => setCookie(name, value, days),
      deleteCookie: (name: string) => deleteCookie(name)
    }
  }
})
