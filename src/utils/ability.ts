import type { BouncerAbility, BouncerAuthorizer, AuthorizationResponse, AuthorizerResponse } from './types'

export type AuthorizerToAbility<Authorizer> = Authorizer extends (
  user: infer User,
  ...args: infer Args
) => AuthorizerResponse
  ? {
      allowGuest: boolean
      original: Authorizer
      execute(user: User, ...args: Args): AuthorizerResponse
    }
  : never

/**
 * Define an ability that you can use to check if a user can perform an action.
 */
export function defineAbility<Authorizer extends BouncerAuthorizer<any>>(
  authorizer: Authorizer,
): AuthorizerToAbility<Authorizer>
export function defineAbility<Authorizer extends BouncerAuthorizer<any>>(
  options: { allowGuest: boolean },
  authorizer: Authorizer,
): AuthorizerToAbility<Authorizer>
export function defineAbility<Authorizer extends BouncerAuthorizer<any>>(
  authorizerOrOptions: Authorizer | { allowGuest: boolean },
  authorizer?: Authorizer,
) {
  if (typeof authorizerOrOptions === 'function') {
    return {
      allowGuest: false,
      original: authorizerOrOptions,
      execute(user, ...args) {
        if (user === null) {
          return { authorized: false } satisfies AuthorizationResponse
        }
        return this.original(user, ...args)
      },
    } satisfies BouncerAbility<any>
  }

  return {
    allowGuest: authorizerOrOptions?.allowGuest || false,
    original: authorizer!,
    execute(user, ...args) {
      if (user === null && !this.allowGuest) {
        return { authorized: false } satisfies AuthorizationResponse
      }
      return this.original(user, ...args)
    },
  } satisfies BouncerAbility<any>
}

/**
 * Helper to allow a user to perform an action.
 */
export function allow(): AuthorizationResponse {
  return {
    authorized: true,
  }
}

/**
 * Helper to deny a user to perform an action.
 */
export function deny(options: { statusCode?: number, message?: string } = {}): AuthorizationResponse {
  return {
    authorized: false,
    ...options,
  }
}
