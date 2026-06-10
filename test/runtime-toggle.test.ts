import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

declare global {
  interface Window {
    __ymCalls: unknown[][]
  }
}

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
    await page.waitForFunction(() => typeof window.ym === 'function')
    await page.evaluate(() => {
      const originalYm = window.ym
      window.__ymCalls = []
      window.ym = ((...args: Parameters<typeof window.ym>) => {
        window.__ymCalls.push(args)
        originalYm(...args)
      }) as typeof window.ym
    })

    await page.click('#toggle-goal')
    await waitForYmCall(page, ['49439650', 'reachGoal', 'toggle-goal'])

    await page.click('#disable-metrika')
    const disabledCallCount = await getYmCallsCount(page)
    await page.click('#toggle-goal')
    await page.click('#a')
    await page.waitForURL('**/a')
    await page.waitForTimeout(500)
    expect(await getYmCallsCount(page)).toBe(disabledCallCount)

    await page.goBack()
    await page.waitForURL('**/toggle?_ym_debug=1')
    await page.click('#enable-metrika')
    await page.click('#b')
    await waitForYmCall(page, ['49439650', 'hit', '/b'])
  }, 30000)
})

async function getYmCallsCount(page: Awaited<ReturnType<typeof createPage>>) {
  return await page.evaluate(() => window.__ymCalls.length)
}

async function waitForYmCall(page: Awaited<ReturnType<typeof createPage>>, expected: unknown[]) {
  for (let i = 0; i < 50; i++) {
    const hasCall = await page.evaluate((expected) => {
      return window.__ymCalls.some(call => expected.every((value, index) => call[index] === value))
    }, expected)

    if (hasCall)
      return

    await new Promise(resolve => setTimeout(resolve, 100))
  }

  expect(await page.evaluate(() => window.__ymCalls)).toContainEqual(expect.arrayContaining(expected))
}
