import consola from 'consola/src/browser'
import type { ActionParams, SubParams, VisitorParams } from './global'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      metrika: {
        hit: (url: string, options?: SubParams) => {
          consola.info(`[yandex.metrika] hit on "${url}" on dev`)
          if (options)
            consola.info(`[yandex.metrika] hit options: ${JSON.stringify(options)} on dev`)
        },
        reachGoal: (target: string, _params?: ActionParams, _callback?: () => void, _ctx?: any) => {
          consola.info(`[yandex.metrika] reach goal "${target}" on dev`)
        },
        userParams: (params: VisitorParams) => {
          const paramsStr = JSON.stringify(params)
          consola.info(`[yandex.metrika] handle user params: ${paramsStr} on dev`)
        },
        experiments: (experiments: string) => {
          consola.info(`[yandex.metrika] handle user params: ${experiments} on dev`)
        },
      },
    },
  }
})
