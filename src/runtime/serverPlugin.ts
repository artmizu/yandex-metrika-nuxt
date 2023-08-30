import type { MetaObject } from '@nuxt/schema'
import type { MetrikaModuleParams } from '../runtime/type'
import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const moduleOptions = useRuntimeConfig().public.yandexMetrika
  if (!isValid(moduleOptions)) {
    // eslint-disable-next-line no-console
    console.log('[yandex.metrika] module cannot be initialized, please specify ID')
    return
  }

  const meta: MetaObject = {}
  // setting up script tag
  meta.script = meta.script || []
  meta.script.unshift({
    id: 'metrika',
    innerHTML: getScriptTag(moduleOptions),
  })

  // setting up no-script tag
  meta.noscript = meta.noscript || []
  meta.noscript.unshift({
    innerHTML: getNoscript(moduleOptions.id),
  })

  useHead(meta)
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
