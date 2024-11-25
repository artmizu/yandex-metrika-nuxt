declare global {
  interface Window {
    ym: {
      (id: string, action: 'hit', url: string, options?: SubParams): void;
      (id: string, action: 'reachGoal', target: string, params?: ActionParams, callback?: ()=> void, ctx?: any): void;
      (id: string, action: "userParams", params: VisitorParams): void;
      (id: string, action: "experiments", experiments: string): void;
    }
  }
}

export type VisitorParams = {
  [key: string]: any;
}

interface Metrika {
  hit: (url: string, options?: SubParams) => void
  reachGoal: (target: string, params?: ActionParams, callback?: () => void, ctx?: any) => void
  userParams: (params: VisitorParams) => void
  experiments: (experiments: string) => void
}

export declare interface ActionParams {
  order_price?:number,
  currency?: string
}

export declare interface SubParams {
  callback?: ()=>void,
  ctx?: any,
  params?: ActionParams,
  referer?: string,
  title?: string
}

declare module '#app' {
  interface NuxtApp {
    $metrika: Metrika
  }
}

export { }
