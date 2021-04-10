/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './experiencefilter.scss'
import { Slider } from 'antd'

export default function Experiencefilter({
  selectedExperienceYears,
  setSelectedExperienceYears,
}) {
  const marks = {
    0: '0',
    5: '5',
    10: '10',
    15: '15',
    20: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineHeight: '1.21',
      },
      label: <b className="label">20ans</b>,
    },
  }
  const onChange = (value) => {
    window.scrollTo(400, 250)
    setSelectedExperienceYears(value)
  }

  return (
    <div className="experience">
      <div className="experience__title">ANNEES D'EXPERIENCES</div>
      <div className="experience__marks">
        <Slider
          onChange={onChange}
          value={selectedExperienceYears || 0}
          marks={marks}
          max={20}
        />
      </div>
    </div>
  )
}
