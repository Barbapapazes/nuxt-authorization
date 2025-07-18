# Nuxt Authorization

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![pkg.pr.new](https://pkg.pr.new/badge/Barbapapazes/nuxt-authorization)](https://pkg.pr.new/~/Barbapapazes/nuxt-authorization)

Handle authorization with ease in both Nuxt and Nitro.

_This module does not implement ACL or RBAC. It provides low-level primitives that you can use to implement your own authorization logic._

> [!NOTE]
> In the future, this module could be available as a Nitro module and a Nuxt module, but Nitro module are not yet ready.

To learn more about this module and which problem it solves, checkout my blog post about [Authorization in Nuxt](https://soubiran.dev/posts/nuxt-going-full-stack-how-to-handle-authorization).

## Features

- ⛰ &nbsp;Works on both the client (Nuxt) and the server (Nitro)
- 🌟 &nbsp;Write abilities once and use them everywhere
- 👨‍👩‍👧‍👦 &nbsp;Agnostic of the authentication layer
- 🫸 &nbsp;Use components to conditionally show part of the UI
- 💧 &nbsp;Primitives are can be accessed for a full customization

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-authorization
```

That's it! You can now use the module in your Nuxt app ✨

## Documentation

> [!NOTE]
> You can take a look at the playground to see the module in action.

### Setup

Before using the module and defining your first ability, you need to provide 2 resolvers. These functions are used internally to retrieve the user but you must implement them. This allows the module to be agnostic of the authentication layer.

For the Nuxt app, create a new plugin in `plugins/authorization-resolver.ts`:

```ts
export default defineNuxtPlugin({
  name: 'authorization-resolver',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => {
            // Your logic to retrieve the user from the client
          },
        },
      },
    }
  },
})
```

This function is called every time you check for authorization on the client. It should return the user object or `null` if the user is not authenticated. It can by async.

For the Nitro server, create a new plugin in `server/plugins/authorization-resolver.ts`:

```ts
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    event.context.$authorization = {
      resolveServerUser: () => {
        // Your logic to retrieve the user from the server
      },
    }
  })
})
```

> [!NOTE]
> Read more about the [`event.context`](https://h3.unjs.io/guide/event#eventcontext)

This resolver is setup within the hook `request` and receive the event. You can use it to retrieve the user from the session or the request. It should return the user object or `null` if the user is not authenticated. It can by async.

Generally, you use a plugin to fetch the user when the app starts and then store it. Resolver functions should only return the stored user and not fetch it again (otherwise, you could have severe performance issues).

#### Example with `nuxt-auth-utils`

The module `nuxt-auth-utils` provides an authentication layer for Nuxt. If you use this module, you can use the following resolvers:

Nuxt plugin:

```ts
export default defineNuxtPlugin({
  name: 'authorization-resolver',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => useUserSession().user.value,
        },
      },
    }
  },
})
```

Nitro plugin:

```ts
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    event.context.$authorization = {
      resolveServerUser: async () => {
        const session = await getUserSession(event)
        return session.user ?? null
      },
    }
  })
})
```

Easy!

### Define Abilities

> [!NOTE]
> With Nuxt 4, a new `shared` directory will be introduced to easily share code between the client and the server.
> See [the video from Alexander Lichter](https://youtu.be/_m5ct5e8nVo?si=2iNcPVMttlIq5fLR).

Now the resolvers are set up, you can define your first ability. An ability is a function that takes at least the user, and returns a boolean to indicate if the user can perform the action. It can also take additional arguments.

I recommend to create a new file `shared/utils/abilities.ts` to create your abilities:

```ts
export const listPosts = defineAbility(() => true) // Only authenticated users can list posts

