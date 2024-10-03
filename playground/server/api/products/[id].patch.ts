import type { Product } from '~~/shared/types/product'
import { editProduct } from '~~/shared/abilities'

export default defineEventHandler(async (event) => {
  const product: Product = {
    id: 1,
    name: 'Product 1',
    price: 100,
    ownerId: 1,
  }
  await authorize(event, editProduct, product)

  return 'Edit a Product'
})
