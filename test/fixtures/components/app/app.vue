<script lang="ts" setup>
import { defineAbility } from '#imports'

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
    >
      <div data-testid="view-can">
        Can
      </div>
    </Can>

    <Can
      :bouncer-ability="cannot"
    >
      <div data-testid="view-not-can">
        Cannot
      </div>
    </Can>

    <Cannot
      :bouncer-ability="can"
    >
      <div data-testid="view-cannot">
        Cannot
      </div>
    </Cannot>

    <Cannot
      :bouncer-ability="cannot"
    >
      <div data-testid="view-not-cannot">
        Can
      </div>
    </Cannot>

    <Bouncer
      :bouncer-ability="can"
    >
      <template #can>
        <div data-testid="view-bouncer-can">
          Can
        </div>
      </template>

      <template #cannot>
        <div data-testid="view-not-bouncer-cannot">
          Cannot
        </div>
      </template>
    </Bouncer>

    <Bouncer
      :bouncer-ability="cannot"
    >
      <template #can>
        <div data-testid="view-not-bouncer-can">
          Cannot
        </div>
      </template>

      <template #cannot>
        <div data-testid="view-bouncer-cannot">
          Can
        </div>
      </template>
    </Bouncer>
  </div>
</template>
