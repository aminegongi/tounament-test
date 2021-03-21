const coachingRequest = {
  create: 'coachingRequests/create',
}

const recruitmentRequest = {
  create: 'recruitmentRequests/create',
}

const auth = {
  fetchUserProfile: 'auth/me',
  login: 'auth/login',
  signUp: 'auth/register',
}

const club = {
  create: 'clubs/create',
}

export default {
  baseApiUrl: () => '/api/',
  coachingRequest,
  recruitmentRequest,
  auth,
  club,
}
