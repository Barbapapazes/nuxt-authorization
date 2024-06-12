import type { User } from '~/types/user'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.$authorization = {
    resolveServerUser: () => {
      return { id: 2, name: 'User 1' } satisfies User
    },
  }
})
