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
      :ability="can"
    >
      <div data-testid="can-visible">
        Can Visible
      </div>
    </Can>

    <Can
      :ability="cannot"
    >
      <div data-testid="can-invisible">
        Can Invisible
      </div>
    </Can>

    <Cannot
      :ability="can"
    >
      <div data-testid="cannot-invisible">
        Cannot Invisible
      </div>
    </Cannot>

    <Cannot
      :ability="cannot"
    >
      <div data-testid="cannot-visible">
        Cannot Visible
      </div>
    </Cannot>

    <Bouncer
      :ability="can"
    >
      <template #can>
        <div data-testid="bouncer-can-visible">
          Bouncer Can Visible
        </div>
      </template>

      <template #cannot>
        <div data-testid="bouncer-cannot-invisible">
          Bouncer Cannot Invisible
        </div>
      </template>
    </Bouncer>

    <Bouncer
      :ability="cannot"
    >
      <template #can>
        <div data-testid="bouncer-can-invisible">
          Bouncer Can Invisible
        </div>
      </template>

      <template #cannot>
        <div data-testid="bouncer-cannot-visible">
          Bouncer Cannot Visible
        </div>
      </template>
    </Bouncer>
  </div>
</template>
