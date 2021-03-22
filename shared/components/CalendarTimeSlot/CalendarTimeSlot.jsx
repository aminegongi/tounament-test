import React, { useState } from 'react'
import './style.scss'

const CalendarTimeSlot = ({ onConfirm, time }) => {
  const [isSlotClicked, setIsSlotClicked] = useState(false)
  return (
    <div
      className={`calendar-time-slot ${
        isSlotClicked ? 'calendar-time-slot__active' : ''
      }`}
    >
      <button
        onClick={() => setIsSlotClicked(!isSlotClicked)}
        className={`isporit-unset-button-css calendar-time-slot__time ${
          isSlotClicked ? 'calendar-time-slot__time__active' : ''
        }`}
        type="submit"
      >
        {time}
      </button>
      <a
        onClick={onConfirm}
        href="#coach-calendar-footer-confirm-button"
        className={`isporit-unset-link-css calendar-time-slot__confirm ${
          isSlotClicked ? 'calendar-time-slot__confirm__active' : ''
        }`}
      >
        Confirm
      </a>
    </div>
  )
}

export default CalendarTimeSlot
