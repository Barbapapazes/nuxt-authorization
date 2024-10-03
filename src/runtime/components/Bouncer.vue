<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { BouncerAbility, BouncerArgs } from '../../utils'
import { allows, ref, watchEffect } from '#imports'

const props = defineProps<{
  bouncerAbility: Ability
  args?: BouncerArgs<Ability>
}>()

const can = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  can.value = await resolve()
})

async function resolve() {
  return await allows(props.bouncerAbility, ...(props.args ?? [] as any))
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
