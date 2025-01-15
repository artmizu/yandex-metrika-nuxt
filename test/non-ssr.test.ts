import { fileURLToPath } from 'node:url'
import { createPage, setup, useTestContext } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('non-ssr mode tests', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    browser: true,
    nuxtConfig: {
      ssr: false, // This part is tested
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

  it('should register serverPlugin in client mode ', () => {
    const { nuxt } = useTestContext()
    const serverPluginIndex = nuxt?.options.plugins.findIndex((plugin) => {
      if (typeof plugin !== 'string' && plugin.src.includes('serverPlugin') && plugin.mode === 'client')
        return true
      return false
    })
    expect(serverPluginIndex).toBeGreaterThan(-1)
  })

  it('goal is reached and page hit after navigation is worked in non srr mode', async () => {
    const page = await createPage('/?_ym_debug=1')
    const logs: string[] = []
    const { url } = useTestContext()
    page.on('console', msg => logs.push(msg.text()))

    await page.waitForEvent('console')
    await page.waitForEvent('console')
    await page.waitForEvent('console')
    await page.waitForEvent('console')

    expect(logs).toContain(`PageView. Counter 49439650. URL: ${url || ''}?_ym_debug=1. Referrer: `)
    expect(logs).toContain('Form goal. Counter 49439650. Init.')
    expect(logs).toContain('PageView. Counter 49439650. URL: /?_ym_debug=1. Referrer: ')
    expect(logs).toContain('Reach goal. Counter: 49439650. Goal id: zzz')

    const toAPage = page.waitForEvent('console')
    await page.click('#a')
    await toAPage
    expect(logs[4]).toEqual('PageView. Counter 49439650. URL: /a. Referrer: /?_ym_debug=1')

    const toBPage = page.click('#b')
    await page.waitForEvent('console')
    await toBPage
    expect(logs[5]).toEqual('PageView. Counter 49439650. URL: /b. Referrer: /a')
  }, { timeout: 15000 })
})
