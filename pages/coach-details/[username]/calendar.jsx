/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import { API } from '../../../shared/constants'
import '../../../shared/css/coachCalendar.scss'
import Navbar from '../../../shared/components/navbar/Navbar'
import ContactCoach from '../../../shared/components/ContactCoach/ContactCoach'
import InfoCoach from '../../../shared/components/InfoCoach/InfoCoach'
import WeeklyBookingCalendar from '../../../shared/components/WeeklyBookingCalendar/WeeklyBookingCalendar'

export default function Calendar({
  coachDetails,
  jobs,
  sports,
  dances,
  regions,
  serverResponseStatus,
}) {
  const renderCoachProfile = () => {
    const job = jobs.find((j) => j._id === coachDetails.coachData.job)
    let specialty = ''
    if (job.specialty && job.specialty.type === 'sport') {
      specialty = sports.find((sport) => sport._id === coachDetails.specialty)
    } else if (job.specialty && job.specialty.type === 'dance') {
      specialty = dances.find((dance) => dance._id === coachDetails.specialty)
    }
    return (
      <InfoCoach
        coachProfile={[coachDetails]}
        job={job}
        specialty={specialty}
        coachcalander
      />
    )
  }

  if (serverResponseStatus === 404) {
    return <h1>404</h1>
  }
  return (
    <div className="coach-calendar">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="coach-calendar__body">
        <div className="coach-calendar__body__profile-information">
          <div className="coach-calendar__body__profile-information__card">
            {coachDetails && renderCoachProfile()}
          </div>
          <div className="">
            {coachDetails ? <ContactCoach coachData={[coachDetails]} /> : ''}
          </div>
        </div>
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
            <WeeklyBookingCalendar />
          </div>
        </div>
      </div>
    </div>
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
