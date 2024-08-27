<script setup lang="ts">
import type { Product } from '~/types/product'

const product: Product = {
  id: 1,
  name: 'Product 1',
  price: 100,
  ownerId: 1,
}
</script>

<template>
  <div>
    Nuxt Authorization Playground

    <Can
      :bouncer-ability="createProduct"
    >
      <p>
        I can create a product.
      </p>
    </Can>

    <Cannot
      :bouncer-ability="editProduct"
      :args="[product]"
    >
      <p>
        I cannot edit a product.
      </p>
    </Cannot>
  </div>
</template>
