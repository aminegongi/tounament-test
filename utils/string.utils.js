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

export const getYouTubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

export default getUserProfilePicture
