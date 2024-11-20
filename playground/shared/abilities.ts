import type { Product } from '~~/shared/types/product'
import type { User } from '~~/shared/types/user'

export const listProducts = defineAbility({ allowGuest: true }, () => true)

export const createProduct = defineAbility(() => true)

export const editProduct = defineAbility((user: User, product: Product) => {
  return user.id === product.ownerId
})

export const deleteProduct = defineAbility((user: User, product: Product) => {
  return user.id === product.ownerId
})

export const createCategory = defineAbility(() => true)
