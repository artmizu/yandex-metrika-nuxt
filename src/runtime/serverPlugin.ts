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
    id: 'metrika-init',
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
  const metrikaContent = `
    ym("${options.id}", "init", ${JSON.stringify(options.initParams)});
  `
  return metrikaContent.trim()
}

function getNoscript(id: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`
}
