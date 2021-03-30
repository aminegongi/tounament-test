import React from 'react'
import './contactCoach.scss'
import moment from 'moment'
import { isEmpty } from 'lodash'
import birthdayIcon from '../../../public/icon/Birthday.png'
import locationIcon from '../../../public/icon/localisation.png'
import youtubeIcon from '../../../public/icon/youtube.png'

function ContactCoach({ coachData }) {
  return (
    <div className="contactcoach">
      <div className="contactcoach__title">Autres informations</div>
      <div className="contactcoach__birthday">
        <img alt="birthdayIcon" src={birthdayIcon} />
        <div className="contactcoach__birthday__date">
          {moment(coachData.birthday).format('LL')}
        </div>
      </div>
      {!isEmpty(coachData.address) && (
        <div className="contactcoach__address">
          <img alt="locationIcon" src={locationIcon} />
          <div className="contactcoach__address__lieu">{coachData.address}</div>
        </div>
      )}
      {/* <div className="contactcoach__youtubetv">
        <img alt="youtubeIcon" src={youtubeIcon} />
        <div className="contactcoach__youtubetv__lien">Amira skhiri</div>
      </div> */}
    </div>
  )
}

export default ContactCoach
