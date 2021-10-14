export default {
  HOME: {
    path: '/',
  },
  CONTACT_US: {
    path: '/contact-us',
    playerPath: '/contact-us?role=player',
    coachPath: '/contact-us?role=coach',
    clubPath: '/contact-us?role=club',
  },
  COACHES_LIST: {
    path: '/coaches',
  },
  COACHES_SELECT_SPORT: {
    path: '/coaches/sports',
  },
  COACH_DETAILS: {
    CALENDAR: {
      path: `/coaches/[username]/calendar`,
      linkTo: (username) => `/coaches/${username}/calendar`,
    },
    PROFILE: {
      path: `/coaches/[username]`,
      linkTo: (username) => `/coaches/${username}`,
    },
  },
  LOG_IN: {
    path: '/login',
  },
  SIGN_UP: {
    path: '/sign-up',
  },
  PLAYER_FEATURES: {
    path: '/player',
  },
  COACH_FEATURES: {
    path: '/coach',
  },
  CLUB_FEATURES: {
    path: '/club',
  },
  SEARCH_CLUB: {
    path: '/clubs',
  },
  CLUB_WEBSITE: {
    path: '/clubs/:id',
    linkTo: (slug) => `/clubs/${slug}`,
  },

  FORGOT_PASSWORD: {
    path: '/forgot-password',
  },

  TERMS_AND_CONDITIONS: {
    path: '/terms-and-conditions',
  },

  PRIVACY_AND_POLICY: {
    path: '/privacy-and-policy',
  },

  ISPORIT_PLATFORM: {
    linkTo: (token = localStorage.getItem('token')) =>
      `https://app.isporit.com/?accessToken=${token}`,
  },
}
