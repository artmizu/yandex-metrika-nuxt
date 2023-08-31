import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'

describe('development mode tests', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    browser: true,
    dev: true, // This part is tested
    nuxtConfig: {
      yandexMetrika: {
        id: '49439650',
        noscript: true,
        initParams: {
          defer: false,
          clickmap: false,
          trackLinks: true,
          accurateTrackBounce: false,
          webvisor: false,
          ecommerce: false,
        },
      },
    },
  })

  it('script tag not injected in dev mode', async () => {
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const page = await $fetch('/')
    expect(page).not.toContain('ym("49439650", "init",')
  })
})
