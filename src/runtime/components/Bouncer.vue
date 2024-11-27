<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
import type { Component } from 'vue'
import type { BouncerAbility, BouncerArgs } from '../../utils'
import { Primitive } from './Primitive'
import { allows, ref, watchEffect } from '#imports'

const props = defineProps<{
  ability: Ability | Ability[]
  args?: BouncerArgs<Ability> | BouncerArgs<Ability>[]
  as?: string | Component
}>()

const can = ref(await resolve())

// `watchEffect` is not called on the server so we need to call set an initial value
watchEffect(async () => {
  can.value = await resolve()
})

async function resolve() {
  if (Array.isArray(props.ability)) {
    const results = await Promise.all(props.ability.map((ability, index) => allows(ability, ...(props.args?.[index] ?? [] as any))))
    return results.every(Boolean)
  }

  return await allows(props.ability, ...(props.args ?? [] as any))
}
</script>

<template>
  <Primitive
    :as="props.as"
  >
    <slot
      v-if="$slots.default"
      :can
    />
    <template v-else>
      <slot
        v-if="can"
        name="can"
      />
      <slot
        v-else
        name="cannot"
      />
    </template>
  </Primitive>
</template>
