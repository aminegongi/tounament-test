import moment from 'moment'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import LoginModal from '../LoginModal/LoginModal'

import './style.scss'

const WeeklyBookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(true)
  return (
    <div className="weekly-booking-calendar">
      <Calendar
        value={selectedDate}
        view="month"
        onChange={(newDate) => setSelectedDate(newDate)}
        className="weekly-booking-calendar__calendar"
      />
      <div className="weekly-booking-calendar__time-slots">
        <div className="weekly-booking-calendar__time-slots__date">
          {moment().format('dddd, MMMM DD')}
        </div>
        <div className="weekly-booking-calendar__time-slots__slot">
          <CalendarTimeSlot onConfirm={() => setIsSignUpModalOpen(true)} />
        </div>
        <div className="weekly-booking-calendar__time-slots__slot">
          <CalendarTimeSlot onConfirm={() => setIsSignUpModalOpen(true)} />
        </div>
        <div className="weekly-booking-calendar__time-slots__slot">
          <CalendarTimeSlot onConfirm={() => setIsSignUpModalOpen(true)} />
        </div>
      </div>

      <LoginModal
        isVisible={isSignUpModalOpen}
        onCancel={() => setIsSignUpModalOpen(false)}
      />
    </div>
  )
}

export default WeeklyBookingCalendar
