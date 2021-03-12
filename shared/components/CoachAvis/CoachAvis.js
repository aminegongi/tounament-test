import React, { useState } from 'react'
import { Rate, Input } from 'antd';
import  './coachAvis.scss'
import { AVATAR } from '../../constants'
import Answer from '../Answer/Answer';

function CoachAvis({ coachData }) {
    const [sum, setSum] = useState(Math.round((coachData.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coachData.coachData.reviews.length)))
    const [img, setImg] = useState(coachData.profilePicture ?
        "http://isporit.com/api/" + coachData.profilePicture :
        AVATAR)

    return (

        <div className={"coachaviscomposant"}>
            <div className={"coachaviscomposant__sumavis"}>
            {/* {coachData && coachData.coachData && */}
                <span>les {coachData.coachData.reviews.length} avis de {coachData.firstName}</span>
                 <Rate disabled defaultValue={2} />
                <div className={"coachaviscomposant__sumavis__chiffre"}> {sum}/5</div>
            {/* } */}
            </div>
            <div className={"coachaviscomposant__card"}>
                {coach && coach.coachData && coachData.coachData.reviews.map(reviews => (
                    <>
                        <div className={"coachaviscomposant__card__description"}>
                            <div className={"coachaviscomposant__card__description__recommendationMember"}>
                                <img src={"../icon/AvatarCoach.png"} className={"coachaviscomposant__card__description__recommendationMember__avatar"} alt="" />
                                <div className={"coachaviscomposant__card__description__recommendationMember__nameStart"}>
                                    <div className={"coachaviscomposant__card__description__recommendationMember__nameStart__name"}>
                                        Nour jbeli
                                    </div>
                                    <div className={"coachaviscomposant__card__description__recommendationMember__nameStart__start"}>
                                        <Rate disabled defaultValue={reviews.rating} />
                                    </div>
                                </div>
                                <div className={"coachaviscomposant__card__description__recommendationMember__publishdate"}>
                                    il y a  3 jours
                                </div>
                            </div>
                            <div className={"coachaviscomposant__card__description__avis"}>
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
