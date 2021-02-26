import React, { useState } from 'react'
import { Rate, Input } from 'antd';
import css from './coachAvis.scss'
import { AVATAR } from '../../constants'
import Answer from '../Answer/Answer';

function CoachAvis({ coachData }) {
    const [sum, setSum] = useState(Math.round((coachData.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coachData.coachData.reviews.length)))
    const [img, setimg] = useState(coachData.profilePicture ?
        "http://isporit.com/api/" + coachData.profilePicture :
        AVATAR)

    return (

        <div className={css.coachavis}>
            <div className={css.coachavis__sumavis}>
                <span>les {coachData.coachData.reviews.length} avis de {coachData.firstName}</span> <Rate disabled defaultValue={2} />
                <div className={css.coachavis__sumavis__chiffre}> {sum}/5</div>
            </div>
            <div className={css.coachavis__card}>
                {coachData.coachData.reviews.map(reviews => (
                    <>
                        <div className={css.coachavis__card__description}>
                            <div className={css.coachavis__card__description__recommendationMember}>
                                <img src={"../icon/AvatarCoach.png"} className={css.coachavis__card__description__recommendationMember__avatar} alt="" />
                                <div className={css.coachavis__card__description__recommendationMember__nameStart}>
                                    <div className={css.coachavis__card__description__recommendationMember__nameStart__name}>
                                        Nour jbeli
                                    </div>
                                    <div className={css.coachavis__card__description__recommendationMember__nameStart__start}>
                                        <Rate disabled defaultValue={reviews.rating} />
                                    </div>
                                </div>
                                <div className={css.coachavis__card__description__recommendationMember__publishdate}>
                                    il y a  3 jours
                                </div>
                            </div>
                            <div className={css.coachavis__card__description__avis}>
                               {reviews.answer}
                            </div>
                            <Answer  />
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default CoachAvis
