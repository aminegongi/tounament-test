import React from 'react'
import HeaderCoachProfile from '../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../shared/components/InfoCoach/InfoCoach'
import css from '../shared/css/coachDetails.scss'

export default function CoachDetails() {
    return (
        <div className={css.coach}>
            <HeaderCoachProfile />
            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/coachdetails.png"} alt="" />
            </div>
            <div className={css.coach__coachdetails}>
                <div className={css.coach__coachdetails__coordinate}>
                    <InfoCoach clubmanagement={"Club management"} />
                </div>
            </div>
        </div>
    )
}
