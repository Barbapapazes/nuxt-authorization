import { createAuthorizationError } from './error'
import type { AuthorizationResponse, BouncerAbility, BouncerArgs } from './types'

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
export async function allows<Ability extends BouncerAbility<any>, User extends Record<string, any> = Ability extends BouncerAbility<infer U> ? U : never>(bouncerAbility: Ability, user: User | null, ...args: BouncerArgs<Ability>): Promise<boolean> {
  const response = await bouncerAbility.execute(user, ...args)
  return normalizeAuthorizationResponse(response).authorized
}

/**
 * Check if a user cannot perform an action.
 */
export async function denies<Ability extends BouncerAbility<any>, User extends Record<string, any> = Ability extends BouncerAbility<infer U> ? U : never>(bouncerAbility: Ability, user: User | null, ...args: BouncerArgs<Ability>): Promise<boolean> {
  const response = await bouncerAbility.execute(user, ...args)
  return !normalizeAuthorizationResponse(response).authorized
}

/**
 * Check if a user can perform an action and throws an error if not.
 */
export async function authorize<Ability extends BouncerAbility<any>, User extends Record<string, any> = Ability extends BouncerAbility<infer U> ? U : never>(bouncerAbility: Ability, user: User | null, ...args: BouncerArgs<Ability>): Promise<void> {
  const response = await bouncerAbility.execute(user, ...args)
  const normalized = normalizeAuthorizationResponse(response)
  if (!normalized.authorized) {
    throw createAuthorizationError(normalized.message, normalized.statusCode)
  }
}
