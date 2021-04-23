// import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import ReactGA from 'react-ga'
// import { FB_PIXEL_ID } from '../shared/constants'
// import ReactPixel from 'react-facebook-pixel'
// import { FB_PIXEL_ID } from '../shared/constants'

export const initGA = () => {
  ReactGA.initialize('UA-161161454-2')
}
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

// export const initFBPIXEL = () => {
//   ReactPixel.init(FB_PIXEL_ID)
// }

// export const logPageViewFBPIXEL = () => {
//   // ReactGA.set({ page: window.location.pathname })
//   ReactPixel.pageview()
// }
// export const logEvent = (category = '', action = '') => {
//   if (category && action) {
//     ReactGA.event({ category, action })
//   }
// }
// export const logException = (description = '', fatal = false) => {
//   if (description) {
//     ReactGA.exception({ description, fatal })
//   }
// }
