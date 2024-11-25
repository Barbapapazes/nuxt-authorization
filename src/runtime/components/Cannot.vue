<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { Component } from 'vue'
import type { BouncerAbility, BouncerArgs } from '../../utils'
import { Primitive } from './Primitive'
import { denies, ref, watchEffect } from '#imports'

const props = defineProps<{
  ability: Ability | Ability[]
  args?: BouncerArgs<Ability> | BouncerArgs<Ability>[]
  as?: string | Component
}>()

const cannot = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  cannot.value = await resolve()
})

async function resolve() {
  if (Array.isArray(props.ability)) {
    const results = await Promise.all(props.ability.map((ability, index) => denies(ability, ...(props.args?.[index] ?? [] as any))))
    return results.every(Boolean)
  }

  return await denies(props.ability, ...(props.args ?? [] as any))
}
</script>

<template>
  <Primitive
    v-if="cannot"
    :as="props.as"
  >
    <slot />
  </Primitive>
</template>
