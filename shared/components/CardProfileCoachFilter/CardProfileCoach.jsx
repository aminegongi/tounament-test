import React, { useState, useEffect } from 'react'
import './cardProfileCoach.scss'
import { Rate } from 'antd'
import Link from 'next/link'
import { AVATAR } from '../../constants'
import ShareLink from '../ShareLink/ShareLink'
import getUserProfilePicture from '../../../utils/string.utils'
import routes from '../../../utils/routes'

export default function CardProfileCoach({
  coachProfile,
  key,
  job,
  specialty,
}) {
  const [img, setimg] = useState(
    // coachProfile.profilePicture
    //   ? `http://dev.isporit.com/api/${coachProfile.profilePicture}`
    //   :
    AVATAR,
    //   ,
  )
  const [sum, setSum] = useState(
    Math.round(
      coachProfile.coachData &&
        coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
          coachProfile.coachData &&
        coachProfile.coachData.reviews.length,
    ),
  )
  const [linkShow, setLinkShow] = useState(false)
  const ShowLink = () => {
    if (linkShow) {
      setLinkShow(false)
    } else setLinkShow(true)
  }
  return (
    <div className="card_profil_coach">
      <div className="card_profil_coach__information__share">
        <img src="../icon/shareicon.png" onClick={ShowLink} alt="share" />
        {linkShow && (
          <>
            <div />
            <ShareLink coachProfile={coachProfile} />
          </>
        )}
      </div>
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
          <Rate disabled defaultValue={sum} className="rate" />
        </div>
        {
          <div className="card_profil_coach__information__worktype">
            {job && job.translations.fr}
          </div>
        }
        {
          <div className="card_profil_coach__information__sporttype">
            {specialty && specialty.translations
              ? specialty.translations.fr
              : ''}
          </div>
        }
        <div className="card_profil_coach__information__yearexperience">
          {coachProfile.coachData &&
            coachProfile.coachData.experiencesYearsNumber >= 1 &&
            `${
              coachProfile.coachData &&
              coachProfile.coachData.experiencesYearsNumber
            } ans d'expérience`}
          {coachProfile.coachData &&
            coachProfile.coachData.experiencesYearsNumber === 1 &&
            `1 an d'expérience`}
        </div>
      </div>
      <div className="card_profil_coach__button">
        <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <button type="button" className="card_profil_coach__button__contact">
            Contacter
          </button>
        </Link>
        {/* <div className={"linevertical"}></div>  */}
        <Link href={routes.COACH_DETAILS.PROFILE.linkTo(coachProfile.username)}>
          <button
            type="button"
            className="card_profil_coach__button__seeDetails"
          >
            Voir plus
          </button>
        </Link>
      </div>
    </div>
  )
}
