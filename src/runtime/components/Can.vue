<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { AuthorizerResponse, BouncerAbility } from '../../utils'
import { allows } from '#imports'

type PropsArgs = Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never

const props = defineProps<{
  bouncerAbility: Ability
  args?: PropsArgs
}>()

const can = ref(false)
watchEffect(async () => {
  can.value = await allows(props.bouncerAbility, ...(props.args ?? [] as unknown as PropsArgs))
})
</script>

<template>
  <template
    v-if="can"
  >
    <slot />
  </template>
</template>
