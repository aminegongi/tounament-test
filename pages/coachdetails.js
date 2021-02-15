import React from 'react'
import HeaderCoachProfile from '../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../shared/components/InfoCoach/InfoCoach'
import css from '../shared/css/coachDetails.scss'
import Navbar from '../shared/components/navbar/Navbar';

export default function CoachDetails() {
    return (
        <>
        <Navbar />

        <div className={css.coach}>
            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/coachdetails.png"} alt="" />
            </div>
            <div className={css.coach__coachdetails}>
                <div className={css.coach__coachdetails__coordinate}>
                    <InfoCoach clubmanagement={"Club management"} />
                </div>
                <div >dfkdf</div>

            </div>
        </div>
        </>
    )
}
