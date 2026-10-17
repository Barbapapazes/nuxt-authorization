import { defineEventHandler, getQuery } from 'h3'
import { readPublicResource, readPrivateResource } from '#shared/utils/abilities'
import { allows, denies, authorize } from '#imports'

export default defineEventHandler(async (event) => {
  const { scenario } = getQuery(event)

  if (scenario !== 'missing-resolver') {
    event.context.$authorization = {
      resolveServerUser: async () => null,
    }
  }

  if (scenario === 'denied') {
    await authorize(event, readPrivateResource)
  }
  else {
    await authorize(event, readPublicResource)
  }

  return {
    allows: await allows(event, readPublicResource),
    denies: await denies(event, readPrivateResource),
  }
})
