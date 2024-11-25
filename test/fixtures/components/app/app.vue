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
      :ability="can"
      data-testid="as-can-visible"
      as="p"
    >
      Can Visible
    </Can>

    <Can
      :ability="cannot"
    >
      <div data-testid="can-invisible">
        Can Invisible
      </div>
    </Can>

    <Can
      :ability="[can, can]"
    >
      <div data-testid="can-multiple-visible">
        Can Multiple Visible
      </div>
    </Can>

    <Can
      :ability="[can, cannot]"
    >
      <div data-testid="can-multiple-invisible">
        Can Multiple Visible
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

    <Cannot
      :ability="[can, cannot]"
    >
      <div data-testid="cannot-multiple-invisible">
        Cannot Multiple Visible
      </div>
    </Cannot>

    <Cannot
      :ability="[cannot, cannot]"
    >
      <div data-testid="cannot-multiple-visible">
        Cannot Multiple Visible
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

    <Bouncer
      :ability="[can, can]"
    >
      <template #can>
        <div data-testid="bouncer-can-multiple-visible">
          Bouncer Can Multiple Visible
        </div>
      </template>

      <template #cannot>
        <div data-testid="bouncer-cannot-multiple-invisible">
          Bouncer Cannot Multiple Invisible
        </div>
      </template>
    </Bouncer>
  </div>
</template>
