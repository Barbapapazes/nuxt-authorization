import { listProducts } from '~~/shared/abilities'

export default defineEventHandler(async (event) => {
  await authorize(event, listProducts)

  return 'List Products'
})
