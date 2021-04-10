/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './availabilityFilter.scss'
import { Slider } from 'antd'

export default function AvailabilityFilter({
  selectedDate,
  setSelectedDate,
}) {
  
  const onChange = (value) => {
    // window.scrollTo(400, 250)
    setSelectedExperienceYears(value)
  }

  return (
    <div className="experience">
      <div className="experience__title">ANNEES D'EXPERIENCES</div>
      <div className="experience__marks">
        <input
          onFocus={(e) => {
            e.target.type = 'datetime-local'
          }}
          onBlur={(e) => {
            if (isEmpty(e.target.value)) {
              e.target.type = 'text'
            } else {
              e.target.type = 'datetime-local'
            }
          }}
          type="text"
          value={selectedDate}
          step="3600"
          onChange={(e) =>
            setSelectedDate(
              e.target.value.slice(0, e.target.value.length - 3) + ':00',
            )
          }
          style={{ width: '100%', maxWidth: 211 }}
          placeholder="Quelle date?"
        />
      </div>
    </div>
  )
}
