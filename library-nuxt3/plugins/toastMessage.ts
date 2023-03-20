import { defineNuxtPlugin } from '#app'

export const toastMessage = (message: string) => {
  const selector = {
    toastMessageContainer: 'toast-message-container'
  }

  let toastMessageContainer = document.querySelector(`.${selector.toastMessageContainer}`)

  // 1. create toast message container
  if (!toastMessageContainer) {
    toastMessageContainer = document.createElement('div')
    toastMessageContainer.classList.add(selector.toastMessageContainer)
    document.body.appendChild(toastMessageContainer)
  }

  // 2. create toast message box
  const toastMessageBox = document.createElement('div')
  toastMessageBox.classList.add('toast-message-box')
  toastMessageBox.innerText = message

  toastMessageContainer.appendChild(toastMessageBox)

  setTimeout(() => {
    toastMessageBox.classList.add('on')
  }, 100)

  setTimeout(() => {
    toastMessageBox.classList.remove('on')
    toastMessageBox.classList.add('leave')
  }, 3000)

  setTimeout(() => {
    toastMessageBox.remove()
  }, 3300)
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toastMessage: (message: string) => toastMessage(message)
    }
  }
})
