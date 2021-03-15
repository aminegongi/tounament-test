import moment from 'moment'
import React, { useState } from 'react'
import './style.scss'

const CalendarTimeSlot = ({ onConfirm }) => {
  const [isSlotClicked, setIsSlotClicked] = useState(false)
  return (
    <div className="calendar-time-slot">
      <button
        onClick={() => setIsSlotClicked(!isSlotClicked)}
        className={`isporit-unset-button-css calendar-time-slot__time ${
          isSlotClicked
            ? 'isporit-unset-button-css calendar-time-slot__time__active'
            : ''
        }`}
        type="submit"
      >
        16:00
      </button>
      <button
        className={`isporit-unset-button-css calendar-time-slot__confirm ${
          isSlotClicked
            ? 'isporit-unset-button-css calendar-time-slot__confirm__active'
            : ''
        }`}
        onClick={() => onConfirm()}
        type="submit"
      >
        Confirm
      </button>
    </div>
  )
}

export default CalendarTimeSlot
