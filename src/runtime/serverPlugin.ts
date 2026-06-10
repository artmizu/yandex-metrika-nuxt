import type { MetaObject } from '@nuxt/schema'
import type { MetrikaModuleParams } from '../runtime/type'
import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'
import { isEnabled } from './utils'

export default defineNuxtPlugin(() => {
  const moduleOptions = useRuntimeConfig().public.yandexMetrika
  if (!isEnabled(moduleOptions))
    return

  if (!isValid(moduleOptions)) {
    // eslint-disable-next-line no-console
    console.log('[yandex.metrika] module cannot be initialized, please specify ID')
    return
  }

  if (import.meta.client) {
    injectClientScripts(moduleOptions)
    return
  }

  const meta: MetaObject = {}
  // setting up script tag
  meta.script = meta.script || []
  meta.script.push({
    id: 'metrika',
    innerHTML: getLoaderScriptTag(moduleOptions),
  })
  meta.script.push({
    id: 'metrika-init',
    innerHTML: getInitScriptTag(moduleOptions),
  })

  // setting up no-script tag
  if (moduleOptions.noscript) {
    meta.noscript = meta.noscript || []
    meta.noscript.unshift({
      innerHTML: getNoscript(moduleOptions.id),
    })
  }

  useHead(meta)
})

function isValid(options: Partial<MetrikaModuleParams>): options is MetrikaModuleParams {
  return !!options.id
}

function getLoaderScriptTag(options: MetrikaModuleParams) {
  const libURL = options.useCDN
    ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
    : 'https://mc.yandex.ru/metrika/tag.js'

  return `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','${libURL}','ym');`.trim()
}

function getInitScriptTag(options: MetrikaModuleParams) {
  const metrikaContent = `
    ym("${options.id}", "init", ${JSON.stringify(options.initParams)});
  `
  return metrikaContent.trim()
}

function injectClientScripts(options: MetrikaModuleParams) {
  const script = document.createElement('script')
  script.id = 'metrika'
  script.textContent = getLoaderScriptTag(options)
  document.head.prepend(script)

  window.ym(options.id, 'init', options.initParams)
}

function getNoscript(id: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`
}
