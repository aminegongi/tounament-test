import React from 'react'
import css from './header_coach_profil.scss'
export default function header_coach_profil() {
    return (
        <div className={css.header}>
            <div className={css.header__body}>
                <img  src={"../../../icon/logoindexpage.png"} className={css.header__body__imglogo} alt="logo" />
                <div className={css.header__body__pages}>
                    <div className={css.header__body__pages__composant}>Entraîneur</div>
                    <div className={css.header__body__pages__composant}>Club management</div>
                    <div className={css.header__body__pages__composant}>Clubs partenaires</div>
                    <div className={css.header__body__pages__composant}>Contact</div>
                </div>
                <button className={css.header__body__inscrirebutton}><span>S'inscrire gratuitement</span></button>
            </div>
        </div>
    )
}
