import React, { useState } from 'react'
import './collapse.scss'
import moment from 'moment'
import down from '../../../public/icon/icondown.png'
import left from '../../../public/icon/iconleft.png'
import CollapseContenu from '../ColapesContenu/collapseContenu'
import CoachProfileSection from '../CoachProfileSection'

function Collapse({ title, iconblock, coachData }) {
  return (
    <div className="biographieblock">
      <CoachProfileSection title={title} icon={iconblock} isVerticalLine>
        <div className="collapseblock">
          {coachData.map((coach) => {
            return <CollapseContenu coach={coach} />
          })}
        </div>
      </CoachProfileSection>
    </div>
  )
}

export default Collapse
