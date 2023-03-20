import { defineNuxtPlugin } from '#app'

export const copyToClipboard = (message: string) => {
  const el = document.createElement('textarea')

  el.value = message
  el.setAttribute('readonly', '')
  el.style.position = 'fixed'
  el.style.left = '-9999px'
  document.body.appendChild(el)

  const selected =
    document.getSelection()!.rangeCount! > 0
      ? document.getSelection()?.getRangeAt(0)
      : false

  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  if (selected) {
    document.getSelection()?.removeAllRanges()
    document.getSelection()?.addRange(selected)
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      copyToClipboard: (message: string) => copyToClipboard(message)
    }
  }
})
