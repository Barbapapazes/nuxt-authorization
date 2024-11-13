<script setup lang="ts">
import type { Product } from '~~/shared/types/product'
import { createProduct, editProduct, deleteProduct } from '~~/shared/abilities'

const product = ref<Product>({
  id: 1,
  name: 'Product 1',
  price: 100,
  ownerId: 1,
})
</script>

<template>
  <div>
    Nuxt Authorization Playground

    <!-- This is used to test the reactivity -->
    <label for="ownerId">Owner ID</label>
    <input
      id="ownerId"
      v-model="product.ownerId"
      type="number"
    >

    <Can
      :ability="createProduct"
      as="p"
    >
      I can create a product.
    </Can>

    <Cannot
      :ability="editProduct"
      :args="[product]"
      as="p"
    >
      I cannot edit a product.
    </Cannot>

    <Bouncer
      :ability="deleteProduct"
      :args="[product]"
      as="p"
    >
      <template #can>
        I can delete a product.
      </template>

      <template #cannot>
        I cannot delete a product.
      </template>
    </Bouncer>
  </div>
</template>
