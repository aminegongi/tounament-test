/* eslint-disable no-underscore-dangle */
import moment from 'moment'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { Icon } from 'antd'
import { isEmpty, sortBy } from 'lodash'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import 'react-calendar/dist/Calendar.css'
import './style.scss'

const WeeklyBookingCalendar = ({
  availabilitiesByDate,
  setSelectedTimeSlots,
  selectedTimeSlots,
}) => {
  const [selectedDate, setSelectedDate] = useState()

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
      <div className="weekly-booking-calendar__legend">
        <div className="isporit-flex-h-end-v-center">
          <span className="weekly-booking-calendar__legend__free" />
          Séances libres
        </div>
      </div>
      <div className="weekly-booking-calendar__box">
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
              moment().startOf('day').isSameOrBefore(moment(date, 'day')) &&
              availabilitiesByDate[
                moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')
              ]
            ) {
              return 'weekly-booking-calendar__box__calendar__day'
            }
            return 'weekly-booking-calendar__box__calendar__full'
          }}
          className="weekly-booking-calendar__box__calendar"
          minDate={new Date()}
        />
        <div className="weekly-booking-calendar__box__time-slots">
          <div className="weekly-booking-calendar__box__time-slots__date">
            {moment(selectedDate).format('dddd, MMMM DD')}
            <div className="weekly-booking-calendar__box__time-slots__date__labels">
              <div className="">
                <Icon
                  type="user"
                  className="weekly-booking-calendar__box__time-slots__date__labels__icon"
                />
                <Icon
                  type="user"
                  className="weekly-booking-calendar__box__time-slots__date__labels__icon"
                />
                <Icon
                  type="user"
                  className="weekly-booking-calendar__box__time-slots__date__labels__icon"
                />{' '}
                Collectif
              </div>
              <div className="weekly-booking-calendar__box__time-slots__date__labels__separator">
                -
              </div>
              <div className="">
                <Icon
                  type="user"
                  className="weekly-booking-calendar__box__time-slots__date__labels__icon"
                />{' '}
                Individuel
              </div>
              {isEmpty(getSelectedDayAvailabilities()) && (
                <div id="coach-calendar-footer-confirm-section" />
              )}
            </div>
          </div>

          {getSelectedDayAvailabilities().map((el, index) => (
            <div
              key={el._id}
              className="weekly-booking-calendar__box__time-slots__slot"
            >
              <CalendarTimeSlot
                maxPlayers={el.maxPlayers}
                time={moment(el.startTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}
                onConfirm={() =>
                  setSelectedTimeSlots([...selectedTimeSlots, el])
                }
              />
              {getSelectedDayAvailabilities().length - 1 === index && (
                <div id="coach-calendar-footer-confirm-section" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeeklyBookingCalendar
