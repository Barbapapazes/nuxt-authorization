<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { BouncerArgs, BouncerAbility } from '../../utils'
import Tag from './Tag'
import { allows, ref, watchEffect } from '#imports'

const props = defineProps<{
  ability: Ability
  args?: BouncerArgs<Ability>
  as?: keyof HTMLElementTagNameMap
}>()

const can = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  can.value = await resolve()
})

async function resolve() {
  return await allows(props.ability, ...(props.args ?? [] as any))
}
</script>

<template>
  <Tag
    v-if="can"
    :as
  >
    <slot />
  </Tag>
</template>
