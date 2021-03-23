import React, { useState } from 'react'
import { Rate, Input } from 'antd'
import './coachAvis.scss'
import { AVATAR } from '../../constants'
import opps from '../../../public/icon/opps.png'
import AvatarCoach from '../../../public/icon/AvatarCoach.png'

function CoachAvis({ coachData }) {
  const [sum, setSum] = useState(
    Math.round(
      coachData.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
        coachData.coachData.reviews.length,
    ),
  )
  const [img, setImg] = useState(
    coachData.profilePicture
      ? `http://isporit.com/api/${coachData.profilePicture}`
      : AVATAR,
  )

  return (
    <div className="coachaviscomposant">
      {coachData.coachData.reviews.length != 0 ? (
        <>
          <div className="coachaviscomposant__sumavis">
            <span>
              les {coachData.coachData.reviews.length} avis de{' '}
              {coachData.firstName}
            </span>
            <Rate disabled defaultValue={sum} />
            <div className="coachaviscomposant__sumavis__chiffre"> {sum}/5</div>
          </div>
          <div className="coachaviscomposant__card">
            {coachData &&
              coachData.coachData &&
              coachData.coachData.reviews.length != 0 &&
              coachData.coachData.reviews.map((reviews) => {
                return (
                  <div className="coachaviscomposant__card__description">
                    <div className="coachaviscomposant__card__description__recommendationMember">
                      <img
                        src={AvatarCoach}
                        className="coachaviscomposant__card__description__recommendationMember__avatar"
                        alt="AvatarCoach"
                      />
                      <div className="coachaviscomposant__card__description__recommendationMember__nameStart">
                        <div className="coachaviscomposant__card__description__recommendationMember__nameStart__name">
                          Nour jbeli
                        </div>
                        <Rate
                          className="coachaviscomposant__card__description__recommendationMember__nameStart__rate"
                          disabled
                          defaultValue={reviews.rating}
                        />
                      </div>
                      <div className="coachaviscomposant__card__description__recommendationMember__publishdate">
                        <span>il y a 3 jours</span>
                      </div>
                    </div>
                    <div className="coachaviscomposant__card__description__avis">
                      {reviews.answer}
                    </div>
                  </div>
                )
              })}
          </div>
        </>
      ) : (
        <div className="aucunBiographie">
          <img src={opps} alt="icon" />
          <div className="aucunBiographie__title">OOPS</div>
          <div className="aucunBiographie__message">Aucune Avis trouvée</div>
        </div>
      )}
    </div>
  )
}

export default CoachAvis
