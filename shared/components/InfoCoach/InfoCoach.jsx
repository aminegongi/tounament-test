import React, { useContext, useState } from 'react'
import './infoCoach.scss'
import Link from 'next/link'
import { Rate } from 'antd'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useMediaPredicate } from 'react-media-hook'
import circleIcon from '../../../public/icon/cercle.png'
import ReservationCours from '../ReservationCours/ReservationCours'
import { AuthContext } from '../../../utils/context.utils'
import { getUserProfilePicture } from '../../../utils/string.utils'

import { CLUB } from '../../constants'
import routes from '../../../utils/routes'

export default function InfoCoach({ coachProfile, job, specialty }) {
  const isMobile = useMediaPredicate('(max-width: 992px)')
  const [isModalVisibleReservation, setIsModalVisibleReservation] = useState(
    false,
  )
  const router = useRouter()

  const authContext = useContext(AuthContext)

  const [sum, setSum] = useState(
    Math.round(
      coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
        coachProfile.coachData.reviews.length,
    ),
  )

  const onOpenContactModal = () => {
    return setIsModalVisibleReservation(true)
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
    <div className="infocoach">
      <div className="infocoach__firstblock">
        <img
          className="infocoach__img"
          src={getUserProfilePicture(coachProfile.profilePicture)}
          alt=""
        />
        <div className="infocoach_coach__information__name infocoach__firstblock__coach-name">
          {router.pathname !== routes.COACH_DETAILS.PROFILE.path ? (
            <Link
              href={routes.COACH_DETAILS.PROFILE.linkTo(router.query.username)}
            >
              <a
                href={routes.COACH_DETAILS.PROFILE.linkTo(
                  router.query.username,
                )}
              >
                {coachProfile.firstName} {coachProfile.lastName}
              </a>
            </Link>
          ) : (
            `${coachProfile.firstName} ${coachProfile.lastName}`
          )}
        </div>
        <div className="infocoach_coach__information__rate">
          <Rate
            className="infocoach_coach__information__rate__icon"
            disabled
            defaultValue={sum}
          />
        </div>
      </div>
      <div className="infocoach__secondblock">
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
        <div className="suggestcoachdetails">
          <div className="suggestcoachdetails__suggestPrivateCourse">
            <img
              className={`suggestcoachdetails__suggestPrivateCourse__img `}
              src={circleIcon}
              alt=""
            />
            <div className="suggestcoachdetails__suggestPrivateCourse__propose">
              Propose des cours privés{' '}
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onOpenContactModal}
              type="submit"
              className="buttoncontactcoach"
            >
              Réserver
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
