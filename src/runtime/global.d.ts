declare global {
  interface Window {
    ym: (id: string, action: string, value: string | object, opts?: { referer: string }) => void
  }
}

interface Metrika {
  reachGoal: (identifyer: string) => void
  hit: (url: string) => void
  userParams: (params: object) => void
}

declare module '#app' {
  interface NuxtApp {
    $metrika: Metrika
  }
}

export { }
