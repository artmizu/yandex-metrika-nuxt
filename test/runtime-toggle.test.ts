import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('runtime toggle tests', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    browser: true,
    nuxtConfig: {
      yandexMetrika: {
        id: '49439650',
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

  it('stops and resumes dispatching metrika calls at runtime', async () => {
    const page = await createPage('/toggle?_ym_debug=1')
    const logs: string[] = []
    page.on('console', msg => logs.push(msg.text()))

    await waitForLog(logs, 'PageView. Counter 49439650. URL: /toggle?_ym_debug=1. Referrer: ')

    await page.click('#toggle-goal')
    await waitForLog(logs, 'Reach goal. Counter: 49439650. Goal id: toggle-goal')

    await page.click('#disable-metrika')
    const disabledLogCount = logs.length
    await page.click('#toggle-goal')
    await page.click('#a')
    await page.waitForURL('**/a')
    await page.waitForTimeout(500)
    expect(logs).toHaveLength(disabledLogCount)

    await page.goBack()
    await page.waitForURL('**/toggle?_ym_debug=1')
    await page.click('#enable-metrika')
    await page.click('#b')
    await waitForLog(logs, 'PageView. Counter 49439650. URL: /b. Referrer: /toggle?_ym_debug=1')
  }, 15000)
})

async function waitForLog(logs: string[], expected: string) {
  for (let i = 0; i < 50; i++) {
    if (logs.includes(expected))
      return

    await new Promise(resolve => setTimeout(resolve, 100))
  }

  expect(logs).toContain(expected)
}
