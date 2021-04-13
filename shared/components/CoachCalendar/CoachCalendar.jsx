/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { isEmpty } from 'lodash'
import { Button, Icon, message } from 'antd'
import { CLUB, REQUEST_FAILED, REQUEST_SUCCEEDED } from '../../constants'
import './coachCalendar.scss'
import WeeklyBookingCalendar from '../WeeklyBookingCalendar/WeeklyBookingCalendar'
import { createCoachingRequest } from '../../services/coachDetails.service'
import { AuthContext } from '../../../utils/context.utils'
import IsporitModal from '../IsporitModal/IsporitModal'

export default function CoachCalendar({ coach, onSuccess }) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [confirmationLoading, setConfirmationLoading] = useState(false)
  const [requestNote, setRequestNote] = useState('')
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  // const [coachingRequestApi, setCoachingRequestApi] = useState()
  const authContext = useContext(AuthContext)

  const onOpenConfirmModal = () => {
    if (!authContext.isLoggedIn) {
      return authContext.toggleLogInModal(
        () => () => setIsConfirmModalOpen(true),
        false,
        'player',
      )
    }
    setIsConfirmModalOpen(true)
  }

  const onCreateCoachingRequest = () => {
    if (authContext.userType === CLUB) {
      return message.error(
        "une organisation n'est pas autorisée à réserver un cours privé avec un entraîneur",
      )
    }
    const createRequest = async () => {
      const result = await createCoachingRequest(
        {
          coachId: coach._id,
          note: isEmpty(requestNote) ? undefined : requestNote,
          requests: selectedTimeSlots.map((el) => ({ availabilityId: el._id })),
        },
        setConfirmationLoading,
      )
      if (result.type === REQUEST_FAILED) {
        if (result.data.message === 'coachingRequestAlreadyExists') {
          // if (result.data.details && result.data.details.coachingRequests) {
          return message.error(
            `Vous ne pouvez pas réserver la même disponibilité 2 fois! ( ${
              result.data.details &&
              result.data.details.coachingRequests &&
              result.data.details.coachingRequests.map(
                (el) =>
                  `${moment(el.startTime, 'YYYY-MM-DD HH:mm').format('LLLL')} `,
              )
            })`,
          )
          // }
        }
        if (result.data.message === 'youCanNotBookMoreThan4CoachesPerDay') {
          return message.error(
            'Vous ne pouvez pas réserver plus que 4 cours privés par jour!',
          )
        }
        if (typeof result.data.message === 'string') {
          const notFoundAvailability = coach.coachData.availabilities.find(
            (el) =>
              result.data.message.slice(0, result.data.message.indexOf(' ')) ===
              el._id,
          )
          if (notFoundAvailability) {
            return message.error(
              `${coach.firstName} ${
                coach.lastName
              } n'est plus disponible a ${moment(
                notFoundAvailability.startTime,
                'YYYY-MM-DD HH:mm',
              ).format('LLLL')}`,
            )
          }
        }

        return message.error(
          "Ahhh! quelque chose s'est mal passé, réessayez plus tard. Merci",
        )
      }
      if (result.type === REQUEST_SUCCEEDED) {
        return onSuccess()
      }
      return null
    }
    if (!authContext.isLoggedIn) {
      return authContext.toggleLogInModal(
        () => () => createRequest(),
        false,
        'player',
      )
    }
    return createRequest()
  }

  const getCoachAvailabilities = () => {
    if (coach.coachData.availabilities) {
      if (
        coach.coachData &&
        coach.coachData.privateCourseData &&
        !coach.coachData.privateCourseData.givePrivateCourse
      ) {
        return []
      }
      return coach.coachData.availabilities.reduce((acc, val) => {
        // if (moment().isSameOrBefore(val.startTime)) {
        const date = moment(val.startTime).format('DD-MM-YYYY')
        if (acc[date]) {
          acc[date] = [...acc[date], val]
        } else {
          acc[date] = [val]
        }
        // }
        return acc
      }, {})
    }
    return []
  }

  return (
    <div className="coach-calendar">
      <div className="coach-calendar__body">
        <div>
          <div className="coach-calendar__body__calendar-section">
            <div className="coach-calendar__body__calendar-section__header">
              <div className="coach-calendar__body__calendar-section__header__title">
                Choisir la date et l'heure pour réserver vos cours
              </div>
              <div className="coach-calendar__body__calendar-section__header__sub-title">
                Choisissez plus qu'un créneau horaire pour maximiser vos chances
              </div>
            </div>
            <div className="coach-calendar__body__calendar-section__body">
              <WeeklyBookingCalendar
                availabilitiesByDate={getCoachAvailabilities()}
                setSelectedTimeSlots={setSelectedTimeSlots}
                selectedTimeSlots={selectedTimeSlots}
              />
            </div>
            {!isEmpty(selectedTimeSlots) && (
              <div className="coach-calendar__body__calendar-section__footer">
                <div className="coach-calendar__body__calendar-section__footer__title">
                  Merci de confirmer votre date
                </div>

                {selectedTimeSlots.map((el) => (
                  <div className="coach-calendar__body__calendar-section__footer__item">
                    <div className="coach-calendar__body__calendar-section__footer__item__icon" />
                    <div className="coach-calendar__body__calendar-section__footer__item__day">
                      {moment(el.startTime, 'YYYY-MM-DD').format('dddd')}
                    </div>
                    <div className="coach-calendar__body__calendar-section__footer__item__date">
                      {moment(el.startTime, 'YYYY-MM-DD').format('LL')}
                    </div>
                    <div className="coach-calendar__body__calendar-section__footer__item__time">
                      {moment(el.startTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}
                    </div>
                    <Icon
                      type="close-square"
                      className="coach-calendar__body__calendar-section__footer__item__delete-icon"
                      theme="filled"
                      onClick={() =>
                        setSelectedTimeSlots(
                          selectedTimeSlots.filter((s) => s._id !== el._id),
                        )
                      }
                    />
                  </div>
                ))}
                {authContext.userProfile._id !== coach._id && (
                  <Button
                    type="submit"
                    id="coach-calendar-footer-confirm-button"
                    onClick={onOpenConfirmModal}
                    className="coach-calendar__body__calendar-section__footer__confirm-button"
                  >
                    Confirmer
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <IsporitModal
        className={`coach-calendar__modal `}
        isVisible={isConfirmModalOpen}
        footer={
          <div className="isporit-lex-h-center-v-center coach-calendar__modal">
            <Button onClick={() => setIsConfirmModalOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={onCreateCoachingRequest}
              loading={confirmationLoading}
              className="coach-calendar__modal__confirm-btn"
            >
              Confirmer
            </Button>
          </div>
        }
        title="Note"
        onCancel={() => {
          return setIsConfirmModalOpen(false)
        }}
      >
        <textarea
          onChange={(e) => setRequestNote(e.target.value)}
          value={requestNote}
          placeholder="Note pour l'entraineur"
          rows={5}
          className="isporit-input"
        />
      </IsporitModal>
    </div>
  )
}

CoachCalendar.propTypes = {
  coach: PropTypes.objectOf(PropTypes.any).isRequired,
  onSuccess: PropTypes.func.isRequired,
}
