import React from 'react'
import css from './infoCoach.scss'
import { Rate } from 'antd';

export default function InfoCoach() {
    return (
        <div className={css.infocoach}>
            <img  className={css.infocoach__img} src="../icon/AvatarCoach.png" alt="" />
            <div className={css.card_profil_coach__information__name} >
                Yassine Achour
            </div>

            <div className={css.card_profil_coach__information__rate}>
                <Rate disabled defaultValue={2}
                    className={css.rate} />

            </div>
            <div className={css.card_profil_coach__information__worktype}>

                {/* {job.translations.fr} */}
                Professeur de sport Gymnastique

            </div>
            <div className={css.card_profil_coach__information__sporttype}>
                {/* {specialty.translations.fr} */}
                Yoga
            </div>
            <div className={css.card_profil_coach__information__yearexperience}>
                {/* {coachProfile.coachData.experiencesYearsNumber == 1 ?
                    (coachProfile.coachData.experiencesYearsNumber + " an d'expérience") :
                    coachProfile.coachData.experiencesYearsNumber + " ans d'expérience"
                } */}
                2 ans d'epérience
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
    )
}
