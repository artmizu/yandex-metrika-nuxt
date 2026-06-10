import type { MetrikaModuleParams } from './type'

export function isEnabled(options: Partial<MetrikaModuleParams>) {
  return options.enabled !== false && options.enabled !== 'false'
}
