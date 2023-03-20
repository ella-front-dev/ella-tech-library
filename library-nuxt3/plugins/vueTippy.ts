import { defineNuxtPlugin } from '#app'
import VueTippy from 'vue-tippy'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueTippy, {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'bottom-start',
      allowHTML: true,
      zIndex: 10
    }
  })
})
