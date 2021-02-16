import React from 'react'
import css from './infoCoach.scss'
export default function InfoCoach() {
    return (
        <div className={css.infocoach}>
            <img src="../icon/AvatarCoach.png" alt="" />
            <div className={css.infocoach__coachName}>Amira skhiri</div>
            <div className={css.infocoach__coachName}>Amira skhiri</div>
            <div className={css.infocoach__coachjob}>Professeur de sport</div>
            <div className={css.infocoach__specialty}>Gymnastique</div>
            <div className={css.infocoach__experiance}>3 ans d'expérience</div>
            <div className={css.infocoach__lessonsOffers}>
                Propose de cours privé
            </div>
            <button>Contacter</button>
        </div>
    )
}
