import { createProduct } from '~~/shared/abilities'

export default defineEventHandler(async (event) => {
  await authorize(event, createProduct)

  return 'Create a Product'
})
