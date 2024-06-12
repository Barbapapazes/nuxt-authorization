/**
 * Return a new AuthorizationError that can be thrown.
 */
export const createAuthorizationError = (message: string = 'Unauthorized', statusCode: number = 403) => {
  return new AuthorizationError(message, statusCode)
}

/**
 * Authorization error.
 */
export class AuthorizationError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
