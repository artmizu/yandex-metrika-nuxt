import type { MetrikaModuleParams } from './runtime/type'
import process from 'node:process'
import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { isEnabled } from './runtime/utils'

export interface ModuleOptions extends MetrikaModuleParams { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'yandexMetrika',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  defaults: {
    id: '',
    enabled: true,
    noscript: true,
    useCDN: false,
    verbose: true,
    initParams: {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: true,
    },
  },
  setup(options, nuxt) {
    const moduleOptions = getModuleOptions(
      nuxt.options.runtimeConfig.public.yandexMetrika || {},
      options,
    )
    nuxt.options.runtimeConfig.public.yandexMetrika = moduleOptions

    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))
    addImports({
      name: 'useYandexMetrika',
      from: resolver.resolve('./runtime/composables/useYandexMetrika'),
    })

    if (!isEnabled(moduleOptions))
      return

    if (!nuxt.options.dev && ['production', 'test'].includes(process.env.NODE_ENV!)) {
      addPlugin({ src: resolver.resolve('./runtime/serverPlugin'), mode: nuxt.options.ssr ? 'server' : 'client' })
      addPlugin({ src: resolver.resolve('./runtime/plugin'), mode: 'client' })
    }
    else if (moduleOptions.verbose) {
      addPlugin({ src: resolver.resolve('./runtime/plugin-dev'), mode: 'client' })
    }
  },
})

function getModuleOptions(runtimeOptions: Partial<MetrikaModuleParams>, options: ModuleOptions): MetrikaModuleParams {
  return {
    id: runtimeOptions.id ?? options.id,
    enabled: runtimeOptions.enabled ?? options.enabled,
    noscript: runtimeOptions.noscript ?? options.noscript,
    useCDN: runtimeOptions.useCDN ?? options.useCDN,
    verbose: runtimeOptions.verbose ?? options.verbose,
    initParams: defu(runtimeOptions.initParams, options.initParams),
  }
}
