import React, { useState } from 'react'
import './collapse.scss'
import moment from 'moment'
import down from '../../../public/icon/icondown.png'
import left from '../../../public/icon/iconleft.png'
import CollapseContenu from '../ColapesContenu/collapseContenu'

function Collapse({ title, iconblock, coachData }) {
  return (
    <div className="biographieblock__Experiences">
      <div className="biographieblock__biographie__linevertical" />
      <img
        className="biographieblock__biographie__icon"
        src={iconblock}
        alt="icon"
      />
      <div className="biographieblock__biographie__title">{title}</div>
      <div className="linebiographie" />

      <div className="collapseblock">
        {coachData.map((coach) => {
          return <CollapseContenu coach={coach} />
        })}
      </div>
    </div>
  )
}

export default Collapse
