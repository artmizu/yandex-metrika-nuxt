declare global {
  interface Window {
    ym: (id: string, action: string, value: string, opts?: { referer: string }) => void
  }
}

interface Metrika {
  reachGoal: (identifyer: string) => void
  hit: (url: string) => void
}

declare module '#app' {
  interface NuxtApp {
    $metrika: Metrika
  }
}

export { }