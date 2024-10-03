<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { AuthorizerResponse, BouncerAbility } from '../../utils'
import { denies, ref, watchEffect } from '#imports'

type PropsArgs = Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never

const props = defineProps<{
  bouncerAbility: Ability
  args?: PropsArgs
}>()

const cannot = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  cannot.value = await resolve()
})

async function resolve() {
  return await denies(props.bouncerAbility, ...(props.args ?? [] as unknown as PropsArgs))
}
</script>

<template>
  <template
    v-if="cannot"
  >
    <slot />
  </template>
</template>
