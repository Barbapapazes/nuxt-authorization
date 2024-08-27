import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'authorization-resolver',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => ({ id: 2, name: 'User 1' }),
        },
      },
    }
  },
})
