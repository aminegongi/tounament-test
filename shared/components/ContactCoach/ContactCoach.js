import React from 'react'
import css from './contactCoach.scss'

function ContactCoach() {
    return (
        <div className={css.contactcoach}>
            <div className={css.contactcoach__title}>
                Coordonnés
            </div>
            <div className={css.contactcoach__birthday}>
                <img src="../icon/Birthday.png" />
                <div className={css.contactcoach__birthday__date}>
                    8 Novembre 1983
                </div>
            </div>
            <div className={css.contactcoach__address}>
            <img src="../icon/localisation.png" />
                <div className={css.contactcoach__address__lieu}>
                    Habib Bourguiba, tunis
                </div>
            </div>
            <div className={css.contactcoach__youtubetv}>
            <img src="../icon/youtube.png" />
                <div className={css.contactcoach__youtubetv__lien}>
                    Amira skhiri
                </div>
            </div>
        </div>
    )
}

export default ContactCoach
