<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { BouncerArgs, BouncerAbility } from '../../utils'
import { allows } from '#imports'

const props = defineProps<{
  bouncerAbility: Ability
  args?: BouncerArgs<Ability>
}>()

const can = await allows<Ability>(props.bouncerAbility, ...(props.args ?? [] as any))
</script>

<template>
  <template v-if="can">
    <slot />
  </template>
</template>
