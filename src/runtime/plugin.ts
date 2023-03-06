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
        hit: (url: string) => {
          window.ym(id, 'hit', url)
        },
        reachGoal: (identifyer: string) => {
          window.ym(id, 'reachGoal', identifyer)
        },
      },
    },
  }
})
