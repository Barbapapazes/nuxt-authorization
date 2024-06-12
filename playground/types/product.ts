import type { User } from '~/types/user'

export type Product = {
  id: number
  name: string
  price: number
  ownerId: User['id']
}
