import type { Product } from '~/types/product'
import type { User } from '~/types/user'

export const listProducts = defineAbility({ allowGuest: true }, () => true)

export const createProduct = defineAbility(() => true)

export const editProduct = defineAbility((user: User, product: Product) => {
  console.log(user, product)
  return user.id === product.ownerId
})
