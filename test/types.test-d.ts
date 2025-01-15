import type { NuxtConfig } from 'nuxt/config'
import type { MetrikaModuleParams } from '../src/runtime/type'
import { expectTypeOf, test } from 'vitest'

/**
 * Generation of type NuxtConfig['yandexMetrika'] is laying on the nuxt side, so we can't adjust it properly
 */
test('check module types', () => {
  expectTypeOf<NuxtConfig['yandexMetrika']>().toMatchTypeOf<Partial<MetrikaModuleParams> | undefined>()
})
