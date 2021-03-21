/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import moment from 'moment'
import { isEmpty } from 'lodash'
import Axios from 'axios'
import { Button, Icon, message, Modal } from 'antd'
import {
  API,
  CLUB,
  REQUEST_FAILED,
  REQUEST_SUCCEEDED,
} from '../../../shared/constants'
import '../../../shared/css/coachCalendar.scss'
import Navbar from '../../../shared/components/navbar/Navbar'
import ContactCoach from '../../../shared/components/ContactCoach/ContactCoach'
import InfoCoach from '../../../shared/components/InfoCoach/InfoCoach'
import WeeklyBookingCalendar from '../../../shared/components/WeeklyBookingCalendar/WeeklyBookingCalendar'
import { createCoachingRequest } from '../../../shared/services/coachDetails.service'
import AuthContext from '../../../utils/context.utils'
import LoginModal from '../../../shared/components/LoginModal/LoginModal'
import Layout from '../../../shared/components/layout/Layout'

export default function Calendar({
  coachDetails,
  jobs,
  sports,
  dances,
  regions,
  serverResponseStatus,
}) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [confirmationLoading, setConfirmationLoading] = useState(false)
  const [coachingRequestApi, setCoachingRequestApi] = useState()
  const authContext = useContext(AuthContext)

  const renderCoachProfile = () => {
    const job = jobs.find((j) => j._id === coachDetails.coachData.job)
    console.log('job: ', job)
    let specialty = ''
    if (job && job.specialty && job.specialty.type === 'sport') {
      specialty = sports.find((sport) => sport._id === coachDetails.specialty)
    } else if (job && job.specialty && job.specialty.type === 'dance') {
      specialty = dances.find((dance) => dance._id === coachDetails.specialty)
    }
    return (
      <InfoCoach
        coachProfile={coachDetails}
        job={job}
        specialty={specialty}
        coachcalander
      />
    )
  }

  const onCreateCoachingRequest = () => {
    if (authContext.userType === CLUB) {
      return message.error(
        "une organisation n'est pas autorisée à réserver un cours privé avec un entraineur",
      )
    }
    const createRequest = async () => {
      const result = await createCoachingRequest(
        {
          coachId: coachDetails._id,
          requests: selectedTimeSlots.map((el) =>
            moment(el, 'DD-MM-YYYY HH:mm').format(),
          ),
        },
        setConfirmationLoading,
      )
      if (result.type === REQUEST_FAILED) {
        return message.error(
          "Ahhh! quelque chose s'est mal passé, réessayez plus tard. Merci",
        )
      }
      if (result.type === REQUEST_SUCCEEDED) {
        return setCoachingRequestApi(REQUEST_SUCCEEDED)
      }
    }
    if (!authContext.isLoggedIn) {
      return authContext.toggleLogInModal(() => () => createRequest())
    }
    return createRequest()
  }

  const getCoachAvailabilities = () => {
    if (coachDetails.coachData.availabilities) {
      if (
        coachDetails.coachData &&
        coachDetails.coachData.privateCourseData &&
        !coachDetails.coachData.privateCourseData.givePrivateCourse
      ) {
        return {}
      }
      return coachDetails.coachData.availabilities
    }
    return {}
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
              {coachDetails && renderCoachProfile()}
            </div>
            <div className="">
              {coachDetails ? <ContactCoach coachData={[coachDetails]} /> : ''}
            </div>
          </div>
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
            </div>
          )}
          {coachingRequestApi !== REQUEST_SUCCEEDED && (
            <div className="coach-calendar__body__calendar-section">
              <div className="coach-calendar__body__calendar-section__header">
                <div className="coach-calendar__body__calendar-section__header__title">
                  Choisir la date et l'heure pour réserver vos cours
                </div>
                <div className="coach-calendar__body__calendar-section__header__sub-title">
                  Vous pouvez choisir plus qu'un créneaux horraires
                </div>
              </div>
              <div className="coach-calendar__body__calendar-section__body">
                <WeeklyBookingCalendar
                  availabilities={getCoachAvailabilities()}
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
                        {moment(el, 'DD-MM-YYYY').format('dddd')}
                      </div>
                      <div className="coach-calendar__body__calendar-section__footer__item__date">
                        {moment(el, 'DD-MM-YYYY').format('DD-MM-YYYY')}
                      </div>
                      <div className="coach-calendar__body__calendar-section__footer__item__time">
                        {moment(el, 'DD-MM-YYYY HH:mm').format('HH:mm')}
                      </div>
                    </div>
                  ))}
                  {authContext.userProfile._id !== coachDetails._id && (
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
        </div>
      </div>
    </Layout>
  )
}

Calendar.propTypes = {
  coachDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.any).isRequired,
  sports: PropTypes.arrayOf(PropTypes.any).isRequired,
  dances: PropTypes.arrayOf(PropTypes.any).isRequired,
  regions: PropTypes.arrayOf(PropTypes.any).isRequired,
  serverResponseStatus: PropTypes.number.isRequired,
}

Calendar.getInitialProps = async ({ query }) => {
  const coachRes = await fetch(`${API}users/slug/${query.username}`)
  const jobsRes = await fetch(`${API}jobs`)
  const sportsRes = await fetch(`${API}sports`)
  const danceRes = await fetch(`${API}dances/`)
  const regionsRes = await fetch(`${API}regions/`)
  const jsonCoachRes = await coachRes.json()
  const jsonJobsRes = await jobsRes.json()
  const jsonSportsRes = await sportsRes.json()
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coachDetails: jsonCoachRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes,
    serverResponseStatus: jsonCoachRes.message === 'userNotFound' ? 404 : 200,
  }
}
