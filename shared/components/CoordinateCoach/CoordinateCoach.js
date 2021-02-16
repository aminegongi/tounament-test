import React from 'react'
import css from './coordinateCoach.scss'

function CoordinateCoach() {
    return (
        <div className={css.coordinatecoach}>
            <div className={css.coordinatecoach__title}>
                Coordonnés
            </div>
            <div className={css.coordinatecoach__birthday}>
                <img src="https://img.icons8.com/bubbles/50/000000/birthday.png" />
                <div className={css.coordinatecoach__birthday__date}>
                    8 Novembre 1983
                </div>
            </div>
            <div className={css.coordinatecoach__address}>
                <img src="https://img.icons8.com/bubbles/50/000000/birthday.png" />
                <div className={css.coordinatecoach__address__lieu}>
                    Habib Bourguiba, tunis
                </div>
            </div>
            <div className={css.coordinatecoach__youtubetv}>
                <img src="https://img.icons8.com/bubbles/50/000000/birthday.png" />
                <div className={css.coordinatecoach__youtubetv__lien}>
                    Amira skhiri
                </div>
            </div>
        </div>
    )
}

export default CoordinateCoach
