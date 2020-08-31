
export default {
    CONTACT_US: {
        path: '/contact-us',
        playerPath: '/contact-us?role=player',
        coachPath: '/contact-us?role=coach',
        clubPath: '/contact-us?role=club',
    },
    LOG_IN: {
        path: '/login',
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
        path: '/clubs'
    },
    CLUB_WEBSITE: {
        path: '/clubs/:id',
        linkTo: slug => '/clubs/'+slug,
    }
}