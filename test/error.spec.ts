import { describe, expect, it } from 'vitest'
import { AuthorizationError, createAuthorizationError } from '../src/utils'

describe('createAuthorizationError', () => {
  it('should return an AuthorizationError with correct defaults', () => {
    const error = createAuthorizationError()
    expect(error).toBeInstanceOf(AuthorizationError)
    expect(error.message).toBe('Unauthorized')
    expect(error.statusCode).toBe(403)
  })

  it('should allow custom message', () => {
    const error = createAuthorizationError('Custom message')
    expect(error.message).toBe('Custom message')
  })

  it('should allow custom status code', () => {
    const error = createAuthorizationError('Custom message', 401)
    expect(error.message).toBe('Custom message')
    expect(error.statusCode).toBe(401)
  })

  it('should return a throw-able error', async () => {
    const error = createAuthorizationError()
    expect(() => {
      throw error
    }).toThrowError('Unauthorized')
  })

  it('should return a throw-able error with custom message', async () => {
    const error = createAuthorizationError('Custom message')
    expect(() => {
      throw error
    }).toThrowError('Custom message')
  })
})
