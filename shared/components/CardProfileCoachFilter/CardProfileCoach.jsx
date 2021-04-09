import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './cardProfileCoach.scss'
import { Rate } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { AVATAR } from '../../constants'
import ShareLink from '../ShareLink/ShareLink'
import { getUserProfilePicture } from '../../../utils/string.utils'
import routes from '../../../utils/routes'
// import ReservationCours from '../ReservationCours/ReservationCours'
import shareIcon from '../../../public/icon/profileShare.png'
import { getFormattedNumber, getRoundedRate } from '../../../utils/number.utils'

export default function CardProfileCoach({ coachProfile, job, specialty }) {
  const router = useRouter()

  const [isModalVisibleReservation, setIsModalVisibleReservation] = useState(
    false,
  )
  const sum =
    coachProfile.coachData && coachProfile.coachData.reviews
      ? getFormattedNumber(
          coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
            coachProfile.coachData.reviews.length,
          2,
        )
      : 0

  const [linkShow, setLinkShow] = useState(false)
  const ShowLink = () => {
    if (linkShow) {
      setLinkShow(false)
    } else setLinkShow(true)
  }
  return (
    <div className="card_profil_coach">
      <div className="card_profil_coach__information__share">
        <button
          type="button"
          onClick={ShowLink}
          className="isporit-unset-button-css"
        >
          <img src={shareIcon} alt="share icon" className="sharelinkicon" />
        </button>
        {linkShow && (
          <>
            <div />
            <ShareLink coachProfile={coachProfile} />
          </>
        )}
      </div>
      <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
        <a href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <div className="card_profil_coach__information">
            <div className="card_profil_coach__information__avatar">
              <img
                src={getUserProfilePicture(coachProfile.profilePicture)}
                alt="avatar"
              />
            </div>

            <div className="card_profil_coach__information__name">
              {coachProfile.firstName} {coachProfile.lastName}
            </div>

            <div className="card_profil_coach__information__rate">
              <Rate
                allowHalf
                disabled
                defaultValue={getRoundedRate(sum)}
                className="rate"
              />
            </div>
            {
              <div className="card_profil_coach__information__worktype">
                {job && job.translations.fr}
              </div>
            }
            {
              <div className="card_profil_coach__information__sporttype">
                {specialty &&
                  specialty.map((el, index) => {
                    if (index !== specialty.length - 1) {
                      return `${el.translations.fr}, `
                    }
                    return el.translations.fr
                  })}
              </div>
            }
            <div className="card_profil_coach__information__yearexperience">
              {coachProfile.coachData &&
                coachProfile.coachData.experiencesYearsNumber > 1 &&
                `${
                  coachProfile.coachData &&
                  coachProfile.coachData.experiencesYearsNumber
                } ans d'expérience`}
              {coachProfile.coachData &&
                coachProfile.coachData.experiencesYearsNumber === 1 &&
                `1 an d'expérience`}
            </div>
          </div>
        </a>
      </Link>
      <div className="card_profil_coach__button">
        <button
          // onClick={() => setIsModalVisibleReservation(true)}
          onClick={() =>
            router.push(
              routes.COACH_DETAILS.CALENDAR.linkTo(coachProfile.username),
            )
          }
          type="button"
          className="card_profil_coach__button__contact"
        >
          Réserver
        </button>
        <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <a href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
            <button
              type="button"
              className="card_profil_coach__button__seeDetails"
            >
              Voir plus
            </button>
          </a>
        </Link>
      </div>

      {/* <ReservationCours
        coachProfile={coachProfile}
        isModalVisibleReservation={isModalVisibleReservation}
        setIsModalVisibleReservation={setIsModalVisibleReservation}
      /> */}
    </div>
  )
}
CardProfileCoach.propTypes = {
  coachProfile: PropTypes.objectOf(PropTypes.any).isRequired,
  job: PropTypes.arrayOf(PropTypes.any).isRequired,
  specialty: PropTypes.arrayOf(PropTypes.any).isRequired,
}
