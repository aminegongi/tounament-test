import React from 'react'
import '../shared/css/coachRecruitment.scss'
import Navbar from '../shared/components/navbar/Navbar';

function CoachRecruitment() {
    return (
        <div className="recruitment">
            <Navbar />
            <div className={"affiche"}>
                    <img className={"affiche__img"} src={"../../../icon/profil_coach.png"} alt="" />
                </div>
            <div className="recruitment__icontitle">
                <div className="recruitment__icon">
                    <img src={"../../../icon/recruter.png"} alt=""/>
                </div>
                <div className="recrutment__title">
                    Récruter l'entraineur
                 </div>
            </div>
            <div className="recruitment__message">

            </div>
            <button></button>

        </div>
    )
}

export default CoachRecruitment
