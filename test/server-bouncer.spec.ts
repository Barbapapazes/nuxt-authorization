import type { H3Event } from 'h3'
import { describe, expect, it } from 'vitest'
import { defineAbility, deny } from '../src/utils'
import { allows, denies, authorize } from '../src/runtime/server/utils/bouncer'

function createEvent(resolveServerUser: () => unknown = () => ({ id: 1 })) {
  return {
    context: {
      $authorization: { resolveServerUser },
    },
  } as unknown as H3Event
}

describe('Server bouncer', () => {
  it('resolves the user for server-side checks', async () => {
    const event = createEvent()
    const ability = defineAbility((user: { id: number }, id: number) => user.id === id)

    expect(await allows(event, ability, 1)).toBe(true)
    expect(await denies(event, ability, 2)).toBe(true)
    await expect(authorize(event, ability, 1)).resolves.toBeUndefined()
  })

  it('converts authorization failures into h3 errors', async () => {
    const ability = defineAbility(() => deny({ message: 'Not found', statusCode: 404 }))

    await expect(authorize(createEvent(), ability)).rejects.toMatchObject({
      statusCode: 404,
      message: 'Not found',
    })
  })

  it('rejects unauthenticated users', async () => {
    await expect(authorize(createEvent(() => null), defineAbility(() => true))).rejects.toMatchObject({
      statusCode: 403,
    })
  })

  it('propagates resolver failures instead of granting access', async () => {
    const error = new Error('Session unavailable')
    const event = createEvent(() => { throw error })

    await expect(authorize(event, defineAbility(() => true))).rejects.toBe(error)
  })

  it('propagates rejected user lookups', async () => {
    const error = new Error('Session unavailable')
    const event = createEvent(() => Promise.reject(error))

    await expect(authorize(event, defineAbility(() => true))).rejects.toBe(error)
  })

  it('propagates ability failures', async () => {
    const error = new Error('Permission lookup failed')
    const ability = defineAbility(() => { throw error })

    await expect(authorize(createEvent(), ability)).rejects.toBe(error)
  })

  it('fails closed when the resolver is missing', async () => {
    const event = { context: {} } as H3Event

    await expect(authorize(event, defineAbility(() => true))).rejects.toBeInstanceOf(TypeError)
  })
})
