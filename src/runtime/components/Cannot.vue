<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { AuthorizerResponse, BouncerAbility } from '../../utils/types'
import { denies } from '../utils/bouncer'

const props = defineProps<{
  bouncerAbility: Ability
  args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never
}>()

const cannot = await denies(props.bouncerAbility, ...props.args)
</script>

<template>
  <template
    v-if="cannot"
  >
    <slot />
  </template>
</template>
