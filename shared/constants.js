import getConfig from 'next/config'
import absoluteUrl from 'next-absolute-url'

export const ALL = 'Tout'
export const ALPHABETICAL = 'alphabetique'
export const RECOMMEND = 'recommander'
export const EXPERIENCE = 'experience'
export const AVATAR =
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Hoodie&clotheColor=Blue03&eyeType=Close&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Light'

export const SERVER_SIDE_API_BASE_URL = (req) => {
  const { publicRuntimeConfig } = getConfig()
  const { origin } = absoluteUrl(req)
  return `${
    !origin.includes('localhost:3001')
      ? publicRuntimeConfig.PROD_API_URL
      : 'https://app.isporit.com/api/'
  }/`
}
export const CLIENT_SIDE_API_BASE_URL = () => {
  const { publicRuntimeConfig } = getConfig()

  const { host } = typeof window !== 'undefined' && window.location
  if (host && !host.includes('localhost:3001')) {
    return publicRuntimeConfig.PROD_API_URL
  }
  return 'https://app.isporit.com/api'
}
export const PRIVATECOACH = 'privatecoach'
export const PRIVATESESSION = 'Privatesession'
export const LOOKINGFORWORK = 'lookingforwork'

export const REQUEST_SUCCEEDED = 'request_succeeded'
export const REQUEST_FAILED = 'request_failed'

export const MAX_USERNAME_LENGTH = 60
export const CLUB = 'club'
export const COACH = 'coach'
export const PLAYER = 'player'
