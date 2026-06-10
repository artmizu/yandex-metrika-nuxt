import { fileURLToPath } from 'node:url'
import { $fetch, setup, useTestContext } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('enabled option tests', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    nuxtConfig: {
      yandexMetrika: {
        id: '49439650',
        enabled: false,
        noscript: true,
      },
    },
  })

  it('does not inject scripts or plugins when disabled', async () => {
    const page = await $fetch('/')
    expect(page).not.toContain('ym("49439650", "init",')
    expect(page).not.toContain('https://mc.yandex.ru/metrika/tag.js')
    expect(page).not.toContain('https://mc.yandex.ru/watch/49439650')

    const { nuxt } = useTestContext()
    const pluginSources = nuxt?.options.plugins.map(plugin => typeof plugin === 'string' ? plugin : plugin.src) || []
    expect(pluginSources.some(src => src.includes('src/runtime/serverPlugin'))).toBe(false)
    expect(pluginSources.some(src => src.includes('src/runtime/plugin'))).toBe(false)
  })
})
