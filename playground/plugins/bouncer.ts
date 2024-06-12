import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'bouncer',
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
