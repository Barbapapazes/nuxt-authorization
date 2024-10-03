<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { AuthorizerResponse, BouncerAbility } from '../../utils'
import { allows, ref, watchEffect } from '#imports'

type PropsArgs = Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never

const props = defineProps<{
  bouncerAbility: Ability
  args?: PropsArgs
}>()

const can = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  can.value = await resolve()
})

async function resolve() {
  return await allows(props.bouncerAbility, ...(props.args ?? [] as unknown as PropsArgs))
}
</script>

<template>
  <template v-if="can">
    <slot name="can" />
  </template>
  <template v-else>
    <slot name="cannot" />
  </template>
</template>
