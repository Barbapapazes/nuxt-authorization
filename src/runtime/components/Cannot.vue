<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { BouncerAbility, BouncerArgs } from '../../utils'
import { denies } from '#imports'

const props = defineProps<{
  bouncerAbility: Ability
  args?: BouncerArgs<Ability>
}>()

const cannot = await denies<Ability>(props.bouncerAbility, ...(props.args ?? [] as any))
</script>

<template>
  <template v-if="cannot">
    <slot />
  </template>
</template>