export const editPost = defineAbility((user: User, post: Post) => {
  return user.id === post.authorId
})
```

If you have many abilities, you could prefer to create a directory `shared/utils/abilities/` and create a file for each ability. Having the abilities in the `shared/utils` directory allows auto-import to work in the client while having a simple import in the server `~~/shared/utils/abilities`. **Remember that the shared folder only exports the first level of the directory.** So you have to export the abilities in the `shared/utils/abilities/index.ts` file.

By default, guests are not allowed to perform any action and the ability is not called. This behavior can be changed per ability:

```ts
export const listPosts = defineAbility({ allowGuest: true }, (user: User | null) => true)
```

Now, unauthenticated users can list posts.

### Use Abilities

To use ability, you have access to 3 bouncer functions: `allows`, `denies`, and `authorize`. Both of them are available in the client and the server. _The implementation is different but the API is (nearly) the same and it's entirely transparent the developer. On the server, the first parameter is the `event` from the handler._

The `allows` function returns a boolean if the user can perform the action:

```ts
if (await allows(listPosts)) {
  // User can list posts
}
```

_For the server:_

```ts
if (await allows(event, listPosts)) {
  // User can list posts
}
```

The `denies` function returns a boolean if the user cannot perform the action:

```ts
if (await denies(editPost, post)) {
  // User cannot edit the post
}
```

_For the server:_

```ts
if (await denies(event, editPost, post)) {
  // User cannot edit the post
}
```

The `authorize` function throws an error if the user cannot perform the action:

```ts
await authorize(editPost, post)

// User can edit the post
```

_For the server:_

```ts
await authorize(event, editPost, post)
```

You can customize the error message and the status code per return value of the ability. This can be useful to return a 404 instead of a 403 to keep the user unaware of the existence of the resource.

```ts
export const editPost = defineAbility((user: User, post: Post) => {
  if(user.id === post.authorId) {
    return true // or allow()
  }

  return deny('This post does not exist', 404)
})
```

`allow` and `deny` are similar to returning `true` and `false` but `deny` allows to return a custom message and status code for the error.

Most of the times, you API endpoints will use the `authorize`. This can be the first line of the endpoint if no parameters are needed or after a database query to check if the user can access the resource. You do not need to catch the error since it's a `H3Error` and will be caught by the Nitro server.

The `allows` and `denies` functions are useful in the client to perform conditional rendering or logic. You can also use them to have a fine-grained control on you authorization logic.

### Use Components

The module provides 2 components help you to conditionally show part of the UI. Imagine you have a button to edit a post, unauthorized users should not see the button.

```vue
<template>
  <Can
    :ability="editPost"
    :args="[post]" // Optional if the ability does not take any arguments
  >
    <button>Edit</button>
  </Can>
</template>
```

The `Can` component will render the button only if the user can edit the post. If the user cannot edit the post, the button will not be rendered.

As a counterpart, you can use the `Cannot` component to render the button only if the user cannot edit the post.

```vue
<template>
  <Cannot
    :ability="editPost"
    :args="[post]" // Optional if the ability does not take any arguments
  >
    <p>You're not allowed to edit the post.</p>
  </Cannot>
</template>
```

The `Bouncer` component offers a more flexible and centralized way to handle both can and cannot scenarios within a single component. Instead of using separate `Can` and `Cannot` components, you can leverage the Bouncer component and its [named slots](https://vuejs.org/guide/components/slots.html#named-slots) to handle both states in a unified block.

```vue
<Bouncer
  :ability="editPost"
  :args="[post]" // Optional if the ability does not take any arguments
>
  <template #can>
    <button>Edit</button>
  </template>

  <template #cannot>
    <p>You're not allowed to edit the post.</p>
  </template>
</Bouncer>
```

All of these components accept a prop named `as` to define the HTML tag to render. By default, it's a renderless component.

```vue
<Can
  :ability="editPost"
  :args="[post]"
  as="div"
>
  <button>Edit</button>
</Can>
```

This will render:

```html
<div>
  <button>Edit</button>
</div>
```

Instead of:

```html
<button>Edit</button>
```

#### Multiple abilities

If you possess multiple abilities, you can provide an array of abilities to the components. The component will render only if **all** of the abilities **match** the specified requirements of the component.

```vue
<Can :ability="[editPost, deletePost]" :args="[[post], [post]]" />

<Cannot :ability="[editPost, deletePost]" :args="[[post], [post]]" />

<Bouncer :ability="[editPost, deletePost]" :args="[[post], [post]]">
  <template #can>
    <button>Edit</button>
    <button>Delete</button>
  </template>

  <template #cannot>
    <p>You're not allowed to edit or delete the post.</p>
  </template>
</Bouncer>
```

## Contribution

<details>
  <summary>Local development</summary>

  ```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
  ```

</details>

## Credits

This module, both code and design, is heavily inspired by the [Adonis Bouncer](https://docs.adonisjs.com/guides/security/authorization). It's a well written package and I think reinventing the wheel every time is unnecessary.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-authorization/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-authorization

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-authorization.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-authorization

[license-src]: https://img.shields.io/npm/l/nuxt-authorization.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-authorization

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
