<script lang="ts" setup>
import { defineAbility } from '#imports'
import { Can } from '#components'

const can = defineAbility(() => {
  return true
})

const cannot = defineAbility(() => {
  return false
})
</script>

<template>
  <div>
    <Can
      :bouncer-ability="can"
      :args="[]"
    >
      <div data-testid="view-can">
        Can
      </div>
    </Can>

    <Can
      :bouncer-ability="cannot"
      :args="[]"
    >
      <div data-testid="view-not-can">
        Cannot
      </div>
    </Can>

    <Cannot
      :bouncer-ability="can"
      :args="[]"
    >
      <div data-testid="view-cannot">
        Cannot
      </div>
    </Cannot>

    <Cannot
      :bouncer-ability="cannot"
      :args="[]"
    >
      <div data-testid="view-not-cannot">
        Can
      </div>
    </Cannot>
  </div>
</template>
