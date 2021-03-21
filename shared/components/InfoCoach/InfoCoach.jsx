import React, { useContext, useState } from 'react'
import './infoCoach.scss'
import { Rate } from 'antd'
import PropTypes from 'prop-types'
import circleIcon from '../../../public/icon/cercle.png'
import ReservationCours from '../ReservationCours/ReservationCours'
import { AuthContext } from '../../../utils/context.utils'
import { getUserProfilePicture } from '../../../utils/string.utils'
import { CLUB } from '../../constants'

export default function InfoCoach({ coachProfile, job, specialty }) {
  const [isModalVisibleReservation, setIsModalVisibleReservation] = useState(
    false,
  )

  const authContext = useContext(AuthContext)

  const [sum, setSum] = useState(
    Math.round(
      coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
        coachProfile.coachData.reviews.length,
    ),
  )

  const isCoachOpenForWork = () => {
    if (authContext.isLoggedIn) {
      if (
        authContext.userType === CLUB &&
        coachProfile.coachData &&
        !coachProfile.coachData.lookingForJob
      ) {
        return false
      }
      if (
        authContext.userType !== CLUB &&
        coachProfile.coachData &&
        coachProfile.coachData.privateCourseData &&
        !coachProfile.coachData.privateCourseData.givePrivateCourse
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
      return setIsModalVisibleReservation(true)
    }
    return null
  }

  const getYearsOfExperience = () => {
    if (
      coachProfile.coachData &&
      coachProfile.coachData.experiencesYearsNumber
    ) {
      if (coachProfile.coachData.experiencesYearsNumber === 1) {
        return `${coachProfile.coachData.experiencesYearsNumber} an d'expérience`
      }
      return `${coachProfile.coachData.experiencesYearsNumber} ans d'expérience`
    }
    return ''
  }

  return (
    <div className={`infocoach `}>
      <div className="infocoach__firstblock">
        <img
          className="infocoach__img"
          src={getUserProfilePicture(coachProfile.profilePicture)}
          alt=""
        />
        <div className="card_profil_coach__information__name infocoach__firstblock__coach-name">
          {coachProfile.firstName} {coachProfile.lastName}
        </div>
        <div className="card_profil_coach__information__rate">
          <Rate
            className="card_profil_coach__information__rate__icon"
            disabled
            defaultValue={sum}
          />
        </div>
      </div>
      <div className="infocoach__secondblock">
        {job && (
          <div className="card_profil_coach__information__worktype">
            {job.translations.fr}
          </div>
        )}
        {specialty && (
          <div className="card_profil_coach__information__sporttype">
            {specialty.translations ? specialty.translations.fr : ''}
          </div>
        )}
        <div className="card_profil_coach__information__yearexperience">
          {getYearsOfExperience()}
        </div>
        <div className="suggestcoachdetails">
          <div className="suggestcoachdetails__suggestPrivateCourse">
            <img
              className={`suggestcoachdetails__suggestPrivateCourse__img `}
              src={circleIcon}
              alt=""
            />
            <div className="suggestcoachdetails__suggestPrivateCourse__propose">
              Propose de cours privé{' '}
            </div>
          </div>
          {isCoachOpenForWork() && (
            <button
              onClick={onOpenContactModal}
              type="submit"
              className="buttoncontactcoach"
            >
              contacter
            </button>
          )}
        </div>
      </div>
      <ReservationCours
        coachProfile={coachProfile}
        isModalVisibleReservation={isModalVisibleReservation}
        setIsModalVisibleReservation={setIsModalVisibleReservation}
      />
    </div>
  )
}

InfoCoach.propTypes = {
  coachProfile: PropTypes.objectOf(PropTypes.any).isRequired,
  job: PropTypes.arrayOf(PropTypes.any).isRequired,
  specialty: PropTypes.arrayOf(PropTypes.any).isRequired,
}
