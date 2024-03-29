const mode = process.env.MODE || 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    // public: env[mode],
  },

  components: true,

  modules: [
    '@nuxt/content',
    // [
    //   '@nuxtjs/i18n-edge',
    //   {
    //     defaultLocale: 'ko',
    //     langDir: 'locales/',
    //     locales: [
    //       { code: 'en', file: 'en-US.json' },
    //       { code: 'ko', file: 'ko-KR.json' },
    //     ],
    //     vueI18n: { fallbackLocale: 'ko' },
    //   },
    // ],
    // ['@pinia/nuxt', { autoImports: [['defineStore', 'definePiniaStore']] }],
  ],

  // alias: {
  //   // https://github.com/nuxt/framework/issues/6623
  //   pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  // },

  css: [
    'vue-virtual-scroller/dist/vue-virtual-scroller.css',
    'tippy.js/dist/tippy.css',
    '@/assets/styles/app.scss'
  ],
  vite: {
    plugins: [
      // eslintPlugin()
    ],
  },

  // devServer: {
  //   // host: 'http://localhost',
  //   port: 5000,
  // },

  build: {
    analyze: true,
  },

  // typescript: {
  //   typeCheck: {
  //     eslint: {
  //       files: './**/*.{ts,js,vue}',
  //     },
  //   },
  // },
})