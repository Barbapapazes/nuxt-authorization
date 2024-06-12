import { createAuthorizationError } from './error'
import type { AuthorizationResponse, AuthorizerResponse, BouncerAbility } from './types'

/**
 * Normalize the ability execution result to an authorization response.
 */
export function normalizeAuthorizationResponse(result: boolean | AuthorizationResponse): AuthorizationResponse {
  if (typeof result === 'boolean') {
    return { authorized: result }
  }

  return result
}

/**
 * Check if a user can perform an action.
 */
export async function allows<Ability extends BouncerAbility<any>, User>(bouncerAbility: Ability, user: User, ...args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never): Promise<boolean> {
  const response = await bouncerAbility.execute(user, ...args)
  return normalizeAuthorizationResponse(response).authorized
}

/**
 * Check if a user cannot perform an action.
 */
export async function denies<Ability extends BouncerAbility<any>, User>(bouncerAbility: Ability, user: User, ...args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never): Promise<boolean> {
  const response = await bouncerAbility.execute(user, ...args)
  return !normalizeAuthorizationResponse(response).authorized
}

/**
 * Check if a user can perform an action and throws an error if not.
 */
export async function authorize<Ability extends BouncerAbility<any>, User>(bouncerAbility: Ability, user: User, ...args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never): Promise<void> {
  const response = await bouncerAbility.execute(user, ...args)
  const normalized = normalizeAuthorizationResponse(response)
  if (!normalized.authorized) {
    throw createAuthorizationError(normalized.message, normalized.statusCode)
  }
}
