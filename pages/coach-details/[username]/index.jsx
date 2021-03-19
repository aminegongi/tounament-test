import React, { useEffect, useState } from 'react'
import HeaderCoachProfile from '../../../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../../../shared/components/InfoCoach/InfoCoach'
import '../../../shared/css/coachDetails.scss'
import Navbar from '../../../shared/components/navbar/Navbar'
import CardProfileCoach from '../../../shared/components/CardProfileCoachFilter/CardProfileCoach'
import {
  ALL,
  ALPHABETICAL,
  RECOMMEND,
  EXPERIENCE,
  API,
} from '../../../shared/constants'
import ContactCoach from '../../../shared/components/ContactCoach/ContactCoach'
import fetch from 'isomorphic-unfetch'

import CoachBox from '../../../shared/components/CoachBox/CoachBox'
import CoachAvis from '../../../shared/components/CoachAvis/CoachAvis'
import Biography from '../../../shared/components/Biography/Biography'
import { useRouter } from 'next/router'
import affiche from '../../../public/icon/Banniere.png'
import exclamation from '../../../public/icon/exclamation.png'

export default function CoachDetails({
  coachesList,
  jobs,
  sports,
  dances,
  regions,
}) {
  const router = useRouter()
  const [coachData, setCoachData] = useState()
  const [tab, setTab] = useState(1)

  const renderCoachProfile = (coachData) => {
    const job = jobs.find((job) => job._id === coachData.coachData.job)

    let specialty = ''
    if (job.specialty && job.specialty.type == 'sport') {
      specialty = sports.find(
        (sport) => sport._id === coachData.coachData.specialty,
      )
    } else if (job.specialty && job.specialty.type === 'dance') {
      specialty = dances.find(
        (dance) => dance._id === coachData.coachData.specialty,
      )
    }
    return (
      <InfoCoach
        coachProfile={coachData}
        key={coachData._id}
        job={job}
        specialty={specialty}
      />
    )
  }

  useEffect(() => {
    setCoachData(coachesList)
  }, [router.query.id])

  return (
    <>
      <Navbar />
      <div className="coach">
        <div className="affiche">
          <img className="affiche__img" src={affiche} alt="affiche" />
        </div>
        <div className="coach__coachdetails">
          <div className="coach__cordonneBlock">
            <div className="coach__coachdetails__contact">
              {coachData && jobs && renderCoachProfile(coachData)}
            </div>
            <div className="coach__coachdetails__information">
              {coachesList ? <ContactCoach coachData={coachesList} /> : ''}
            </div>
          </div>
          <div className="tabsinfo">
            <div className="tabs">
              <div className="tabs__button">
                <div
                  className={
                    tab === 1
                      ? 'tabs__button__aproposaparopsactive'
                      : 'tabs__button__aproposaparops'
                  }
                  onClick={() => setTab(1)}
                >
                  A propos
                </div>
                <div
                  className={
                    tab === 2
                      ? 'tabs__button__aproposavisactive'
                      : 'tabs__button__aproposavis'
                  }
                  onClick={() => setTab(2)}
                >
                  Avis
                </div>
                <div
                  className={
                    tab === 3
                      ? 'tabs__button__aproposbiographieactive'
                      : 'tabs__button__aproposbiographie'
                  }
                  onClick={() => setTab(3)}
                >
                  Biographie
                </div>
              </div>
              <button className="tabs__contact">Contacter</button>
            </div>
            {/* <div className="linetabs" /> */}
            {coachData ? (
              <>
                {tab == 1 ? (
                  <div className="tabsinfo__title">
                    <CoachBox
                      coachData={coachesList}
                      iconExclamation={exclamation}
                    >
                      <div className="coachBox">
                        {coachesList &&
                        coachesList.coachData.experiencesYearsNumber ? (
                          <div className="coachBox__content">
                            <div className="coachBox__content__title">
                              Années d'expérience:
                            </div>
                            <div className="coachBox__content__experienceNumber">
                              {coachesList &&
                                coachesList.coachData &&
                                coachesList.coachData.experiencesYearsNumber}
                            </div>
                          </div>
                        ) : (
                          ''
                        )}

                        <div className="coachBox__content">
                          <div className="coachBox__content__title">
                            Années à jouer:
                          </div>
                          <div className="coachBox__content__experienceNumber">
                            3
                          </div>
                        </div>
                        {coachesList &&
                          coachesList.coachData &&
                          coachesList.coachData.privateCourseData &&
                          coachesList.coachData.privateCourseData
                            .personsNumberPerSession && (
                            <div className="coachBox__content">
                              <div className="coachBox__content__title">
                                Nombre de personnes par séances:
                              </div>
                              <div className="coachBox__content__experienceNumber">
                                {
                                  coachesList.coachData.privateCourseData
                                    .personsNumberPerSession
                                }
                              </div>
                            </div>
                          )}
                        {coachesList &&
                          coachesList.coachData &&
                          coachesList.coachData.privateCourseData &&
                          coachesList.coachData.privateCourseData.level && (
                            <div className="coachBox__content">
                              <div className="coachBox__content__title">
                                Niveaux:{' '}
                                <span>
                                  {coachesList.coachData.privateCourseData.level.join(
                                    ' , ',
                                  )}
                                </span>
                              </div>
                            </div>
                          )}
                        {coachesList &&
                          coachData.coachData &&
                          coachesList.coachData.privateCourseData &&
                          coachesList.coachData.privateCourseData.ages && (
                            <div className="coachBox__playerAge">
                              <div className="coachBox__playerAge__title ">
                                Catégories d'ages:
                              </div>
                              <div className="coachBox__playerAge__age">
                                {coachesList.coachData.privateCourseData.ages.join(
                                  ' , ',
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </CoachBox>
                  </div>
                ) : tab == 2 ? (
                  <>
                    <CoachAvis coachData={coachesList} />
                  </>
                ) : (
                  <Biography
                    coachData={coachData}
                    title="Biographie"
                    icon={exclamation}
                  />
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  )
}

CoachDetails.getInitialProps = async ({ query }) => {
  const coachesRes = await fetch(`${API}users/slug/${query.username}`)
  const jobsRes = await fetch(`${API}jobs`)
  const sportsRes = await fetch(`${API}sports`)
  const danceRes = await fetch(`${API}dances/`)
  const regionsRes = await fetch(`${API}regions/`)
  const jsonCoachesRes = await coachesRes.json()
  const jsonJobsRes = await jobsRes.json()
  const jsonSportsRes = await sportsRes.json()
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coachesList: jsonCoachesRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes,
  }
}
