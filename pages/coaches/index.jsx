/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Input, Select, Modal } from 'antd'
import '../../shared/css/coaches.scss'
import '../../shared/global-style.scss'
import Head from 'next/head'
import { isEmpty } from 'lodash'

// import fetch from 'isomorphic-unfetch'
import { useMediaPredicate } from 'react-media-hook'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Axios from 'axios'
import {
  ALL,
  ALPHABETICAL,
  EXPERIENCE,
  SERVER_SIDE_API_BASE_URL,
  levels,
  ages,
  CLIENT_SIDE_API_BASE_URL,
} from '../../shared/constants'

import FilterCoach from '../../shared/components/FilterCoach/FilterCoach'
import Experiencefilter from '../../shared/components/Experiencefilter/Experiencefilter'
// import Recommendation from '../../shared/components/RecommendationFilter/Recommendation'
// import CoachType from '../../shared/components/CoachTypeFilter/CoachType'
import CoachRegion from '../../shared/components/CoachRegionFilter/CoachRegion'
import CardProfileCoach from '../../shared/components/CardProfileCoachFilter/CardProfileCoach'
import affiche from '../../public/icon/Banniere.png'
import mobileBanner from '../../public/icon/banniere_mobile.png'
import Layout from '../../shared/components/layout/Layout'
import {
  // coachesListOrderBy,
  getFilteredCoaches,
  getRegionsList,
  // getJobsList,
  // getRegionsList,Cyqrn r
  // getSpecialtiesList,
} from '../../utils/arrays.utils'
// import { getFormattedNumber } from '../../utils/number.utils'
import FacebookPixel from '../../shared/components/FacebookPixel'
import FilterMobile from '../../shared/components/FilterMobile/FilterMobile'

const { Search } = Input

export async function getServerSideProps({ req }) {
  const coachesRes = await fetch(
    `${SERVER_SIDE_API_BASE_URL(req)}users/coaches/all`,
  )
  const jsonCoachesRes = await coachesRes.json()

  return {
    props: {
      coachesList: jsonCoachesRes,
    },
  }
}

