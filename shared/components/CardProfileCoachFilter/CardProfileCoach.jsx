import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './cardProfileCoach.scss'
import { Rate } from 'antd'
import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { AVATAR } from '../../constants'
// import ShareLink from '../ShareLink/ShareLink'
// import { isEmpty } from 'lodash'
import { getUserProfilePicture, cutString } from '../../../utils/string.utils'
import routes from '../../../utils/routes'
// import ReservationCours from '../ReservationCours/ReservationCours'
// import shareIcon from '../../../public/icon/profileShare.png'
import { getFormattedNumber, getRoundedRate } from '../../../utils/number.utils'
import DEFAULT_USER_AVATAR from '../../../public/default_user_avatar.png'
import { isSessionPricesEmpty } from './../CoachBox/CoachBox'
import availableIcon from '../../../public/icon/available.png'
import notAvailableIcon from '../../../public/icon/notAvailable.png'
export default function CardProfileCoach({ coachProfile, job, specialty }) {
  // const router = useRouter()

  // const [isModalVisibleReservation, setIsModalVisibleReservation] = useState(
  //   false,
  // )
  const [cheapestPrice, setCheapestPrice] = useState()
  const [firstSessionPrice, setFirstSessionPrice] = useState(-1)
  const sum =
    coachProfile.coachData && coachProfile.coachData.reviews
      ? getFormattedNumber(
          coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
            coachProfile.coachData.reviews.length,
          2,
        )
      : 0

  // const [linkShow, setLinkShow] = useState(false)
  // const ShowLink = () => {
  //   if (linkShow) {
  //     setLinkShow(false)
  //   } else setLinkShow(true)
  // }
  const picture = getUserProfilePicture(coachProfile.profilePicture)
  const isDefaultAvatar = picture === DEFAULT_USER_AVATAR

  const getPackagesAndFirstSession = () => {
    let cheapestPrice
    if (!isSessionPricesEmpty(coachProfile.coachData)) {
      cheapestPrice = coachProfile.coachData.privateCourseData.sessionPrices
        .slice()
        .sort((a, b) => a.price - b.price)[0].price
      let firstSessionPrice =
        coachProfile.coachData.privateCourseData.isporitPriceFirstSession
      console.log(
        'firstSessionPrice: ',
        firstSessionPrice,
        coachProfile.lastName,
      )
      if (firstSessionPrice === undefined) {
        firstSessionPrice = -1
      } else if (firstSessionPrice === 0) {
        firstSessionPrice = ' Gratuite'
      } else {
        firstSessionPrice += ' DT'
      }
      // if (firstSessionPrice !== undefined && firstSessionPrice !== -1) {
      // }
      return { cheapestPrice, firstSessionPrice }
    }
  }

  useEffect(() => {
    if (coachProfile) {
      const result = getPackagesAndFirstSession()
      if (result) {
        setCheapestPrice(result.cheapestPrice)
        setFirstSessionPrice(result.firstSessionPrice)
      }
    }
  }, [coachProfile])
  return (
    <div className="card_profil_coach">
      <div className="card_profil_coach__information__share">
        {/* <button
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
        )} */}
      </div>
      <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
        <a href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <div className="card_profil_coach__information">
            <div className="card_profil_coach__information__avatar">
              <div className="card_profil_coach__information__avatar__available">
                {coachProfile.coachData &&
                coachProfile.coachData.isAvailable ?
                 (
                  <img
                    src={availableIcon}
                    className="card_profil_coach__information__avatar__available__img"
                  />
                ) : (
                  <img
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
                {job && job.translations.fr}{' '}
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
