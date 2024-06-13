import { describe, expect, it } from 'vitest'
import { allow, deny } from '../src/utils'

describe('Ability', () => {
  describe('allow', () => {
    it('should return an object with authorized', () => {
      expect(allow()).toEqual({ authorized: true })
    })
  })

  describe('deny', () => {
    it('should return an object with authorized', () => {
      expect(deny()).toEqual({ authorized: false })
    })

    it('should return an object with message', () => {
      expect(deny({ message: 'Custom message' })).toEqual({ authorized: false, message: 'Custom message' })
    })

    it('should return an object with statusCode', () => {
      expect(deny({ statusCode: 401 })).toEqual({ authorized: false, statusCode: 401 })
    })
  })
})
