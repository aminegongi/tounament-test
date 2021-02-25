import React, { useState } from 'react'
import css from './infoCoach.scss'
import { Rate } from 'antd';
import { AVATAR } from '../../constants'

export default function InfoCoach({ coachProfile, key, job, specialty }) {
    const [img, setimg] = useState(coachProfile.profilePicture ?
        "http://isporit.com/api/" + coachProfile.profilePicture :
        AVATAR)

    const [sum, setSum] = useState(Math.round((coachProfile.map(coach => coach.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coach.coachData.reviews.length))))

    return (
        coachProfile ?
            coachProfile.map((coach) =>
                <div className={css.infocoach}>
                    <img className={css.infocoach__img} src={img} alt="" />
                    <div className={css.card_profil_coach__information__name} >
                        {coach.firstName + coach.lastName}

                    </div>

                    <div className={css.card_profil_coach__information__rate}>
                        <Rate disabled defaultValue={sum}
                            className={css.rate} />

                    </div>
                    <div className={css.card_profil_coach__information__worktype}>

                        {job.translations.fr}


                    </div>
                    <div className={css.card_profil_coach__information__sporttype}>
                        {specialty.translations.fr}
                    </div>
                    <div className={css.card_profil_coach__information__yearexperience}>
                        {coach.coachData.experiencesYearsNumber == 1 ?
                            (coach.coachData.experiencesYearsNumber + " an d'expérience") :
                            coach.coachData.experiencesYearsNumber + " ans d'expérience"
                        }
                    </div>
                    <div className={css.suggestcoachdetails}>
                        <div className={css.suggestcoachdetails__suggestPrivateCourse}>
                            <img className={css.suggestcoachdetails__suggestPrivateCourse__img} src="../icon/cercle.png"
                                alt=""></img>
                            <div className={css.suggestcoachdetails__suggestPrivateCourse__propose}>Propose de cours privé </div>
                        </div>
                        <button className={css.buttoncontact}>contacter</button>

                    </div>
                </div>
            ) : ""
    )
}