function Coaches({ coachesList, setAppCoachesList }) {
  // const [dataCopy, setDataCopy] = useState(coachesListOrderBy(coachesList))
  const [dataCopy, setDataCopy] = useState(coachesList)
  const [jobs, setJobs] = useState([])
  const [sports, setSports] = useState([])
  const [dances, setDances] = useState([])
  const [regions, setRegions] = useState([])

  useEffect(() => {
    Axios.all([
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/jobs`),
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/sports`),
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/dances`),
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/regions`),
    ]).then((res) => {
      setJobs(res[0].data)
      setSports(res[1].data)
      setDances(res[2].data)
      setRegions(getRegionsList(coachesList, res[3].data))
    })
    setAppCoachesList(coachesList)
  }, [])
  // console.log('coachesList: ', coachesList)

  // useEffect(() => {
  //   Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/users/coaches/all`).then((res) => {
  //     return setDataCopy(res.data)
  //   })
  // }, [])

  const [selectedName, setSelectedName] = useState()

  const [selectedJob, setSelectedJob] = useState({})
  const [selectedSpecialty, setSelectedSpecialty] = useState({})
  const [selectedExperienceYears, setSelectedExperienceYears] = useState()
  const [selectedReviewsRate, setSelectedReviewsRate] = useState()
  const [selectedLevel, setSelectedLevel] = useState()
  const [selectedAges, setSelectedAges] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedDate, setSelectedDate] = useState()
  const [filteredItemsNumber, setFilteredItemsNumber] = useState(0)
  const router = useRouter()
  const {
    query: { job, specialty, region, availabilityDate },
  } = router
  const nbrOfCardPerPage = 15
  const isMobile = useMediaPredicate('(max-width: 992px)')

  const [pageNumber, setPageNumber] = useState(1)
  const [pageActiveNumber, setPageActiveNumber] = useState()
  function paginate(array, pageSize, pageNb) {
    return array.slice((pageNb - 1) * pageSize, pageNb * pageSize)
  }
  const renderCoachProfile = (coachProfile) => {
    const j = jobs.find(
      (j) => j._id === (coachProfile.coachData && coachProfile.coachData.job),
    )
    let sp = []
    if (j) {
      if (j.specialty && j.specialty.type === 'sport') {
        sp = coachProfile.coachData.specialty
          ? coachProfile.coachData.specialty.reduce((acc, val) => {
              const element = sports.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      } else if (j.specialty && j.specialty.type === 'dance') {
        sp = coachProfile.coachData.specialty
          ? coachProfile.coachData.specialty.reduce((acc, val) => {
              const element = dances.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      }
    }
    return (
      <CardProfileCoach
        coachProfile={coachProfile}
        key={coachProfile._id}
        job={j}
        specialty={sp}
      />
    )
  }
  useEffect(() => {
    if (job) {
      const foundJob = jobs.find((elem) => elem._id === job)
      if (foundJob) {
        setSelectedJob(foundJob)
      }
    }
    if (specialty) {
      const foundSpecialty = sports
        .concat(dances)
        .find((elem) => elem._id === specialty)
      if (foundSpecialty) {
        setSelectedSpecialty(foundSpecialty)
      }
    }
    if (region) {
      setSelectedRegions([region])
    }
    if (availabilityDate) {
      setSelectedDate(availabilityDate)
    }
  }, [job, specialty, region, availabilityDate])

  useEffect(() => {
    const filter = {
      name: selectedName,
      job: selectedJob._id,
      specialty: selectedSpecialty._id,
      experienceYears: selectedExperienceYears,
      reviewRate: selectedReviewsRate,
      coachingLevel: selectedLevel,
      coachingAges: selectedAges,
      regions: selectedRegions,
      sessionDate: selectedDate,
    }
    const number = Object.values(filter).filter((item) => {
      return (
        (item !== undefined && item !== '' && typeof item !== 'object') ||
        (item && item.length !== 0)
      )
    }).length
    setFilteredItemsNumber(number)
    setDataCopy(getFilteredCoaches(coachesList, filter))
    setPageNumber(1)
    setPageActiveNumber(0)
  }, [
    selectedName,
    selectedJob,
    selectedSpecialty,
    selectedExperienceYears,
    selectedReviewsRate,
    selectedLevel,
    selectedAges,
    selectedRegions,
    selectedDate,
  ])

  const onSearch = (value) => {
    setSelectedName(value.toLowerCase())
  }
  const { Option } = Select
  const handleChange = (value) => {
    if (value.key === 'alphabetique') {
      const sortByAlphabetical = [...dataCopy].sort((a, b) =>
        (a.firstName + a.lastName).toLowerCase() <
        (b.firstName + b.lastName).toLowerCase()
          ? -1
          : 1,
      )
      setDataCopy(sortByAlphabetical)
    } else if (value.key === 'Tout') {
      setDataCopy(
        getFilteredCoaches(
          coachesList,

          {
            name: selectedName,
            job: selectedJob._id,
            specialty: selectedSpecialty._id,
            experienceYears: selectedExperienceYears,
            reviewRate: selectedReviewsRate,
            coachingLevel: selectedLevel,
            coachingAges: selectedAges,
            regions: selectedRegions,
            sessionDate: selectedDate,
          },
        ),
      )
    } else if (value.key === 'experience') {
      const sortByExperience = [...dataCopy].sort((a, b) =>
        a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber
          ? 1
          : -1,
      )
      setDataCopy(sortByExperience)
    } else if (value.key === 'recommander') {
      const sortByRecommend = [...dataCopy].sort((a, b) =>
        a.averageRate < b.averageRate ? 1 : -1,
      )
      setDataCopy(sortByRecommend)
    }
  }
  const deleteFilter = () => {
    setSelectedName()
    setSelectedJob({})
    setSelectedSpecialty({})
    setSelectedExperienceYears()
    setSelectedReviewsRate()
    setSelectedLevel()
    setSelectedAges([])
    setSelectedRegions()
    setSelectedDate()
  }
  const renderFilter = () => {
    return (
      <>
        <FilterCoach
          title="PROFESSIONS"
          jobs={jobs}
          dances={dances}
          sports={sports}
          setSelectedJob={setSelectedJob}
          selectedJob={selectedJob}
        />
        <FilterCoach
          title="SPECIALITES"
          jobs={jobs}
          dances={dances}
          sports={sports}
          setSelectedSpecialty={setSelectedSpecialty}
          selectedSpecialty={selectedSpecialty}
          selectedJob={selectedJob}
        />
        <Experiencefilter
          selectedExperienceYears={selectedExperienceYears}
          setSelectedExperienceYears={setSelectedExperienceYears}
        />
        {/* <Recommendation
          selectedReviewsRate={selectedReviewsRate}
          setSelectedReviewsRate={setSelectedReviewsRate}
        /> */}
        {/* <CoachType
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedAges={selectedAges}
          setSelectedAges={setSelectedAges}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        /> */}
        <CoachRegion
          regions={regions}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>
          iSporit - trouver un coach de tennis, natation, fitness, yoga,
          football, boxe en Tunisie
        </title>
        <meta
          name="description"
          content="Trouvez et réservez en Tunisie votre coach de tennis, natation, fitness, yoga, boxe, football, volley-ball, et réservez une séance en seulement 3 clics"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://isporit.com/coaches" />
        <meta
          property="og:description"
          content="Trouvez et réservez en Tunisie votre coach de tennis, natation, fitness, yoga, boxe, football, volley-ball, et réservez une séance en seulement 3 clics"
        />
        <meta
          property="og:image"
          content="https://isporit.com/icon/coachIsporit.png"
        />
        <link rel="canonical" href="https://isporit.com/coaches" />
        <FacebookPixel />
      </Head>
      <Layout>
        <div className="coaches ">
          <div className="affiche">
            <Image src={affiche} alt="affiche" width={1142} height={266} />
          </div>
          <div className="coaches__coach_details">
            <div className="coaches__coach_details__filter">
              <div
                className="filterbutton isporit-flex-h-space-v-center"
                style={{ fontSize: '15px' }}
              >
                <div>
                  <img src="../../../icon/filtre.png" alt=" " />
                  Nb. filtres{' '}
                  <span className="count--filter js-count--filter">
                    ({filteredItemsNumber})
                  </span>
                </div>
                <button
                  type="button"
                  className="isporit-unset-button-css"
                  onClick={deleteFilter}
                  style={{ fontSize: '12px', paddingRight: '15px' }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
              <div className="isporit-flex-h-start-v-center">
                <ul className="coaches__selected-filtered-items">
                  {selectedName && (
                    <li className="coaches__selected-filtered-item">
                      <span>{selectedName}</span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedName('')}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!isEmpty(selectedJob) && (
                    <li className="coaches__selected-filtered-item">
                      <span>{selectedJob.translations.fr}</span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedJob({})}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!isEmpty(selectedSpecialty) && (
                    <li className="coaches__selected-filtered-item">
                      <span>{selectedSpecialty.translations.fr}</span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedSpecialty({})}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!!selectedExperienceYears && (
                    <li className="coaches__selected-filtered-item">
                      <span> > {selectedExperienceYears} année(s)</span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedExperienceYears()}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!!selectedReviewsRate && (
                    <li className="coaches__selected-filtered-item">
                      <span>{selectedReviewsRate} / 5</span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedReviewsRate()}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {selectedDate && (
                    <li className="coaches__selected-filtered-item">
                      <span>
                        {moment(selectedDate).format('DD-MM-YYYY HH:mm')}
                      </span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedDate()}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!isEmpty(selectedLevel) && (
                    <li className="coaches__selected-filtered-item">
                      <span>
                        {levels[selectedLevel].label[0].toUpperCase() +
                          levels[selectedLevel].label.slice(1)}
                      </span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedLevel()}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!isEmpty(selectedAges) && (
                    <li className="coaches__selected-filtered-item">
                      <span>
                        {selectedAges
                          .map(
                            (age) =>
                              ages[age].label[0].toUpperCase() +
                              ages[age].label.slice(1),
                          )
                          .join(', ')}
                      </span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedAges([])}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                  {!isEmpty(selectedRegions) && (
                    <li className="coaches__selected-filtered-item">
                      <span>
                        {selectedRegions
                          .map((region) => {
                            const found = regions.find(
                              (elem) => elem._id === region,
                            )
                            return found.translations.fr
                          })
                          .join(', ')}
                      </span>
                      <button
                        type="button"
                        className="coaches__delete-filtered-item"
                        onClick={() => setSelectedRegions()}
                      >
                        ✕
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              <Search
                className="coaches__coach_details__filter__input_search"
                placeholder="RECHERCHE PAR NOM"
                value={selectedName}
                onChange={(e) => onSearch(e.target.value)}
              />
              {renderFilter()}
            </div>

            <div className="coaches__coach_details__list_of_coach">
              {isMobile && (
                <Search
                  className="coaches__coach_details__filter__input_search-mobile"
                  placeholder="RECHERCHE PAR NOM"
                  value={selectedName}
                  onChange={(e) => onSearch(e.target.value)}
                />
              )}
              <div className="coaches__coach_details__list_of_coach__length_sort-by">
                {isMobile && (
                  <div className="coaches__coach_details__list_of_coach__length_sort-by__filter">
                    <div className="filerblock">
                      <FilterMobile
                        jobs={jobs}
                        dances={dances}
                        sports={sports}
                        regions={regions}
                        selectedJob={selectedJob}
                        setSelectedJob={setSelectedJob}
                        selectedSpecialty={selectedSpecialty}
                        setSelectedSpecialty={setSelectedSpecialty}
                        selectedRegions={selectedRegions}
                        setSelectedRegions={setSelectedRegions}
                      />
                    </div>
                  </div>
                )}
                {!isMobile && (
                  <div
                    key="desktop"
                    style={{
                      fontSize: '1rem',
                      color: '#646464',
                    }}
                  >
                    {dataCopy.length} résultat(s)
                  </div>
                )}
                {!isMobile && (
                  <div className="coaches__coach_details__list_of_coach__length_sort-by__sortby">
                    <span>Trier par : </span>
                    <Select
                      labelInValue
                      placeholder={ALL}
                      style={{ width: 200 }}
                      bordered={false}
                      className="coaches__coach_details__list_of_coach__length_sort-by__sortby__select"
                      onChange={handleChange}
                    >
                      <Option value={ALL}>Tout</Option>
                      <Option value={ALPHABETICAL}>Ordre alphabétique</Option>
                      <Option value={EXPERIENCE}>Années d'expérience</Option>
                    </Select>
                  </div>
                )}
                {isMobile && (
                  <>
                    <br />
                    <div
                      key="mobile"
                      style={{
                        fontSize: '0.875rem',
                        color: '#646464',
                        textAlign: 'left',
                        marginRight: '29px',
                      }}
                    >
                      {dataCopy.length} résultat(s)
                    </div>
                  </>
                )}
              </div>

              <div className="coaches__coach_details__list_of_coach__card">
                {paginate(dataCopy, nbrOfCardPerPage, pageNumber).map((el) =>
                  renderCoachProfile(el),
                )}
              </div>

              <div className="paginate">
                {dataCopy.length > nbrOfCardPerPage &&
                  Array.from({
                    length: Math.ceil(dataCopy.length / nbrOfCardPerPage),
                  }).map((el, index) => (
                    <div
                      className={
                        pageActiveNumber == index || index + 1 == pageNumber
                          ? 'paginate__page'
                          : ''
                      }
                      key={index}
                      type="submit"
                      onClick={() => {
                        window.scrollTo(400, !isMobile ? 250 : 220)

                        setPageNumber(index + 1), setPageActiveNumber(index)
                      }}
                    >
                      {index + 1}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Coaches

// Coaches.getServerSideProps = async ({ req }) => {
//   const coachesRes = await fetch(
//     `${SERVER_SIDE_API_BASE_URL(req)}users/coaches/all`,
//   )

//   const jsonCoachesRes = await coachesRes.json()

//   return {
//     props: {
//       coachesList: jsonCoachesRes,
//       jobs: [],
//       sports: [],
//       dances: [],
//       regions: [],
//     },
//   }
// }
