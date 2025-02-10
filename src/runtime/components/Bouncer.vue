<script lang="ts">
import type { Component } from 'vue'
import type { BouncerAbility, BouncerArgs } from '../../utils'
import { Primitive } from './Primitive'
import { allows, ref, watchEffect } from '#imports'

export interface BouncerProps {
  ability: BouncerAbility<any> | BouncerAbility<any>[]
  args?: BouncerArgs<BouncerAbility<any>> | BouncerArgs<BouncerAbility<any>>[]
  as?: string | Component
}
export interface BouncerEmits {}
export interface BouncerSlots {
  default?: (props: { can: boolean }) => any
  can?: (props: object) => any
  cannot?: (props: object) => any
}
</script>

<script lang="ts" setup generic="Ability extends BouncerAbility<any>">
const props = defineProps<BouncerProps>()
defineEmits<BouncerEmits>()
const slots = defineSlots<BouncerSlots>()

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
    <template v-if="slots.default">
      <slot
        :can
      />
    </template>
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
