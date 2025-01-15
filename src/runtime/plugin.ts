import type { ActionParams, SubParams, VisitorParams } from './global'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const id: string = useRuntimeConfig().public.yandexMetrika.id
  const router = useRouter()

  router.afterEach((to) => {
    window.ym(id, 'hit', to.fullPath)
  })

  return {
    provide: {
      metrika: {
        hit: (url: string, options?: SubParams) => {
          window.ym(id, 'hit', url, options)
        },
        reachGoal: (target: string, params?: ActionParams, callback?: () => void, ctx?: any) => {
          window.ym(id, 'reachGoal', target, params, callback, ctx)
        },
        userParams: (params: VisitorParams) => {
          window.ym(id, 'userParams', params)
        },
        experiments: (experiments: string) => {
          window.ym(id, 'experiments', experiments)
        },
      },
    },
  }
})
