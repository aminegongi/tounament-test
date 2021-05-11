import React, { useState } from 'react'
import './infoCoach.scss'
import { Rate } from 'antd'
import PropTypes from 'prop-types'
import { getFormattedNumber, getRoundedRate } from '../../../utils/number.utils'

import ReservationCours from '../ReservationCours/ReservationCours'
// import { AuthContext } from '../../../utils/context.utils'
import { getUserProfilePicture } from '../../../utils/string.utils'

export default function InfoCoach({ coachProfile, job, specialty }) {
  const [isModalVisibleReservation, setIsModalVisibleReservation] = useState(
    false,
  )

  const sum = getFormattedNumber(
    coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
      coachProfile.coachData.reviews.length,
    2,
  )

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
    <div className="infocoach">
      <div className="infocoach__firstblock">
        <img
          className="infocoach__img"
          src={getUserProfilePicture(coachProfile.profilePicture)}
          alt=""
        />
      </div>
      <div className="infocoach__secondblock">
        <div className="infocoach_coach__information__name infocoach__firstblock__coach-name">
          {coachProfile.firstName} {coachProfile.lastName}
        </div>
        <div className="infocoach_coach__information__rate">
          <Rate
            className="infocoach_coach__information__rate__icon"
            disabled
            allowHalf
            defaultValue={getRoundedRate(sum)}
            style={{ fontSize: '12px' }}
          />
        </div>

        {job && (
          <div className="infocoach_coach__information__worktype">
            {job.translations.fr}
          </div>
        )}
        {specialty && (
          <div className="infocoach_coach__information__sporttype">
            {specialty &&
              specialty.map((el, index) => {
                if (index !== specialty.length - 1) {
                  return `${el.translations.fr}, `
                }
                return el.translations.fr
              })}
          </div>
        )}
        <div className="infocoach_coach__information__yearexperience">
          {getYearsOfExperience()}
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
  job: PropTypes.objectOf(PropTypes.any),
  specialty: PropTypes.arrayOf(PropTypes.any),
}

InfoCoach.defaultProps = {
  job: { translations: {} },
  specialty: [],
}
