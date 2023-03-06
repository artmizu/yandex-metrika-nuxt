import { expectTypeOf, test } from 'vitest'
import type { NuxtConfig } from 'nuxt/config'
import type { MetrikaModuleParams } from '../src/runtime/type'

test('check module types', () => {
  expectTypeOf<Partial<MetrikaModuleParams>>().toMatchTypeOf<NuxtConfig['yandexMetrika']>()
})