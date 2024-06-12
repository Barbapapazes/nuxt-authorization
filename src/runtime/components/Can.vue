<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { AuthorizerResponse, BouncerAbility } from '../../utils'
import { allows } from '#imports'

const props = defineProps<{
  bouncerAbility: Ability
  args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never
}>()

const can = await allows(props.bouncerAbility, ...props.args)
</script>

<template>
  <template
    v-if="can"
  >
    <slot />
  </template>
</template>
