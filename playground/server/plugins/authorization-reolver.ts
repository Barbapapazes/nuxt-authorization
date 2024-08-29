import type { User } from '~/types/user'

export default defineNitroPlugin((nitroApp) => {
  // https://github.com/nuxt/nuxt/issues/25710#issuecomment-1935622896
  nitroApp.hooks.hook('request', async (event) => {
    event.context.$authorization = {
      resolveServerUser: () => {
        return { id: 1, name: 'User 1' } satisfies User
      },
    }
  })
})
