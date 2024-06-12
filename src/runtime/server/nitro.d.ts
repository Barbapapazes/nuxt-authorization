import type { H3Event } from 'h3'

declare module 'nitropack' {
  interface NitroApp {
    $authorization: {
      resolveServerUser: (event: H3Event) => Promise<object | null>
    }
  }
}

export {}
