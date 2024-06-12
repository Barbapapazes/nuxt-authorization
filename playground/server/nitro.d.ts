import type { H3Event } from 'h3'

declare module 'nitropack' {
  interface NitroApp {
    $authorization: {
      resolveServerUser: (event: H3Event) => object | null | Promise<object | null>
    }
  }
}

export {}
