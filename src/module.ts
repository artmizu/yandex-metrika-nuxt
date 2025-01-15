import type { NuxtPlugin } from 'nuxt/schema'
import type { MetrikaModuleParams } from './runtime/type'
import { resolve } from 'node:path'
import process from 'node:process'
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'

export interface ModuleOptions extends MetrikaModuleParams { }

export interface ModulePublicRuntimeConfig {
  yandexMetrika: Pick<MetrikaModuleParams, 'id'>
}

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'yandexMetrika',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    id: '',
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
    const moduleOptions = defu(
      nuxt.options.runtimeConfig.public.yandexMetrika,
      options,
    )
    nuxt.options.runtimeConfig.public.yandexMetrika = moduleOptions

    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    if (!nuxt.options.dev && ['production', 'test'].includes(process.env.NODE_ENV!)) {
      // setting up script tag without initializing
      nuxt.options.app.head.script = nuxt.options.app.head.script || []
      nuxt.options.app.head.script.unshift({
        id: 'metrika',
        innerHTML: getScriptTag(moduleOptions),
      })

      const headPluginMode: NuxtPlugin['mode'] = nuxt.options.ssr ? 'server' : 'client'
      addPlugin({ src: resolve(__dirname, './runtime/serverPlugin'), mode: headPluginMode })
      addPlugin({ src: resolve(__dirname, './runtime/plugin'), mode: 'client' })
    }
    else if (options.verbose === true) {
      addPlugin({ src: resolve(__dirname, './runtime/plugin-dev'), mode: 'client' })
    }
  },
})

function getScriptTag(options: MetrikaModuleParams) {
  const libURL = !options.useCDN ? 'https://mc.yandex.ru/metrika/tag.js' : 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
  const metrikaContent = `
    (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "${libURL}", "ym");
  `
  return metrikaContent.trim()
}
