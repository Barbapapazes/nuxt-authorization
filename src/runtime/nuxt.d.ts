declare module '#app' {
  interface NuxtApp {
    $authorization: {
      resolveClientUser: () => Promise<any>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $authorization: {
      resolveClientUser: () => Promise<any>
    }
  }
}

export {}
