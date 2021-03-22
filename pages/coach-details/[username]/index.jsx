/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
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

export default function CoachDetails({ coachesList, jobs, sports, dances }) {
  const router = useRouter()
  const [coachData, setCoachData] = useState()
  const [tab, setTab] = useState(3)
  const [isContactModalVisible, setIsContactModalVisible] = useState(false)

  const authContext = useContext(AuthContext)

  const isCoachOpenForWork = () => {
    if (authContext.isLoggedIn) {
      if (
        authContext.userType === CLUB &&
        coachesList.coachData &&
        !coachesList.coachData.lookingForJob
      ) {
        return false
      }
      if (
        authContext.userType !== CLUB &&
        coachesList.coachData &&
        coachesList.coachData.privateCourseData &&
        !coachesList.coachData.privateCourseData.givePrivateCourse
      ) {
        return false
      }
    }
    if (!authContext.isLoggedIn) {
      return true
    }
    return true
  }
  const onOpenContactModal = () => {
    if (!authContext.isLoggedIn) {
      return authContext.toggleLogInModal()
    }
    if (isCoachOpenForWork()) {
      return setIsContactModalVisible(true)
    }
    return null
  }

  const renderCoachProfile = () => {
    const job = jobs.find((j) => j._id === coachData.coachData.job)

    let specialty = ''
    if (job.specialty && job.specialty.type === 'sport') {
      specialty = sports.find(
        (sport) => sport._id === coachData.coachData.specialty,
      )
    } else if (job.specialty && job.specialty.type === 'dance') {
      specialty = dances.find(
        (dance) => dance._id === coachData.coachData.specialty,
      )
    }
    return (
      <InfoCoach
        coachProfile={coachData}
        key={coachData._id}
        job={job}
        specialty={specialty}
      />
    )
  }

  const displayTabs = () => {
    if (coachData) {
      if (tab === 1) {
        return (
          <div className="tabsinfo__title">
            <CoachBox
              coachData={coachesList.coachData}
              iconExclamation={exclamation}
            />
          </div>
        )
      }
      if (tab === 2) {
        return <CoachAvis coachData={coachesList} />
      }
      if (tab === 3) {
        return (
          <Biography
            coachData={coachData}
            title="Biographie"
            icon={exclamation}
          />
        )
      }
    }
  }

  useEffect(() => {
    setCoachData(coachesList)
  }, [router.query.id])

  return (
    <>
      <Navbar />
      <div className="coach">
        <div className="affiche">
          <img className="affiche__img" src={affiche} alt="affiche" />
        </div>
        <div className="coach__coachdetails">
          <div className="coach__cordonneBlock">
            <div className="coach__coachdetails__contact">
              {coachData && jobs && renderCoachProfile(coachData)}
            </div>
            <div className="coach__coachdetails__information">
              {coachesList ? <CoachAboutBoxes coachData={coachesList} /> : ''}
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
                onClick={onOpenContactModal}
                type="button"
                className="isporit-primary-button tabs__contact"
              >
                Contacter
              </button>
            </div>
            {/* <div className="linetabs" /> */}
            {displayTabs()}
          </div>
        </div>

        <ReservationCours
          coachProfile={coachesList}
          isModalVisibleReservation={isContactModalVisible}
          setIsModalVisibleReservation={setIsContactModalVisible}
        />
      </div>
    </>
  )
}

CoachDetails.propTypes = {
  coachesList: PropTypes.objectOf(PropTypes.any).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.any).isRequired,
  sports: PropTypes.arrayOf(PropTypes.any).isRequired,
  dances: PropTypes.arrayOf(PropTypes.any).isRequired,
}

CoachDetails.getInitialProps = async ({ query }) => {
  const coachesRes = await fetch(`${API}users/slug/${query.username}`)
  const jobsRes = await fetch(`${API}jobs`)
  const sportsRes = await fetch(`${API}sports`)
  const danceRes = await fetch(`${API}dances/`)
  const regionsRes = await fetch(`${API}regions/`)
  const jsonCoachesRes = await coachesRes.json()
  const jsonJobsRes = await jobsRes.json()
  const jsonSportsRes = await sportsRes.json()
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coachesList: jsonCoachesRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes,
  }
}
