<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { BouncerAbility, BouncerArgs } from '../../utils'
import { denies, ref, watchEffect } from '#imports'

const props = defineProps<{
  ability: Ability
  args?: BouncerArgs<Ability>
}>()

const cannot = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  cannot.value = await resolve()
})

async function resolve() {
  return await denies(props.ability, ...(props.args ?? [] as any))
}
</script>

<template>
  <template v-if="cannot">
    <slot />
  </template>
</template>
