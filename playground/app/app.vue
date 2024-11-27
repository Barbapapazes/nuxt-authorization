<script setup lang="ts">
import type { Product } from '~~/shared/types/product'
import { createProduct, editProduct, deleteProduct, createCategory } from '~~/shared/abilities'

const product = ref<Product>({
  id: 1,
  name: 'Product 1',
  price: 100,
  ownerId: 1,
})

const editableProduct = ref<Product>({
  id: 2,
  name: 'Product 2',
  price: 200,
  ownerId: 2,
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
      data-attrs="create-product"
    >
      I can create a product.
    </Can>

    <Can
      :ability="createProduct"
    >
      <p>I can create a product.</p>
    </Can>

    <Can
      :ability="[editProduct, createCategory]"
      :args="[[editableProduct]]"
      as="p"
      data-attrs="create-and-edit-product"
    >
      I can edit a product and create a new category.
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

    <Bouncer
      :ability="deleteProduct"
      :args="[product]"
    >
      <template #can>
        <p>I can delete a product.</p>
      </template>

      <template #cannot>
        <p>I cannot delete a product.</p>
      </template>
    </Bouncer>

    <Bouncer
      v-slot="{ can }"
      :ability="deleteProduct"
      :args="[product]"
      as="p"
    >
      Can I delete the product ? {{ can ? 'Yes' : 'No' }}
    </Bouncer>
  </div>
</template>
