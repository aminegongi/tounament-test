import { Icon } from 'antd'
import React, { useState } from 'react'
import './style.scss'

const CalendarTimeSlot = ({ onConfirm, time, maxPlayers }) => {
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
        {time}{' '}
        {maxPlayers === 1 ? (
          <Icon type="user" style={{ color: '#26beb5' }} />
        ) : (
          <>
            <Icon type="user" style={{ color: '#26beb5' }} />
            <Icon type="user" style={{ color: '#26beb5' }} />
            <Icon type="user" style={{ color: '#26beb5' }} />
          </>
        )}
      </button>
      <a
        onClick={onConfirm}
        href="#coach-calendar-footer-confirm-button"
        className={`isporit-unset-link-css calendar-time-slot__confirm ${
          isSlotClicked ? 'calendar-time-slot__confirm__active' : ''
        }`}
      >
        Confirmer
      </a>
    </div>
  )
}

export default CalendarTimeSlot
