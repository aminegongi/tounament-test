import React, { useState } from 'react'
import down from '../../../public/icon/icondown.png'
import left from '../../../public/icon/iconleft.png'
import './collapseContenu.scss'
import moment from 'moment'

export default function collapseContenu({ coach }) {
  const [icon, setIcon] = useState(left)

  const [iconExperience, setIconExperience] = useState(left)
  const changeIcon = () => {
    if (icon === down) {
      setIcon(left)
    }
    if (icon === left) {
      setIcon(down)
    }
  }
  const changeIconexperience = () => {
    if (iconExperience === down) {
      setIconExperience(left)
    }
    if (iconExperience === left) {
      setIconExperience(down)
    }
  }
  return (
    <div className="collapseblock">
      <div className="biographieblock__biographie__contenu">
        <div className="biographieblock__biographie__contenu__collapse">
          <div
            className="biographieblock__biographie__contenu__collapse__titledate"
            onClick={() => changeIcon()}
          >
            <div className="biographieblock__biographie__contenu__collapse__titledate__title">
              Salle de sport: {coach.title}
            </div>
            <div className="biographieblock__biographie__contenu__collapse__dateicon">
              <div className="biographieblock__biographie__contenu__collapse__dateicon__date">
                {coach.date ? (
                  <>
                    {moment(coach.date.from).format('LL')} -{' '}
                    {coach.date.to == null
                      ? `${moment().format('LL')}`
                      : `${moment(coach.date.to).format('LL')}`}
                  </>
                ) : (
                  <>{coach.year}</>
                )}
              </div>
              <img
                src={icon}
                className={icon === down ? 'down' : 'left'}
                alt="icon"
              />
            </div>
          </div>
          {icon === down && (
            <div className="biographieblock__biographie__contenu__collapse__contenuShow">
              {coach.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
