import React, { useState, useEffect } from 'react'
import css from './cardProfileCoach.scss'
import { Rate, Pagination } from 'antd';
import { AVATAR } from '../../constants'

export default function CardProfileCoach({ coachProfile, key, job, specialty, pagename }) {
    const [img, setimg] = useState(coachProfile.profilePicture ?
        "http://isporit.com/api/" + coachProfile.profilePicture :
        AVATAR)
    const [sum, setSum] = useState(Math.round((coachProfile.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coachProfile.coachData.reviews.length)))

    console.log("pagename", pagename)
    return (


        <div className={css.card_profil_coach}>


            <div className={css.card_profil_coach__information} >
                <div className={css.card_profil_coach__information__avatar} >
                    <img src=
                        {img}
                    />
                </div>
                <div className={css.card_profil_coach__information__name} >
                    {coachProfile.firstName}{' '}{coachProfile.lastName}
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
                    {coachProfile.coachData.experiencesYearsNumber == 1 ?
                        (coachProfile.coachData.experiencesYearsNumber + " an d'expérience") :
                        coachProfile.coachData.experiencesYearsNumber + " ans d'expérience"
                    }
                </div>



            </div>
            <div className={css.line}></div>
            {pagename == "coachdetails" ?
                <div className={css.card_profil_coach__suggestcoachdetails}>
                    <div className={css.card_profil_coach__suggestcoachdetails__suggestPrivateCourse}>
                        <img src="data:image/png;base64,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"
                        alt=""></img>
                        <div className={css.card_profil_coach__suggestcoachdetails__suggestPrivateCourse__propose}>Propose de cours privé </div>
                    </div>
                    <button className={css.buttoncontact}>contacter</button>

                </div>
                :
                <div className={css.card_profil_coach__button}>
                    <button className={css.card_profil_coach__button__contact}>
                        Contacter
                    </button>
                    {/* <div className={css.linevertical}></div>  */}

                    <button className={css.card_profil_coach__button__seeDetails}>
                        Voir plus
                    </button>

                </div>
            }

        </div>
    )
}
