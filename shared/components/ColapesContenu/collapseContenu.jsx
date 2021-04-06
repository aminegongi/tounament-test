import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import moment from 'moment'
import down from '../../../public/icon/icondown.png'
import left from '../../../public/icon/iconleft.png'
import './collapseContenu.scss'
import { nl2br } from '../../../utils/string.utils'

export default function CollapseContenu({ coach }) {
  const [icon, setIcon] = useState(left)

  const [iconExperience, setIconExperience] = useState(left)
  const changeIcon = () => {
    if (!isEmpty(coach.description)) {
      if (icon === down) {
        setIcon(left)
      }
      if (icon === left) {
        setIcon(down)
      }
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
            onClick={changeIcon}
          >
            <div className="biographieblock__biographie__contenu__collapse__titledate__title">
              {coach.title}
            </div>
            <div className="biographieblock__biographie__contenu__collapse__dateicon">
              <div className="biographieblock__biographie__contenu__collapse__dateicon__date">
                {coach.date ? (
                  <>
                    {moment(coach.date.from).format('DD MMM YYYY')} -{' '}
                    {coach.date.to == null
                      ? `${moment().format('DD MMM YYYY')}`
                      : `${moment(coach.date.to).format('DD MMM YYYY')}`}
                  </>
                ) : (
                  <>{coach.year}</>
                )}
              </div>
            </div>
            {!isEmpty(coach.description) && (
              <img
                src={icon}
                className={icon === down ? 'down' : 'left'}
                alt="icon"
              />
            )}
          </div>
          {icon === down && (
            <div
              className="biographieblock__biographie__contenu__collapse__contenuShow"
              dangerouslySetInnerHTML={{
                __html: nl2br(coach.description),
              }}
            >
              {coach.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
