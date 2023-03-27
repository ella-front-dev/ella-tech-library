import { defineNuxtPlugin } from '#app'
import { createVfm } from 'vue-final-modal'

export default defineNuxtPlugin(nuxtApp => {
  const vfm= createVfm() as any
  nuxtApp.vueApp.use(vfm)
  // nuxtApp.vueApp.use(vfmPlugin({
  //   key: '$vfm',
  //   componentName: 'VueFinalModal',
  //   dynamicContainerName: 'ModalsContainer'
  // }))
})
