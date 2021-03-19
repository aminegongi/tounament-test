import React, { useState } from 'react'
import './infoCoach.scss'
import { Rate } from 'antd'
import circleIcon from '../../../public/icon/cercle.png'
import { AVATAR } from '../../constants'

export default function InfoCoach({
  coachcalander,
  coachProfile,
  key,
  job,
  specialty,
}) {
  const [img, setImg] = useState(
    coachProfile.profilePicture
      ? `http://isporit.com/api/${coachProfile.profilePicture}`
      : AVATAR,
  )

  const [sum, setSum] = useState(
    Math.round(
      coachProfile.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
        coachProfile.coachData.reviews.length,
    ),
  )

  return (
    coachProfile && (
      <div
        className={`infocoach ${coachcalander ? 'coachcalander' : 'infocoach'}`}
      >
        <div className="infocoach__firstblock">
          <img
            className={`infocoach__img ${
              coachcalander ? 'coachcalander__img' : ''
            }`}
            src={img}
            alt="mg"
          />
          <div className="card_profil_coach__information__name">
            {coachProfile.firstName} {coachProfile.lastName}
          </div>
          <div className="card_profil_coach__information__rate">
            <Rate disabled defaultValue={sum} className="rate" />
          </div>
        </div>
        <div className="infocoach__secondblock">
          <div className="card_profil_coach__information__worktype">
            {job.translations.fr}
          </div>
          <div className="card_profil_coach__information__sporttype">
            {specialty && specialty.translations && specialty.translations.fr}
          </div>
          <div className="card_profil_coach__information__yearexperience">
            {coachProfile &&
            coachProfile.coachData &&
            coachProfile.coachData.experiencesYearsNumber == 1
              ? `${coachProfile.coachData.experiencesYearsNumber} an d'expérience`
              : `${coachProfile.coachData.experiencesYearsNumber} ans d'expérience`}
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
            <button type="submit" className="buttoncontactcoach">
              contacter
            </button>
          </div>
        </div>
      </div>
    )
  )
}
