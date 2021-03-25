/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import './coachRegion.scss'
import { Checkbox } from 'antd'
import down from '../../../public/icon/down.png'
import left from '../../../public/icon/left.png'

export default function CoachRegion({
  setDataCopy,
  dataCopy,
  coachesList,
  regions,
}) {
  const onChange = (region) => {
    // window.scrollTo(400, 350)
    if (region.length !== 0) {
      return setDataCopy(
        coachesList.filter((coach) =>
          coach.coachData.privateCourseData.regions.find((el) =>
            region.includes(el),
          ),
        ),
      )
    }
    return setDataCopy(coachesList)
  }

  const [icon, setIcon] = useState(left)
  const changeIcon = () => {
    if (icon === down) {
      setIcon(left)
    }
    if (icon === left) {
      setIcon(down)
    }
  }
  return (
    <div className="coach_region">
      <div className="coach_region__title" onClick={() => changeIcon()}>
        REGIONS
        <img src={icon} className={icon === down ? 'down' : 'left'} alt="" />
      </div>
      <div>
        {icon == down && (
          <Checkbox.Group
            className="coach_region__checkbox"
            options={regions
              .sort((a, b) => (a.translations.fr > b.translations.fr ? 1 : -1))
              .map((region) => {
                return {
                  value: region._id,
                  label: region.translations.fr,
                }
              })}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}
