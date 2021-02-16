import React from 'react'
import css from './coachBox.scss'
export default function CoachBox() {
    return (
        <div>
            <div className={css.coachBox}>
                <img src="../icon/exclamation.png" alt="" />
                <div className={css.coachBox__title}>
                    Informations
                </div>
            </div>
        </div>
    )
}
