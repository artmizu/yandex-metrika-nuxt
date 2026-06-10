import type { ActionParams, SubParams, VisitorParams } from './global'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'
import { useYandexMetrika } from './composables/useYandexMetrika'

export default defineNuxtPlugin(() => {
  const id: string = useRuntimeConfig().public.yandexMetrika.id
  const router = useRouter()
  const { enabled } = useYandexMetrika()

  router.afterEach((to) => {
    if (!enabled.value)
      return

    window.ym(id, 'hit', to.fullPath)
  })

  return {
    provide: {
      metrika: {
        hit: (url: string, options?: SubParams) => {
          if (!enabled.value)
            return

          window.ym(id, 'hit', url, options)
        },
        reachGoal: (target: string, params?: ActionParams, callback?: () => void, ctx?: any) => {
          if (!enabled.value)
            return

          window.ym(id, 'reachGoal', target, params, callback, ctx)
        },
        userParams: (params: VisitorParams) => {
          if (!enabled.value)
            return

          window.ym(id, 'userParams', params)
        },
        experiments: (experiments: string) => {
          if (!enabled.value)
            return

          window.ym(id, 'experiments', experiments)
        },
      },
    },
  }
})
