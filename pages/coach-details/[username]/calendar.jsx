/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { Button, Icon, message, Breadcrumb } from 'antd'
import {
  SERVER_SIDE_API_BASE_URL,
  CLUB,
  REQUEST_FAILED,
  REQUEST_SUCCEEDED,
} from '../../../shared/constants'
import '../../../shared/css/coachCalendar.scss'
import ContactCoach from '../../../shared/components/ContactCoach/ContactCoach'
import InfoCoach from '../../../shared/components/InfoCoach/InfoCoach'
import WeeklyBookingCalendar from '../../../shared/components/WeeklyBookingCalendar/WeeklyBookingCalendar'
import { createCoachingRequest } from '../../../shared/services/coachDetails.service'
import { AuthContext } from '../../../utils/context.utils'
import Layout from '../../../shared/components/layout/Layout'

export default function Calendar({
  coach,
  jobs,
  sports,
  dances,
  serverResponseStatus,
}) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [confirmationLoading, setConfirmationLoading] = useState(false)
  const [coachingRequestApi, setCoachingRequestApi] = useState()
  const authContext = useContext(AuthContext)

  const renderCoachProfile = () => {
    const job = jobs.find((j) => j._id === coach.coachData.job)
    let specialty = ''
    if (job && job.specialty && job.specialty.type === 'sport') {
      specialty = coach.coachData.specialty
        ? coach.coachData.specialty.reduce((acc, val) => {
            const element = sports.find((dance) => dance._id === val)
            if (element) {
              acc = [...acc, element]
            }
            return acc
          }, [])
        : []
    } else if (job && job.specialty && job.specialty.type === 'dance') {
      specialty = coach.coachData.specialty
        ? coach.coachData.specialty.reduce((acc, val) => {
            const element = dances.find((dance) => dance._id === val)
            if (element) {
              acc = [...acc, element]
            }
            return acc
          }, [])
        : []
    }
    return (
      <InfoCoach
        coachProfile={coach}
        job={job}
        specialty={specialty}
        coachcalander
      />
    )
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
          requests: selectedTimeSlots.map((el) => ({ availabilityId: el._id })),
        },
        setConfirmationLoading,
      )
      if (result.type === REQUEST_FAILED) {
        if (result.data.message === 'youCanNotBookMoreThan4CoachesPerDay') {
          return message.error(
            'Vous ne pouvez pas réserver plus que 4 cours privés par jour!',
          )
        }
        return message.error(
          "Ahhh! quelque chose s'est mal passé, réessayez plus tard. Merci",
        )
      }
      if (result.type === REQUEST_SUCCEEDED) {
        return setCoachingRequestApi(REQUEST_SUCCEEDED)
      }
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

  if (serverResponseStatus === 404) {
    return <h1>404</h1>
  }

  return (
    <Layout>
      <div className="coach-calendar">
        <div className="coach-calendar__body">
          <div className="coach-calendar__body__profile-information">
            <div className="coach-calendar__body__profile-information__card">
              {coach && renderCoachProfile()}
            </div>
            <div className="">
              {coach ? <ContactCoach coachData={[coach]} /> : ''}
            </div>
          </div>
          <div>
            <>
              <Breadcrumb separator=">">
                <Breadcrumb.Item
                  href="/coaches"
                  className="isporit-breadcrumb-link"
                >
                  Tous les coachs
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  href={`/coach-details/${coach.username}`}
                  className="isporit-breadcrumb-link"
                >
                  {`${
                    coach.firstName[0].toUpperCase() + coach.firstName.slice(1)
                  } ${coach.lastName[0].toUpperCase()}${coach.lastName.slice(
                    1,
                  )}`}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Calendar</Breadcrumb.Item>
              </Breadcrumb>
              {coachingRequestApi === REQUEST_SUCCEEDED && (
                <div className="coach-calendar__request-succeeded">
                  <div className="coach-calendar__request-succeeded__icon">
                    <Icon type="check-circle" />
                  </div>
                  <div className="coach-calendar__request-succeeded__title">
                    Confirmation
                  </div>
                  <div className="coach-calendar__request-succeeded__description">
                    Votre demande de réservation a été envoyée à l'entraîneur!
                  </div>
                  <div className="coach-calendar__request-succeeded__sub-description">
                    vous serez contacté par téléphone pour confirmer votre cours
                    .
                    <div>
                      <a
                        href="https://dev.isporit.com/dashboard"
                        className="isporit-primary-button link-platform"
                        target="_blank"
                      >
                        Voir mes réservations
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {coachingRequestApi !== REQUEST_SUCCEEDED && (
                <div className="coach-calendar__body__calendar-section">
                  <div className="coach-calendar__body__calendar-section__header">
                    <div className="coach-calendar__body__calendar-section__header__title">
                      Choisir la date et l'heure pour réserver vos cours
                    </div>
                    <div className="coach-calendar__body__calendar-section__header__sub-title">
                      Choisissez plus qu'un créneau horaire pour maximiser vos
                      chances
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
                            {moment(el.startTime, 'YYYY-MM-DD').format(
                              'DD-MM-YYYY',
                            )}
                          </div>
                          <div className="coach-calendar__body__calendar-section__footer__item__time">
                            {moment(el.startTime, 'YYYY-MM-DD HH:mm').format(
                              'HH:mm',
                            )}
                          </div>
                          <Icon
                            type="close-square"
                            className="coach-calendar__body__calendar-section__footer__item__delete-icon"
                            theme="filled"
                            onClick={() =>
                              setSelectedTimeSlots(
                                selectedTimeSlots.filter(
                                  (s) => s._id !== el._id,
                                ),
                              )
                            }
                          />
                        </div>
                      ))}
                      {authContext.userProfile._id !== coach._id && (
                        <Button
                          type="submit"
                          id="coach-calendar-footer-confirm-button"
                          loading={confirmationLoading}
                          onClick={onCreateCoachingRequest}
                          className="coach-calendar__body__calendar-section__footer__confirm-button"
                        >
                          Confirmer
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </Layout>
  )
}

Calendar.propTypes = {
  coach: PropTypes.objectOf(PropTypes.any).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.any).isRequired,
  sports: PropTypes.arrayOf(PropTypes.any).isRequired,
  dances: PropTypes.arrayOf(PropTypes.any).isRequired,
  serverResponseStatus: PropTypes.number.isRequired,
}

Calendar.getInitialProps = async ({ req, query }) => {
  const coachRes = await fetch(
    `${SERVER_SIDE_API_BASE_URL(req)}users/coaches/slug/${query.username}`,
  )
  const jobsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}jobs`)
  const sportsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}sports`)
  const danceRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}dances/`)
  const regionsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}regions/`)
  const jsonCoachRes = await coachRes.json()
  const jsonJobsRes = await jobsRes.json()
  const jsonSportsRes = await sportsRes.json()
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coach: jsonCoachRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes,
    serverResponseStatus: jsonCoachRes.message === 'userNotFound' ? 404 : 200,
  }
}
