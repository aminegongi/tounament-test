/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { isEmpty } from 'lodash'
import randomId from 'random-id'
import { Tooltip } from 'antd'

import {
  CLIENT_SIDE_API_BASE_URL,
  MAX_USERNAME_LENGTH,
} from '../shared/constants'
import DEFAULT_USER_AVATAR from '../public/default_user_avatar.png'
// import { isSessionPricesEmpty } from '../shared/components/CoachBox/CoachBox'

export const getUserProfilePicture = (picture) => {
  if (!isEmpty(picture)) {
    return CLIENT_SIDE_API_BASE_URL() + picture
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

export const isYoutubeLinkValid = (url) => {
  const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm
  const match = url.match(regExp)
  return match
}

export function nl2br(str, isXhtml) {
  if (typeof str === 'undefined' || str === null) {
    return ''
  }
  const breakTag = isXhtml || typeof isXhtml === 'undefined' ? '<br />' : '<br>'
  const str2 = str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1 ${breakTag} $2`)
  return str2
}

export const cutString = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return (
      <Tooltip placement="bottom" title={text}>
        {`${text.slice(0, maxLength)}...`}
      </Tooltip>
    )
  }
  return text
}

export const cutStringWithoutTooltip = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`
  }
  return text
}

const isZeroOrUndefined = (str) => {
  return str === 0 || str === undefined
}
const getSessionTypes = (offer, isCutString) => {
  let str = ''
  if (!isZeroOrUndefined(offer.onlineSessionsNumber)) {
    str += '30' + ' en ligne'
  }
  let sessionNotOnLine = 20
  if (!isZeroOrUndefined(offer.atHomeSessionsNumber)) {
    sessionNotOnLine += offer.atHomeSessionsNumber
  }
  if (!isZeroOrUndefined(offer.onSiteSessionsNumber)) {
    sessionNotOnLine += offer.onSiteSessionsNumber
  }
  if (str !== '') {
    str += ' - '
  }
  str += sessionNotOnLine
  if (!isZeroOrUndefined(offer.atHomeSessionsNumber)) {
    str += ' à domicile'
  }
  if (!isZeroOrUndefined(offer.onSiteSessionsNumber)) {
    if (!isZeroOrUndefined(offer.atHomeSessionsNumber)) {
      str += '/terrain/salle'
    } else {
      str += ' sur terrain/salle'
    }
  }
  // offer.atHomeSessionsNumber + offer.onSiteSessionsNumber

  return isCutString ? cutStringWithoutTooltip(str, 36) : str
  // return  cutStringWithoutTooltip (str,25)
}

export const getPrices = (offer, isCutString = false) => ({
  onsite: {
    value: `${offer.onSiteSessionsNumber} séance${
      offer.onSiteSessionsNumber > 1 ? 's' : ''
    } sur place`,
  },
  online: {
    value: `${offer.onlineSessionsNumber} séance${
      offer.onlineSessionsNumber > 1 ? 's' : ''
    } en ligne`,
  },
  atHome: {
    value: `${offer.atHomeSessionsNumber} séance${
      offer.atHomeSessionsNumber > 1 ? 's' : ''
    } à domicile`,
  },
  mixed: {
    value: getSessionTypes(offer, isCutString),
  },
})

export const getPackagesAndFirstSession = (coachProfile) => {
  let cheapestPrice
  // if (!isSessionPricesEmpty(coachProfile.coachData)) {
  //   cheapestPrice = coachProfile.coachData.privateCourseData.sessionPrices
  //     .slice()
  //     .sort((a, b) => a.price - b.price)[0]
  //   let firstSessionPrice =
  //     coachProfile.coachData.privateCourseData.isporitPriceFirstSession
  //   if (firstSessionPrice === undefined) {
  //     firstSessionPrice = -1
  //   } else if (firstSessionPrice === 0) {
  //     firstSessionPrice = ' Gratuite'
  //   } else {
  //     firstSessionPrice += ' DT'
  //   }
  //   return {
  //     cheapestPrice: cheapestPrice.price,
  //     cheapestPriceSessions:
  //       (cheapestPrice.onSiteSessionsNumber || 0) +
  //       (cheapestPrice.onlineSessionsNumber || 0),
  //     firstSessionPrice,
  //   }
  // }
}

export const addZeroToTime = (time) => {
  if (`${time}`.length === 1) {
    return `0${time}`
  }
  return time
}

export default getUserProfilePicture
