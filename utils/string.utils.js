import { isEmpty } from 'lodash'
import randomId from 'random-id'
import { API, MAX_USERNAME_LENGTH } from '../shared/constants'
import DEFAULT_USER_AVATAR from '../public/default_user_avatar.png'

export const getUserProfilePicture = (picture) => {
  if (!isEmpty(picture)) {
    return API + picture
  }
  return DEFAULT_USER_AVATAR
}

export function removeSpaceInString(string) {
  return string.replace(/\s/g, '')
}

export const createUsernameForSignUp = (string) =>
  removeSpaceInString(string).slice(0, 10) +
  randomId(MAX_USERNAME_LENGTH - string.slice(0, 10).length, 'aA0')

export default getUserProfilePicture
