import type { ActionParams, SubParams, VisitorParams } from './global'
import { defineNuxtPlugin } from '#app'
import { consola } from 'consola/browser'
import { useYandexMetrika } from './composables/useYandexMetrika'

export default defineNuxtPlugin(() => {
  const { enabled } = useYandexMetrika()

  return {
    provide: {
      metrika: {
        hit: (url: string, options?: SubParams) => {
          if (!enabled.value)
            return

          consola.info(`[yandex.metrika] hit on "${url}" on dev`)
          if (options)
            consola.info(`[yandex.metrika] hit options: ${JSON.stringify(options)} on dev`)
        },
        reachGoal: (target: string, _params?: ActionParams, _callback?: () => void, _ctx?: any) => {
          if (!enabled.value)
            return

          consola.info(`[yandex.metrika] reach goal "${target}" on dev`)
        },
        userParams: (params: VisitorParams) => {
          if (!enabled.value)
            return

          const paramsStr = JSON.stringify(params)
          consola.info(`[yandex.metrika] handle user params: ${paramsStr} on dev`)
        },
        experiments: (experiments: string) => {
          if (!enabled.value)
            return

          consola.info(`[yandex.metrika] handle user params: ${experiments} on dev`)
        },
      },
    },
  }
})
