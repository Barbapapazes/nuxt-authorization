declare module 'h3' {
  interface H3EventContext {
    $authorization: {
      resolveServerUser: <User extends Record<string, any>>() => Promise<User | null>
    }
  }
}

export {}
