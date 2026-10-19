import { defineAbility, deny } from 'nuxt-authorization/utils'

export const readPublicResource = defineAbility({ allowGuest: true }, () => true)
export const readPrivateResource = defineAbility({ allowGuest: true }, () => deny({ message: 'Not found', statusCode: 404 }))
