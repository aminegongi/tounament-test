/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import { Breadcrumb, Icon } from 'antd'
import InfoCoach from '../../shared/components/InfoCoach/InfoCoach'
import '../../shared/css/coachDetails.scss'
import { SERVER_SIDE_API_BASE_URL, CLUB } from '../../shared/constants'
import CoachAboutBoxes from '../../shared/components/ContactCoach/ContactCoach'
import CoachBox from '../../shared/components/CoachBox/CoachBox'
import CoachAvis from '../../shared/components/CoachAvis/CoachAvis'
import Biography from '../../shared/components/Biography/Biography'
import affiche from '../../public/icon/Banniere.png'
import exclamation from '../../public/icon/exclamation.png'
// import ReservationCours from '../../../shared/components/ReservationCours/ReservationCours'
import { AuthContext } from '../../utils/context.utils'
import Layout from '../../shared/components/layout/Layout'
import { getUserProfilePicture, nl2br } from '../../utils/string.utils'
import CoachCalendar from '../../shared/components/CoachCalendar/CoachCalendar'
import Error from '../../shared/components/PageError'
import { useMediaPredicate } from 'react-media-hook'

const ABOUT_TAB = 1
const RECOMMENDATION_TAB = 2
const BIOGRAPHY_TAB = 3
const CALENDAR_TAB = 4
const SUCCESS_BOOKING_TAB = 5

