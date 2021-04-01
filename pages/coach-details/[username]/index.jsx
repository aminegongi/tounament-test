/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Axios from 'axios'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import InfoCoach from '../../../shared/components/InfoCoach/InfoCoach'
import '../../../shared/css/coachDetails.scss'
import Navbar from '../../../shared/components/navbar/Navbar'
import { API, CLUB } from '../../../shared/constants'
import CoachAboutBoxes from '../../../shared/components/ContactCoach/ContactCoach'

import CoachBox from '../../../shared/components/CoachBox/CoachBox'
import CoachAvis from '../../../shared/components/CoachAvis/CoachAvis'
import Biography from '../../../shared/components/Biography/Biography'
import affiche from '../../../public/icon/Banniere.png'
import exclamation from '../../../public/icon/exclamation.png'
import ReservationCours from '../../../shared/components/ReservationCours/ReservationCours'
import AuthContext from '../../../utils/context.utils'
import Layout from '../../../shared/components/layout/Layout'
import routes from '../../../utils/routes'
import { getUserProfilePicture } from '../../../utils/string.utils'

export default function CoachDetails({ coach, jobs, sports, dances }) {
  const router = useRouter()
  // const [coachData, setCoachData] = useState()
  const [specialty, setSpecialty] = useState()
  const [job, setJob] = useState()
  const [tab, setTab] = useState(1)
  const [isContactModalVisible, setIsContactModalVisible] = useState(false)

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
    return <InfoCoach coachProfile={coach} job={job} specialty={specialty} />
  }

  const displayTabs = () => {
    if (coach) {
      if (tab === 1) {
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
      if (tab === 2) {
        return <CoachAvis coachData={coach} />
      }
      if (tab === 3) {
        return (
          <Biography
            coachProfile={coach}
            title="Biographie"
            icon={exclamation}
          />
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

  if (isEmpty(coach.coachData)) {
    return <h1>coach data is missing in the coach object</h1>
  }

  return (
    <>
      <Head>
        <title>
          {coach.firstName} {coach.lastName}
        </title>
        <meta
          name="description"
          content={coach.coachData && coach.coachData.aboutMe}
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
              <div className="tabs">
                <div className="tabs__button">
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 1 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(1)}
                  >
                    A propos
                  </button>
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 2 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(2)}
                  >
                    Avis
                  </button>
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 3 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(3)}
                  >
                    Biographie
                  </button>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      routes.COACH_DETAILS.CALENDAR.linkTo(
                        router.query.username,
                      ),
                    )
                  }
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

CoachDetails.getInitialProps = async ({ query }) => {
  const coachRes = await fetch(`${API}users/coaches/slug/${query.username}`)
  const jobsRes = await fetch(`${API}jobs`)
  const sportsRes = await fetch(`${API}sports`)
  const danceRes = await fetch(`${API}dances/`)
  const regionsRes = await fetch(`${API}regions/`)
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
  }
}
