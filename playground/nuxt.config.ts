import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../'

export default defineNuxtConfig({
  modules: [MyModule],
  runtimeConfig: {
    public: {
      yandexMetrika: {
        id: '', // NUXT_PUBLIC_YANDEX_METRIKA_ID
      },
    },
  },
  yandexMetrika: {
    id: '49439650',
  },
})
