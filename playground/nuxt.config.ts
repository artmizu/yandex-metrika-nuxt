import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../'

export default defineNuxtConfig({
  modules: [MyModule],
  yandexMetrika: {
    id: '49439650',
  },
})
