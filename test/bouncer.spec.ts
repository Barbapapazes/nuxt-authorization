import { describe, expect, it } from 'vitest'
import { allow, allows, denies, defineAbility, authorize, deny, AuthorizationError } from '../src/utils'

describe('Bouncer', () => {
  interface User {
    id: number
  }
  const user: User = { id: 1 }

  describe('allows', () => {
    it('should return true if the user is authorized', async () => {
      const ability = defineAbility(() => true)

      const result = await allows(ability, {})
      expect(result).toBe(true)
    })

    it('should return false if the user is not authorized', async () => {
      const ability = defineAbility(() => false)

      const result = await allows(ability, {})
      expect(result).toBe(false)
    })

    it('should handle async authorizers', async () => {
      const ability = defineAbility(async () => Promise.resolve(true))

      const result = await allows(ability, {})
      expect(result).toBe(true)
    })

    it('should pass user to the ability', async () => {
      const ability = defineAbility((user: User) => Boolean(user.id))

      const result = await allows(ability, user)
      expect(result).toBe(true)
    })

    it('should pass additional arguments to the ability', async () => {
      const ability = defineAbility((user: User, id: number) => Boolean(user.id === id))

      const result = await allows(ability, user, 1)
      expect(result).toBe(true)
    })

    it('should not allow guest by default', async () => {
      const ability = defineAbility(() => true)

      const result = await allows(ability, null)
      expect(result).toBe(false)
    })

    it('should allow guest if specified', async () => {
      const ability = defineAbility({ allowGuest: true }, () => true)

      const result = await allows(ability, null)
      expect(result).toBe(true)
    })

    it('should always return a boolean', async () => {
      const ability = defineAbility(() => allow())

      const result = await allows(ability, {})
      expect(result).toBe(true)
    })
  })

  describe('denies', () => {
    it('should return false if the user is authorized', async () => {
      const ability = defineAbility(() => true)

      const result = await denies(ability, {})
      expect(result).toBe(false)
    })

    it('should return true if the user is not authorized', async () => {
      const ability = defineAbility(() => false)

      const result = await denies(ability, {})
      expect(result).toBe(true)
    })

    it('should handle async authorizers', async () => {
      const ability = defineAbility(async () => Promise.resolve(true))

      const result = await denies(ability, {})
      expect(result).toBe(false)
    })

    it('should pass user to the ability', async () => {
      const ability = defineAbility((user: User) => Boolean(user.id))

      const result = await denies(ability, user)
      expect(result).toBe(false)
    })

    it('should pass additional arguments to the ability', async () => {
      const ability = defineAbility((user: User, id: number) => Boolean(user.id === id))

      const result = await denies(ability, user, 1)
      expect(result).toBe(false)
    })

    it('should not allow guest by default', async () => {
      const ability = defineAbility(() => true)

      const result = await denies(ability, null)
      expect(result).toBe(true)
    })

    it('should allow guest if specified', async () => {
      const ability = defineAbility({ allowGuest: true }, () => true)

      const result = await denies(ability, null)
      expect(result).toBe(false)
    })

    it('should always return a boolean', async () => {
      const ability = defineAbility(() => allow())

      const result = await denies(ability, {})
      expect(result).toBe(false)
    })
  })

  describe('authorize', () => {
    it('should not throw if the user is authorized', async () => {
      const ability = defineAbility(() => true)

      await expect(authorize(ability, {})).resolves.not.toThrow()
    })

    it('should throw if the user is not authorized', async () => {
      const ability = defineAbility(() => false)

      const rejects = expect(authorize(ability, {})).rejects

      await rejects.toThrow('Unauthorized')
      await rejects.toBeInstanceOf(AuthorizationError)
      await rejects.toHaveProperty('statusCode', 403)
      await rejects.toHaveProperty('message', 'Unauthorized')
    })

    it('should handle async authorizers', async () => {
      const ability = defineAbility(async () => Promise.resolve(true))

      await expect(authorize(ability, {})).resolves.not.toThrow()
    })

    it('should pass user to the ability', async () => {
      const ability = defineAbility((user: User) => Boolean(user.id))

      await expect(authorize(ability, user)).resolves.not.toThrow()
    })

    it('should pass additional arguments to the ability', async () => {
      const ability = defineAbility((user: User, id: number) => Boolean(user.id === id))

      await expect(authorize(ability, user, 1)).resolves.not.toThrow()
    })

    it('should not allow guest by default', async () => {
      const ability = defineAbility(() => true)

      await expect(authorize(ability, null)).rejects.toThrow('Unauthorized')
    })

    it('should allow guest if specified', async () => {
      const ability = defineAbility({ allowGuest: true }, () => true)

      await expect(authorize(ability, null)).resolves.not.toThrow()
    })

    it('should throw an error with the specified message', async () => {
      const ability = defineAbility(() => deny({ message: 'Not Found', statusCode: 404 }))

      const rejects = expect(authorize(ability, {})).rejects

      await rejects.toThrow('Not Found')
      await rejects.toBeInstanceOf(AuthorizationError)
      await rejects.toHaveProperty('statusCode', 404)
      await rejects.toHaveProperty('message', 'Not Found')
    })
  })
})