export default function CoachDetails({
  coach,
  jobs,
  sports,
  dances,
  userNotFound,
}) {
  const router = useRouter()
  // const [coachData, setCoachData] = useState()
  const [specialty, setSpecialty] = useState()
  const [job, setJob] = useState()
  const [tab, setTab] = useState(ABOUT_TAB)
  const [isContactModalVisible, setIsContactModalVisible] = useState(false)
  const isMobile = useMediaPredicate('(max-width: 992px)')

  const authContext = useContext(AuthContext)

  const isCoachOpenForWork = () => {
    if (authContext.isLoggedIn) {
      if (
        authContext.userType === CLUB &&
        coach.coachData &&
        !coach.coachData.lookingForJob
      ) {
        return false
      }
      if (
        authContext.userType !== CLUB &&
        coach.coachData &&
        coach.coachData.privateCourseData &&
        !coach.coachData.privateCourseData.givePrivateCourse
      ) {
        return false
      }
    }
    if (!authContext.isLoggedIn) {
      return true
    }
    return true
  }
  // const onOpenContactModal = () => {
  //   // if (!authContext.isLoggedIn) {
  //   //   return authContext.toggleLogInModal()
  //   // }
  //   if (isCoachOpenForWork()) {
  //     return setIsContactModalVisible(true)
  //   }
  //   return null
  // }

  const renderCoachProfile = () => {
    return (
      <InfoCoach
        coachProfile={coach}
        job={job}
        specialty={specialty}
        onOpenCalendar={() => {
          window.scrollTo(400, !isMobile ? 250 : 650)
          setTab(CALENDAR_TAB)
        }}
      />
    )
  }

  const displayTabs = () => {
    if (coach) {
      if (tab === ABOUT_TAB) {
        return (
          <div className="tabsinfo__title">
            <CoachBox
              coachData={coach.coachData}
              iconExclamation={exclamation}
              specialty={specialty}
            />
          </div>
        )
      }
      if (tab === RECOMMENDATION_TAB) {
        return <CoachAvis coach={coach} />
      }
      if (tab === BIOGRAPHY_TAB) {
        return (
          <Biography
            coachProfile={coach}
            title="Biographie"
            icon={exclamation}
          />
        )
      }

      if (tab === CALENDAR_TAB) {
        return (
          <CoachCalendar
            onSuccess={() => setTab(SUCCESS_BOOKING_TAB)}
            coach={coach}
          />
        )
      }

      if (tab === SUCCESS_BOOKING_TAB) {
        return (
          <div className="coach-calendar__request-succeeded">
            <div className="coach-calendar__request-succeeded__icon">
              <Icon type="check-circle" />
            </div>
            <div className="coach-calendar__request-succeeded__title">
              Confirmation
            </div>
            <div className="coach-calendar__request-succeeded__description">
              Votre demande de réservation a été envoyée à l'entraîneur!
            </div>
            <div className="coach-calendar__request-succeeded__sub-description">
              vous serez contacté par téléphone pour confirmer votre cours .
              <div>
                <a
                  href={`https://app.isporit.com/dashboard`}
                  className="isporit-primary-button link-platform"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir mes réservations
                </a>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  useEffect(() => {
    // setCoachData(coach)
    const job = jobs.find(
      (j) => j._id === (coach.coachData && coach.coachData.job),
    )

    let specialty = ''
    if (job) {
      if (job.specialty && job.specialty.type === 'sport') {
        specialty = coach.coachData.specialty
          ? coach.coachData.specialty.reduce((acc, val) => {
              const element = sports.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      } else if (job.specialty && job.specialty.type === 'dance') {
        specialty = coach.coachData.specialty
          ? coach.coachData.specialty.reduce((acc, val) => {
              const element = dances.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      }
    }
    setSpecialty(specialty)
    setJob(job)
  }, [router.query.id])

  useEffect(() => {
    if (router.query.calendar) {
      window.scrollTo(400, !isMobile ? 250 : 650)
      setTab(CALENDAR_TAB)
    }
  }, [router.query.calendar])

  if (userNotFound) {
    return <Error statusCode={404} description={"Oops!!! Ce coach n'existe pas"} />
  }

  if (isEmpty(coach.coachData)) {
    return <h1>coach data is missing in the coach object</h1>
  }

  return (
    <>
      <Head>
        <title>
          {coach.firstName[0].toUpperCase() + coach.firstName.slice(1)}{' '}
          {coach.lastName[0].toUpperCase() + coach.lastName.slice(1)}
        </title>
        <meta
          name="description"
          content={coach.coachData && nl2br(coach.coachData.aboutMe)}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://isporit.com/coaches/${coach.username}`}
        />
        <meta property="og:description" content={coach.coachData.aboutMe} />
        <meta
          property="og:image"
          content={getUserProfilePicture(coach.profilePicture)}
        />
        <link
          rel="canonical"
          href={`https://isporit.com/coaches/${coach.username}`}
        />
      </Head>
      <Layout>
        <div className="coach">
          <div className="affiche">
            <img className="affiche__img" src={affiche} alt="affiche" />
          </div>

          {isMobile && (
           <div style={{margin: "10px 10px 10px 16px"}}>
           <Breadcrumb separator=">">
              <Breadcrumb.Item
                href="/coaches"
                className="isporit-breadcrumb-link"
              >
                Tous les coachs
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {`${
                  coach.firstName[0].toUpperCase() + coach.firstName.slice(1)
                } ${coach.lastName[0].toUpperCase()}${coach.lastName.slice(1)}`}
              </Breadcrumb.Item>
            </Breadcrumb>
            </div>
          )}

          <div className="coach__coachdetails">
            <div className="coach__cordonneBlock">
              <div className="coach__coachdetails__contact">
                {coach && jobs && renderCoachProfile(coach)}
              </div>
              <div className="coach__coachdetails__information">
                {coach ? <CoachAboutBoxes coachData={coach} /> : ''}
              </div>
            </div>
            <div className="tabsinfo">
              {!isMobile && (
                <Breadcrumb separator=">">
                  <Breadcrumb.Item
                    href="/coaches"
                    className="isporit-breadcrumb-link"
                  >
                    Tous les coachs
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {`${
                      coach.firstName[0].toUpperCase() +
                      coach.firstName.slice(1)
                    } ${coach.lastName[0].toUpperCase()}${coach.lastName.slice(
                      1,
                    )}`}
                  </Breadcrumb.Item>
                </Breadcrumb>
              )}
              <div className="tabs">
                <div className="tabs__button">
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 1 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(ABOUT_TAB)}
                  >
                    A propos
                  </button>
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 2 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(RECOMMENDATION_TAB)}
                  >
                    Avis
                  </button>
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 3 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(BIOGRAPHY_TAB)}
                  >
                    Biographie
                  </button>
                </div>
                <button
                  onClick={() => {
                    window.scrollTo(400, !isMobile ? 250 : 650)

                    setTab(CALENDAR_TAB)
                  }}
                  type="button"
                  className="isporit-primary-button tabs__contact"
                >
                  Réserver
                </button>
              </div>
              {/* <div className="linetabs" /> */}
              {displayTabs()}
            </div>
          </div>
          {/* <ReservationCours
          coachProfile={coach}
          isModalVisibleReservation={isContactModalVisible}
          setIsModalVisibleReservation={setIsContactModalVisible}
        /> */}
        </div>
      </Layout>
    </>
  )
}

CoachDetails.propTypes = {
  coach: PropTypes.objectOf(PropTypes.any).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.any).isRequired,
  sports: PropTypes.arrayOf(PropTypes.any).isRequired,
  dances: PropTypes.arrayOf(PropTypes.any).isRequired,
}

CoachDetails.getInitialProps = async ({ query, req }) => {
  const coachRes = await fetch(
    `${SERVER_SIDE_API_BASE_URL(req)}users/coaches/slug/${query.username}`,
  )
  const jobsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}jobs`)
  const sportsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}sports`)
  const danceRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}dances/`)
  const regionsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}regions/`)
  const jsonCoachRes = await coachRes.json()
  const jsonJobsRes = await jobsRes.json()
  const jsonSportsRes = await sportsRes.json()
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coach: jsonCoachRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes,
    userNotFound: coachRes.status === 404,
  }
}
