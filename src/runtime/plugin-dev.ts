import consola from 'consola'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      metrika: {
        reachGoal: (identifyer: string) => {
          consola.info(`[yandex.metrika] reach goal "${identifyer}" on dev`)
        },
        hit: (url: string) => {
          consola.info(`[yandex.metrika] hit on "${url}" on dev`)
        },
      },
    },
  }
})
