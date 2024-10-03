declare module '#app' {
  interface NuxtApp {
    $authorization: {
      resolveClientUser: <User extends Record<string, any>>() => Promise<User | null>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $authorization: {
      resolveClientUser: <User extends Record<string, any>>() => Promise<User | null>
    }
  }
}

declare module 'h3' {
  interface H3EventContext {
    $authorization: {
      resolveServerUser: <User extends Record<string, any>>() => Promise<User | null>
    }
  }
}

export {}
