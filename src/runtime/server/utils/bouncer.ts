import { type H3Event } from 'h3'
import type { AuthorizerResponse, BouncerAbility } from '../../../utils'
import { allows as _allows, denies as _denies, authorize as _authorize, AuthorizationError } from '../../../utils'
import { useNitroApp, createError } from '#imports'

/**
 * Allows a user to perform an action based on their role and the data.
 */
export async function allows<Ability extends BouncerAbility<any>>(event: H3Event, bouncerAbility: Ability, ...args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never): Promise<boolean> {
  const user = await useNitroApp().$authorization.resolveServerUser(event)

  console.log('user', user)

  return _allows(bouncerAbility, user, ...args)
}

/**
 * Denies a user to perform an action based on their role and the data.
 */
export async function denies<Ability extends BouncerAbility<any>>(event: H3Event, bouncerAbility: Ability, ...args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never): Promise<boolean> {
  const user = await useNitroApp().$authorization.resolveServerUser(event)

  return _denies(bouncerAbility, user, ...args)
}

/**
 * Throws an error if the user is not allowed to perform an action.
 */
export async function authorize<Ability extends BouncerAbility<any>>(event: H3Event, bouncerAbility: Ability, ...args: Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never): Promise<void> {
  try {
    const user = await useNitroApp().$authorization.resolveServerUser(event)

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
