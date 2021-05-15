import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './cardProfileCoach.scss'
// import { Rate } from 'antd'
import Link from 'next/link'
import moment from 'moment'
import {
  getUserProfilePicture,
  cutString,
  getPackagesAndFirstSession,
} from '../../../utils/string.utils'
import routes from '../../../utils/routes'
// import { getFormattedNumber, getRoundedRate } from '../../../utils/number.utils'
import DEFAULT_USER_AVATAR from '../../../public/default_user_avatar.png'
import { isSessionPricesEmpty } from '../CoachBox/CoachBox'
import availableIcon from '../../../public/icon/available.png'
import notAvailableIcon from '../../../public/icon/notAvailable.png'

export default function CardProfileCoach({ coachProfile, job, specialty }) {
  const [cheapestPrice, setCheapestPrice] = useState()
  const [firstSessionPrice, setFirstSessionPrice] = useState(-1)
  // const sum =
  //   coachProfile.coachData && coachProfile.coachData.reviews
  //     ? getFormattedNumber(
  //         coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
  //           coachProfile.coachData.reviews.length,
  //         2,
  //       )
  //     : 0
  const picture = getUserProfilePicture(coachProfile.profilePicture)
  const isDefaultAvatar = picture === DEFAULT_USER_AVATAR

  useEffect(() => {
    if (coachProfile) {
      const result = getPackagesAndFirstSession(coachProfile)
      if (result) {
        setCheapestPrice(result.cheapestPrice)
        setFirstSessionPrice(result.firstSessionPrice)
      }
    }
  }, [coachProfile])

  const displayAvailbleFrom = () => {
    const firstAvailability =
      coachProfile.coachData && coachProfile.coachData.firstAvailability
    if (firstAvailability) {
      return (
        <div className="card_profil_coach__available-from">
          disponible à partir du
          <div className="card_profil_coach__available-from__value">
            {moment(firstAvailability.startTime).format('dddd DD MMMM')}
          </div>
        </div>
      )
    }
    return ''
  }

  const displayAvaialbleForOnlineSession = () => {
    const isHasOnlineSessions = () => {
      if (!isSessionPricesEmpty(coachProfile.coachData)) {
        return coachProfile.coachData.privateCourseData.sessionPrices.find(
          (el) => el.type === 'online' || el.type === 'mixed',
        )
      }
      return false
    }
    if (isHasOnlineSessions()) {
      return (
        <div className="card_profil_coach__available-for-online-session">
          donne des cours <span>en ligne</span>
        </div>
      )
    }
    return ''
  }

  return (
    <div className="card_profil_coach">
      <div className="card_profil_coach__information__share" />
      <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
        <a href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <div className="card_profil_coach__information">
            <div className="card_profil_coach__information__avatar">
              <div className="card_profil_coach__information__avatar__available">
                {coachProfile.coachData &&
                coachProfile.coachData.firstAvailability ? (
                  <img
                    alt="disponible"
                    src={availableIcon}
                    className="card_profil_coach__information__avatar__available__img"
                  />
                ) : (
                  <img
                    alt="no disponible"
                    src={notAvailableIcon}
                    className="card_profil_coach__information__avatar__available__img"
                  />
                )}
              </div>
              <img
                className="card_profil_coach__information__avatar__img"
                src={picture}
                alt="avatar"
                style={
                  isDefaultAvatar
                    ? {
                        width: '180px !important',
                        objectFit: 'contain',
                        objectPosition: 'unset',
                      }
                    : {}
                }
              />
            </div>

            <div className="card_profil_coach__information__name">
              <span>{cutString(`${coachProfile.firstName}`, 15)}</span>
              <span
                className="card_profil_coach__information__name__mobile"
                style={{ display: 'none' }}
              >
                {coachProfile.firstName} {coachProfile.lastName}
              </span>
            </div>

            {/* <div className="card_profil_coach__information__rate">
              <Rate
                allowHalf
                disabled
                defaultValue={getRoundedRate(sum)}
                className="rate"
              />
            </div> */}
            {
              <div className="card_profil_coach__information__worktype">
                {job && job.translations && job.translations.fr}{' '}
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
            {(cheapestPrice || firstSessionPrice !== -1) && (
              <div
                style={{
                  display: 'flex',
                  color: 'black',
                  fontSize: '13px',
                  justifyContent: 'center',
                  padding: '10px 10px 10px 10px',
                }}
              >
                {cheapestPrice && (
                  <div className="">
                    Dès{' '}
                    <span style={{ color: '#ff8760', fontSize: '13px' }}>
                      <b>{cheapestPrice} DT</b>
                    </span>
                  </div>
                )}
                {firstSessionPrice !== -1 && cheapestPrice && <> - </>}
                {firstSessionPrice !== -1 && (
                  <div className="">
                    1ère séance{' '}
                    <span style={{ color: '#ff8760', fontSize: '13px' }}>
                      <b> {firstSessionPrice}</b>
                    </span>
                  </div>
                )}
              </div>
            )}
            {displayAvailbleFrom()}
            {displayAvaialbleForOnlineSession()}
          </div>
        </a>
      </Link>
      <div className="card_profil_coach__button">
        <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <a href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
            <button
              type="button"
              className="card_profil_coach__button__seeDetails"
            >
              Voir profil
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}
CardProfileCoach.propTypes = {
  coachProfile: PropTypes.objectOf(PropTypes.any).isRequired,
  job: PropTypes.objectOf(PropTypes.any),
  specialty: PropTypes.arrayOf(PropTypes.any),
}

CardProfileCoach.defaultProps = {
  job: {},
  specialty: [],
}
