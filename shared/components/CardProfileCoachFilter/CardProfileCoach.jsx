import React, { useState, useEffect } from 'react'
import './cardProfileCoach.scss'
import { Rate } from 'antd'
import Link from 'next/link'
import { AVATAR } from '../../constants'
import ShareLink from '../ShareLink/ShareLink'

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
      coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
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
          <img src={img} alt="avatar" />
        </div>

        <div className="card_profil_coach__information__name">
          {coachProfile.firstName} {coachProfile.lastName}
        </div>

        <div className="card_profil_coach__information__rate">
          <Rate disabled defaultValue={sum} className="rate" />
        </div>
        <div className="card_profil_coach__information__worktype">
          {job.translations.fr}
        </div>
        <div className="card_profil_coach__information__sporttype">
          {specialty && specialty.translations ? specialty.translations.fr : ''}
        </div>
        <div className="card_profil_coach__information__yearexperience">
          {coachProfile.coachData.experiencesYearsNumber == 1
            ? `${coachProfile.coachData.experiencesYearsNumber} an d'expérience`
            : coachProfile.coachData.experiencesYearsNumber == null
            ? " zero ans d'expérience"
            : `${coachProfile.coachData.experiencesYearsNumber} ans d'expérience`}
        </div>
      </div>
      <div className="lineprofilecoach" />
      <div className="card_profil_coach__button">
        <button className="card_profil_coach__button__contact">
          Contacter
        </button>
        {/* <div className={"linevertical"}></div>  */}
        <Link href={`/coach-details/${coachProfile.username}`}>
          <button className="card_profil_coach__button__seeDetails">
            Voir plus
          </button>
        </Link>
      </div>
    </div>
  )
}
