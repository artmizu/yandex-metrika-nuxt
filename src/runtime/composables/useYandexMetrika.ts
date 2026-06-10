import type { MetrikaModuleParams } from '../type'
import { useRuntimeConfig, useState } from '#app'
import { isEnabled } from '../utils'

export function useYandexMetrika(value?: boolean) {
  const config = useRuntimeConfig().public.yandexMetrika as Partial<MetrikaModuleParams>
  const enabled = useState<boolean>('yandex-metrika-enabled', () => isEnabled(config))

  if (typeof value === 'boolean')
    enabled.value = value

  return {
    enabled,
    setEnabled: (nextValue: boolean) => {
      enabled.value = nextValue
    },
    enable: () => {
      enabled.value = true
    },
    disable: () => {
      enabled.value = false
    },
  }
}
