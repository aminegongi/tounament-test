import moment from 'moment'
import React, { useContext, useState } from 'react'
import Calendar from 'react-calendar'
import { uniq, sortBy, isEmpty } from 'lodash'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import 'react-calendar/dist/Calendar.css'
import './style.scss'

const WeeklyBookingCalendar = ({
  availabilities,
  setSelectedTimeSlots,
  selectedTimeSlots,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const addZeroAtTheBeginningOfNumber = (number) =>
    `${number}`.length === 1 ? `0${number}` : number

  const getSelectedDayAvailabilitiesInHours = (date = selectedDate) => {
    const selectedDayAvailabilities =
      availabilities[moment(date).format('dddd').toLowerCase()]
    if (selectedDayAvailabilities) {
      return sortBy(
        uniq(
          selectedDayAvailabilities.reduce((acc, val) => {
            acc = [
              ...acc,
              ...Array.from({
                length:
                  moment(val.endTime, 'HH:mm').get('hour') -
                  moment(val.startTime, 'HH:mm').get('hour'),
              }).map(
                (_, index) =>
                  moment(val.startTime, 'HH:mm').get('hour') + index,
              ),
            ]

            return acc
          }, []),
        ),
      )
        .filter(
          (el) =>
            !(
              moment().startOf('day').isSame(moment(date).startOf('day')) &&
              el <= moment().format('HH')
            ),
        )
        .map((el) => `${addZeroAtTheBeginningOfNumber(el)}:00`)
    }
    return []
  }
  return (
    <div className="weekly-booking-calendar">
      <Calendar
        tileDisabled={({ date }) => {
          if (moment().startOf('day').isSame(moment(date).startOf('day'))) {
            return isEmpty(getSelectedDayAvailabilitiesInHours(date))
          }
          if (
            !Object.keys(availabilities).find(
              (key) => key === moment(date).format('dddd').toLowerCase(),
            ) ||
            moment().add(2, 'weeks').isSameOrBefore(moment(date)) ||
            moment(date).isBefore(moment())
          ) {
            return true
          }
        }}
        showNeighboringMonth={false}
        value={selectedDate}
        view="month"
        onChange={(newDate) => {
          setSelectedDate(newDate)
        }}
        className="weekly-booking-calendar__calendar"
        tileClassName={({ date }) => {
          if (
            Object.keys(availabilities).find(
              (key) => key === moment(date).format('dddd').toLowerCase(),
            )
          ) {
            return 'weekly-booking-calendar__calendar__day'
          }
          return null
        }}
      />
      <div className="weekly-booking-calendar__time-slots">
        <div className="weekly-booking-calendar__time-slots__date">
          {moment(selectedDate).format('dddd, MMMM DD')}
        </div>
        {getSelectedDayAvailabilitiesInHours()
          .filter(
            (el) =>
              !selectedTimeSlots.find((s) =>
                moment(s, 'DD-MM-YYYY HH:mm').isSame(
                  moment(
                    `${moment(selectedDate).format('DD-MM-YYYY')} ${el}`,
                    'DD-MM-YYYY HH:mm',
                  ),
                ),
              ),
          )
          .map((el) => (
            <div
              key={selectedDate + el}
              className="weekly-booking-calendar__time-slots__slot"
            >
              <CalendarTimeSlot
                time={el}
                onConfirm={() =>
                  setSelectedTimeSlots([
                    ...selectedTimeSlots,
                    `${moment(selectedDate).format('DD-MM-YYYY')} ${el}`,
                  ])
                }
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default WeeklyBookingCalendar
