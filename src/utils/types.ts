/**
 * Represents a possible response from the executed ability. This allows for more flexibility in the response and the error thrown if the user is not authorized.
 */
export type AuthorizationResponse = {
  statusCode?: number
  message?: string
  authorized: boolean
}

/**
 * Represents the response of an executed ability.
 */
export type AuthorizerResponse
  = | boolean
    | AuthorizationResponse
    | Promise<boolean
    | AuthorizationResponse>

/**
 * Represents the authorizer function that will be executed to determine if a user is authorized to perform an action.
 */
export type BouncerAuthorizer<User extends Record<string, any>> = (user: User, ...args: any[]) => AuthorizerResponse

/**
 * Represents an ability that can be used by a bouncer.
 */
export type BouncerAbility<User extends Record<string, any>> = {
  original: BouncerAuthorizer<User>
  execute: (user: User | null, ...args: any[]) => AuthorizerResponse
  allowGuest: boolean
}

/**
 * Represents the arguments that will be passed to the authorizer function.
 */
export type BouncerArgs<Ability extends BouncerAbility<any>> = Ability extends { original: (user: any, ...args: infer Args) => AuthorizerResponse } ? Args : never
