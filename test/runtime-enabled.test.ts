import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils'
import { afterAll, describe, expect, it } from 'vitest'

describe('runtime enabled config tests', async () => {
  const originalEnabled = import.meta.env.NUXT_PUBLIC_YANDEX_METRIKA_ENABLED
  import.meta.env.NUXT_PUBLIC_YANDEX_METRIKA_ENABLED = 'false'

  afterAll(() => {
    import.meta.env.NUXT_PUBLIC_YANDEX_METRIKA_ENABLED = originalEnabled
  })

  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    nuxtConfig: {
      runtimeConfig: {
        public: {
          yandexMetrika: {
            enabled: true,
          },
        },
      },
      yandexMetrika: {
        id: '49439650',
        noscript: true,
      },
    },
  })

  it('does not inject scripts when disabled by runtime config', async () => {
    const page = await $fetch('/')
    expect(page).not.toContain('ym("49439650", "init",')
    expect(page).not.toContain('https://mc.yandex.ru/metrika/tag.js')
    expect(page).not.toContain('https://mc.yandex.ru/watch/49439650')
  })
})
