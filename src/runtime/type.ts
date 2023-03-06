export interface MetrikaModuleParams {
  /**
   * Yandex metrika ID
   */
  id: string
  /**
   * Enable noscript tag or disable it
   * @default true
   */
  noscript?: boolean
  /**
   * Do you need download the metrika script from a CDN or not
   * @default false
   */
  useCDN?: boolean
  /**
   * Logs for the dev mode, when certain goals is reached
   * @default true
   */
  verbose?: boolean
  /**
   * This params send to the yandex metrika initializer https://yandex.ru/support/metrica/code/counter-initialize.html
   */
  initParams?: {
    defer?: boolean
    clickmap?: boolean
    trackLinks?: boolean
    accurateTrackBounce?: boolean
    webvisor?: boolean
    ecommerce?: boolean | string | Array<string | boolean>
    trustedDomains?: string[]
    childIframe?: boolean
    type?: number
    triggerEvent?: boolean
  }
}
