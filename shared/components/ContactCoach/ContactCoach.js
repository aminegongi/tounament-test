import React from 'react'
import  './contactCoach.scss'
import moment from 'moment'

function ContactCoach({ coachData }) {
    return (
        coachData.map(coach =>
            <div className={"contactcoach"}>
                <div className={"contactcoach__title"}>
                    Coordonnés
            </div>
                <div className={"contactcoach__birthday"}>
                    <img src="../icon/Birthday.png" />
                    <div className={"contactcoach__birthday__date"}>
                        {moment(coach.birthday).format('LL')}
                    </div>
                </div>
                <div className={"contactcoach__address"}>
                    <img src="../icon/localisation.png" />
                    <div className={"contactcoach__address__lieu"}>
                        {coach.address}
                </div>
                </div>
                <div className={"contactcoach__youtubetv"}>
                    <img src="../icon/youtube.png" />
                    <div className={"contactcoach__youtubetv__lien"}>
                        Amira skhiri
                </div>
                </div>
               { console.log("coachData={coachData}",coachData)
}
            </div>
        )
    )
}

export default ContactCoach
