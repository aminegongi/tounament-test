import React, { useState } from 'react'
import { Rate, Input } from 'antd'
import './coachAvis.scss'
import { AVATAR } from '../../constants'
import opps from '../../../public/icon/opps.png'
import AvatarCoach from '../../../public/icon/AvatarCoach.png'
import { getUserProfilePicture } from './../../../utils/string.utils';
import moment from 'moment'
import { getFormattedNumber, getRoundedRate } from '../../../utils/number.utils'

function CoachAvis({ coach }) {
  
  // const [sum, setSum] = useState(
 
      const sum= getFormattedNumber(coach.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
        coach.coachData.reviews.length,2)
    
  // )


  return (
    <div className="coachaviscomposant">
      {coach.coachData.reviews.length != 0 ? (
        <>
          <div className="coachaviscomposant__sumavis">
            <span>
              Les {coach.coachData.reviews.length} avis de{' '}
              {coach.firstName[0].toUpperCase() + coach.firstName.slice(1)}
            </span>
            <Rate allowHalf disabled defaultValue={getRoundedRate(sum)} />
            <div className="coachaviscomposant__sumavis__chiffre"> {sum}/5</div>
          </div>
          <div className="coachaviscomposant__card">
            {coach &&
              coach.coachData &&
              coach.coachData.reviews.length != 0 &&
              coach.coachData.reviews.map((review) => {
                console.log('review: ', review);
                return (
                  <>
                    <div className="coachaviscomposant__card__description">
                      <div className="coachaviscomposant__card__description__recommendationMember">
                        <img
                          src={getUserProfilePicture(review.profilePicture)}
                          className="coachaviscomposant__card__description__recommendationMember__avatar"
                          alt="AvatarCoach"
                        />
                        <div className="coachaviscomposant__card__description__recommendationMember__nameStart">
                          <div className="coachaviscomposant__card__description__recommendationMember__nameStart__name">
                            {review.reviewer.firstName[0] +
                              review.reviewer.firstName.slice(1)}{' '}
                            {review.reviewer.lastName[0] +
                              review.reviewer.lastName.slice(1)}
                          </div>
                          <Rate
                            className="coachaviscomposant__card__description__recommendationMember__nameStart__rate"
                            disabled
                            defaultValue={review.rating}
                          />
                        </div>
                        <div className="coachaviscomposant__card__description__recommendationMember__publishdate">
                          <span>{moment(review.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className="coachaviscomposant__card__description__avis">
                        {review.title}
                      </div>

                      {review.answer && (
                        <div className="coachaviscomposant__card__description__recommendationMember__answer">
                          <div className="coachaviscomposant__card__description__recommendationMember isporit-no-padding">
                            <img
                              src={getUserProfilePicture(coach.profilePicture)}
                              className="coachaviscomposant__card__description__recommendationMember__avatar"
                              alt="AvatarCoach"
                            />
                            <div className="coachaviscomposant__card__description__recommendationMember__nameStart">
                              <div className="coachaviscomposant__card__description__recommendationMember__nameStart__name">
                                Le coach
                              </div>
                            </div>
                            <div className="coachaviscomposant__card__description__recommendationMember__publishdate">
                              <span>{moment(review.updatedAt).fromNow()}</span>
                            </div>
                            <div className="coachaviscomposant__card__description__answer">
                              {review.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )
              })}
          </div>
        </>
      ) : (
        <div className="aucunBiographie">
          <img src={opps} alt="icon" />
          <div className="aucunBiographie__title">OOPS</div>
          <div className="aucunBiographie__message">Aucun Avis trouvé</div>
        </div>
      )}
    </div>
  )
}

export default CoachAvis
