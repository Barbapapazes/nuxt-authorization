import { type H3Event } from 'h3'
import type { BouncerAbility, BouncerArgs } from '../../../utils'
import { allows as _allows, denies as _denies, authorize as _authorize, AuthorizationError } from '../../../utils'
import { createError } from '#imports'

/**
 * Allows a user to perform an action based on their role and the data.
 */
export async function allows<Event extends H3Event, Ability extends BouncerAbility<any>>(event: Event, bouncerAbility: Ability, ...args: BouncerArgs<Ability>): Promise<boolean> {
  const user = await event.context.$authorization.resolveServerUser()

  return _allows(bouncerAbility, user, ...args)
}

/**
 * Denies a user to perform an action based on their role and the data.
 */
export async function denies<Event extends H3Event, Ability extends BouncerAbility<any>>(event: Event, bouncerAbility: Ability, ...args: BouncerArgs<Ability>): Promise<boolean> {
  const user = await event.context.$authorization.resolveServerUser()

  return _denies(bouncerAbility, user, ...args)
}

/**
 * Throws an error if the user is not allowed to perform an action.
 */
export async function authorize<Event extends H3Event, Ability extends BouncerAbility<any>>(event: Event, bouncerAbility: Ability, ...args: BouncerArgs<Ability>): Promise<void> {
  try {
    const user = await event.context.$authorization.resolveServerUser()

    await _authorize(bouncerAbility, user, ...args)
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
