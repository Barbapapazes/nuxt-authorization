import { createProduct } from '~/utils/abilities'

export default defineEventHandler(async (event) => {
  await authorize(event, createProduct)

  return 'Create a Product'
})
