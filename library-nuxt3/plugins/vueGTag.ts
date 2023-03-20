import VueGtag from 'vue-gtag-next'
import { defineNuxtPlugin } from '#app'
import { useRuntimeConfig } from '#imports'



export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: config.public.GOOGLE_APP_KEY
    },
    appName: 'LM NOVA',
    pageTrackerScreenviewEnabled: true
  }, nuxtApp.vueApp.router)
})
