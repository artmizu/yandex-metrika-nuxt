import { resolve } from 'node:path'
import { defu } from 'defu'
import { addPlugin, createResolver, defineNuxtModule, logger } from '@nuxt/kit'
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
  async setup(options, nuxt) {
    const moduleOptions: MetrikaModuleParams = defu(
      nuxt.options.runtimeConfig.public.yandexMetrika,
      options,
    )
    nuxt.options.runtimeConfig.public.yandexMetrika = moduleOptions

    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(await resolver.resolve('./runtime'))

    if (!nuxt.options.dev && ['production', 'test'].includes(process.env.NODE_ENV!)) {
      if (!isValid(moduleOptions)) {
        logger.info('[yandex.metrika] module cannot be initialized, please specify ID')
        return
      }

      // setting up script tag
      nuxt.options.app.head.script = nuxt.options.app.head.script || []
      nuxt.options.app.head.script.unshift({
        id: 'metrika',
        innerHTML: getScriptTag(moduleOptions),
      })

      // setting up no-script tag
      nuxt.options.app.head.noscript = nuxt.options.app.head.noscript || []
      nuxt.options.app.head.noscript.unshift({
        innerHTML: getNoscript(moduleOptions.id),
      })

      addPlugin({ src: resolve(__dirname, './runtime/plugin'), mode: 'client' })
    }
    else if (options.verbose === true) {
      addPlugin({ src: resolve(__dirname, './runtime/plugin-dev'), mode: 'client' })
    }
  },
})

function isValid(options: Partial<MetrikaModuleParams>): options is MetrikaModuleParams {
  return !!options.id
}

function getScriptTag(options: MetrikaModuleParams) {
  const libURL = !options.useCDN ? 'https://mc.yandex.ru/metrika/tag.js' : 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
  const metrikaContent = `
    (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "${libURL}", "ym");
    ym("${options.id}", "init", ${JSON.stringify(options.initParams)});
  `
  return metrikaContent.trim()
}

function getNoscript(id: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`
}

export default module
