/* eslint-disable no-underscore-dangle */
import moment from 'moment'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { Icon } from 'antd'
import { sortBy } from 'lodash'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import 'react-calendar/dist/Calendar.css'
import './style.scss'

const WeeklyBookingCalendar = ({
  availabilitiesByDate,
  setSelectedTimeSlots,
  selectedTimeSlots,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getSelectedDayAvailabilities = () => {
    const items =
      availabilitiesByDate[
        moment(selectedDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
      ]
    if (items) {
      return (
        sortBy(items, (o) =>
          moment(o.startTime, 'YYYY-MM-DD HH:mm').format('HH:mm'),
        )
          // .filter((el) => !moment().isSameOrAfter(moment(el.startTime)))
          .filter(
            (el) =>
              !selectedTimeSlots.find((s) =>
                moment(s.startTime, 'YYYY-MM-DD HH:mm').isSame(
                  moment(el.startTime, 'YYYY-MM-DD HH:mm'),
                ),
              ),
          )
      )
    }
    return []
  }
  return (
    <div className="weekly-booking-calendar">
      <Calendar
        locale="fr"
        showNeighboringMonth={false}
        value={selectedDate}
        view="month"
        onChange={(newDate) => {
          setSelectedDate(newDate)
        }}
        tileClassName={({ date }) => {
          if (
            moment().isSameOrBefore(moment(date, 'DD-MM-YYYY')) &&
            availabilitiesByDate[
              moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY')
            ]
          ) {
            return 'weekly-booking-calendar__calendar__day'
          }
          return null
        }}
        className="weekly-booking-calendar__calendar"
        minDate={new Date()}
      />
      <div className="weekly-booking-calendar__time-slots">
        <div className="weekly-booking-calendar__time-slots__date">
          {moment(selectedDate).format('dddd, MMMM DD')}
          <div className="weekly-booking-calendar__time-slots__date__labels">
            <div className="">
              <Icon
                type="user"
                className="weekly-booking-calendar__time-slots__date__labels__icon"
              />
              <Icon
                type="user"
                className="weekly-booking-calendar__time-slots__date__labels__icon"
              />
              <Icon
                type="user"
                className="weekly-booking-calendar__time-slots__date__labels__icon"
              />{' '}
              Collectif
            </div>
            <div className="weekly-booking-calendar__time-slots__date__labels__separator">
              -
            </div>
            <div className="">
              <Icon
                type="user"
                className="weekly-booking-calendar__time-slots__date__labels__icon"
              />{' '}
              Individuel
            </div>
          </div>
        </div>

        {getSelectedDayAvailabilities().map((el) => (
          <div
            key={el._id}
            className="weekly-booking-calendar__time-slots__slot"
          >
            <CalendarTimeSlot
              maxPlayers={el.maxPlayers}
              time={moment(el.startTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}
              onConfirm={() => setSelectedTimeSlots([...selectedTimeSlots, el])}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyBookingCalendar
