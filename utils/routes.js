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

  ISPORIT_PLATFORM: {
    linkTo: (token = localStorage.getItem('token')) =>
      `https://dev.isporit.com/?accessToken=${token}`,
  },
}
