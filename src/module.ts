import { resolve } from 'node:path'
import { defu } from 'defu'
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from 'nuxt/schema'
import { name, version } from '../package.json'
import type { MetrikaModuleParams } from './runtime/type'

interface RuntimeConfig {
  yandexMetrika: Pick<MetrikaModuleParams, 'id'>
}

export interface ModuleOptions extends MetrikaModuleParams { }
export interface ModulePublicRuntimeConfig extends RuntimeConfig { }

// immediate return via export default brings the build errors
const module: NuxtModule<Omit<MetrikaModuleParams, 'id'>> = defineNuxtModule<Omit<MetrikaModuleParams, 'id'>>({
  meta: {
    name,
    version,
    configKey: 'yandexMetrika',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
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
    const moduleOptions: MetrikaModuleParams = defu(
      nuxt.options.runtimeConfig.public.yandexMetrika,
      options,
    )
    nuxt.options.runtimeConfig.public.yandexMetrika = moduleOptions

    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    addPlugin({ src: resolve(__dirname, './runtime/serverPlugin'), mode: 'server' })

    if (!nuxt.options.dev && ['production', 'test'].includes(process.env.NODE_ENV!))
      addPlugin({ src: resolve(__dirname, './runtime/plugin'), mode: 'client' })

    else if (options.verbose === true)
      addPlugin({ src: resolve(__dirname, './runtime/plugin-dev'), mode: 'client' })
  },
})

export default module
