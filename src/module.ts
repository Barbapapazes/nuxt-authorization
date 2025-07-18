import { defineNuxtModule, createResolver, addImports, addImportsDir, addComponentsDir, addServerImports, addServerImportsDir } from '@nuxt/kit'
import { version } from '../package.json'
import type { ModuleOptions } from './types'

export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-authorization',
    configKey: 'authorization',
    version,
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup() {
    const { resolve } = createResolver(import.meta.url)

    // Used in both app and server
    const defineAbilityImport = [
      {
        name: 'defineAbility',
        as: 'defineAbility',
        from: resolve('runtime/ability'),
      },
      {
        name: 'allow',
        as: 'allow',
        from: resolve('runtime/ability'),
      },
      {
        name: 'deny',
        as: 'deny',
        from: resolve('runtime/ability'),
      },
    ]

    /**
     * App
     */
    addImports(defineAbilityImport)
    addImportsDir(resolve('runtime/utils'))
    addComponentsDir({
      path: resolve('runtime/components'),
      ignore: ['Primitive.ts'],
    })
    addServerImports(defineAbilityImport)

    /**
     * Server
     */
    addServerImportsDir(resolve('runtime/server/utils'))
  },
})
