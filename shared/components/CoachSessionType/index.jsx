/* eslint-disable no-underscore-dangle */
import { Checkbox } from 'antd'
import React, { useState } from 'react'
import down from '../../../public/icon/down.png'
import left from '../../../public/icon/left.png'
import { COACH_FILTER_SESSION_TYPE } from '../../constants'

export default ({ selectedType, setSelectedType }) => {
  const [icon, setIcon] = useState(down)
  const changeIcon = () => {
    if (icon === down) {
      setIcon(left)
    }
    if (icon === left) {
      setIcon(down)
    }
  }
  return (
    <div className="">
      <button
        type="submit"
        onClick={changeIcon}
        className="border-0 border-l-2 border-primary border-solid  color-black flex justify-between w-full m-5 pl-3  text-left font-medium text-lg"
      >
        Type
        <img src={icon} className={`mr-10 `} alt="" />
      </button>
      <div>
        {icon === down && (
          <Checkbox.Group
            className="coach_region__checkbox"
            value={selectedType}
            options={[
              { value: COACH_FILTER_SESSION_TYPE.online, label: 'En ligne' },
              { value: COACH_FILTER_SESSION_TYPE.atHome, label: 'A domicile' },
              {
                value: COACH_FILTER_SESSION_TYPE.onsite,
                label: 'Salle/terrain',
              },
            ]}
            onChange={setSelectedType}
          />
        )}
      </div>
    </div>
  )
}
