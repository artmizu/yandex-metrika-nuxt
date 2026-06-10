import type { NuxtConfig } from 'nuxt/config'
import type { Ref } from 'vue'
import type { MetrikaModuleParams } from '../src/runtime/type'
import { expectTypeOf, test } from 'vitest'
import { useYandexMetrika } from '../src/runtime/composables/useYandexMetrika'

/**
 * Generation of type NuxtConfig['yandexMetrika'] is laying on the nuxt side, so we can't adjust it properly
 */
test('check module types', () => {
  expectTypeOf<NuxtConfig['yandexMetrika']>().toMatchTypeOf<Partial<MetrikaModuleParams> | undefined>()
  expectTypeOf<Pick<MetrikaModuleParams, 'enabled'>>().toMatchTypeOf<{ enabled?: boolean | 'true' | 'false' | null }>()
})

test('check composable types', () => {
  const metrika = useYandexMetrika(false)
  expectTypeOf(metrika.enabled).toMatchTypeOf<Ref<boolean>>()
  expectTypeOf(metrika.setEnabled).toMatchTypeOf<(nextValue: boolean) => void>()
  expectTypeOf(metrika.enable).toMatchTypeOf<() => void>()
  expectTypeOf(metrika.disable).toMatchTypeOf<() => void>()
})
