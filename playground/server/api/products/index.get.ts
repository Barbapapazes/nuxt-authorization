import { listProducts } from '~/utils/abilities'

export default defineEventHandler(async (event) => {
  await authorize(event, listProducts)

  return 'List Products'
})
