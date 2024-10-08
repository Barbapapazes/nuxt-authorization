import type { BouncerAbility, BouncerArgs } from '../../utils'
import { allows as _allows, denies as _denies, authorize as _authorize, AuthorizationError } from '../../utils'
import { useNuxtApp, createError } from '#imports'

/**
 * Client side utility to check if a user can perform an action.
 */
export async function allows<Ability extends BouncerAbility<any>>(ability: Ability, ...args: BouncerArgs<Ability>): Promise<boolean> {
  const user = await useNuxtApp().$authorization.resolveClientUser()

  return _allows(ability, user, ...args)
}

/**
 * Client side utility to check if a user cannot perform an action.
 */
export async function denies<Ability extends BouncerAbility<any>>(ability: Ability, ...args: BouncerArgs<Ability>): Promise<boolean> {
  const user = await useNuxtApp().$authorization.resolveClientUser()

  return _denies(ability, user, ...args)
}

/**
 * Client side utility to throw an error if a user is not allowed to perform an action.
 */
export async function authorize<Ability extends BouncerAbility<any>>(ability: Ability, ...args: BouncerArgs<Ability>): Promise<void> {
  try {
    const user = await useNuxtApp().$authorization.resolveClientUser()

    await _authorize(ability, user, ...args)
  }
  catch (error) {
    if (error instanceof AuthorizationError) {
      throw createError({
        statusCode: error.statusCode,
        message: error.message,
      })
    }
  }
}
