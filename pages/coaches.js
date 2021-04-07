/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import { Input, Select, Modal } from 'antd'
import '../shared/css/coaches.scss'
import '../shared/global-style.scss'
import Head from 'next/head'

import fetch from 'isomorphic-unfetch'
import { useMediaPredicate } from 'react-media-hook'
import {
  ALL,
  ALPHABETICAL,
  RECOMMEND,
  EXPERIENCE,
  SERVER_SIDE_API_BASE_URL,
} from '../shared/constants'
import FilterCoach from '../shared/components/FilterCoach/FilterCoach'
import Experiencefilter from '../shared/components/Experiencefilter/Experiencefilter'
import Recommendation from '../shared/components/RecommendationFilter/Recommendation'
import CoachType from '../shared/components/CoachTypeFilter/CoachType'
import CoachRegion from '../shared/components/CoachRegionFilter/CoachRegion'
import CardProfileCoach from '../shared/components/CardProfileCoachFilter/CardProfileCoach'
import affiche from '../public/icon/Banniere.png'
import Layout from '../shared/components/layout/Layout'
import { getFilteredCoaches } from './../utils/arrays.utils'
import { getFormattedNumber } from '../utils/number.utils'
import { useRouter } from 'next/router'

const { Search } = Input

export default function Coaches({
  coachesList,
  jobs,
  sports,
  dances,
  regions,
}) {
  const [dataCopy, setDataCopy] = useState(coachesList)
  const [selectedName, setSelectedName] = useState()

  const [selectedJob, setSelectedJob] = useState({})
  const [selectedSpecialty, setSelectedSpecialty] = useState({})
  const [selectedExperienceYears, setSelectedExperienceYears] = useState()
  const [selectedReviewsRate, setSelectedReviewsRate] = useState()
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedAges, setSelectedAges] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])
    const router = useRouter()
  const {query: {job, specialty, region}}=router
  const nbr_of_card_per_page = 15
  const isMobile = useMediaPredicate('(max-width: 992px)')

  const [pageNumber, setPageNumber] = useState(1)
  const [pageActiveNumber, setPageActiveNumber] = useState()
  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size)
  }
  const renderCoachProfile = (coachProfile) => {
    const job = jobs.find(
      (j) => j._id === (coachProfile.coachData && coachProfile.coachData.job),
    )
    let specialty = ''
    if (job) {
      if (job.specialty && job.specialty.type === 'sport') {
        specialty = coachProfile.coachData.specialty
          ? coachProfile.coachData.specialty.reduce((acc, val) => {
              const element = sports.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      } else if (job.specialty && job.specialty.type === 'dance') {
        specialty = coachProfile.coachData.specialty
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
        job={job}
        specialty={specialty}
      />
    )
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    if(job){
      const foundJob=jobs.find(elem=>elem._id===job)
      if(foundJob) {
        setSelectedJob(foundJob)
      }
    }
    if (specialty) {
      const foundSpecialty = sports.concat(dances).find((elem) => (elem._id === specialty))
       if (foundSpecialty) {
         setSelectedSpecialty(foundSpecialty)
       }       
    }
    if (region) {
      
        setSelectedRegions([region])
    }

  }, [ job, specialty, region ])

  useEffect(() => {
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
        },
      ),
    )
  }, [
    selectedName,
    selectedJob,
    selectedSpecialty,
    selectedExperienceYears,
    selectedReviewsRate,
    selectedLevel,
    selectedAges,
    selectedRegions,
  ])
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onSearch = (value) => {
    setSelectedName(value)
  }
  const { Option } = Select
  const handleChange = (value) => {
    if (value.key === 'alphabetique') {
      const sortByAlphabetical = [...dataCopy].sort((a, b) =>
        (a.firstName +a.lastName)< (b.firstName+b.lastName) ? -1 : 1,
      )
      return setDataCopy(sortByAlphabetical)
    }

    if (value.key === 'Tout') {
      return setDataCopy(coachesList)
    }
    if (value.key === 'experience') {
      const sortByExperience = [...dataCopy].sort((a, b) =>
        a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber
          ? 1
          : -1,
      )
      return setDataCopy(sortByExperience)
    }
    if (value.key === 'recommander') {
      const sortByRecommend = [...coachesList].sort((a, b) =>
        a.averageRate < b.averageRate ? 1 : -1,
      )
      return setDataCopy(sortByRecommend)
    }
  }
  const renderFilter =()=>{
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
        />
        <Experiencefilter
          selectedExperienceYears={selectedExperienceYears}
          setSelectedExperienceYears={setSelectedExperienceYears}
        />
        <Recommendation
          selectedReviewsRate={selectedReviewsRate}
          setSelectedReviewsRate={setSelectedReviewsRate}
        />
        <CoachType
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedAges={selectedAges}
          setSelectedAges={setSelectedAges}
        />
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
        <title>Liste des coaches</title>
        <meta
          name="description"
          content="A la recherche d'un coach? Vous voulez faire du sport ou de la dance mais vous ne savez pas par où commencer? Vous voulez faire du yoga mais vous ne savez pas qui contacter?
iSporit vous offre la possibilité de choisir votre coach selon vos propres critères."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://isporit.com/coaches" />
        <meta
          property="og:description"
          content="A la recherche d'un coach? Vous voulez faire du sport ou de la dance mais vous ne savez pas par où commencer? Vous voulez faire du yoga mais vous ne savez pas qui contacter?
iSporit vous offre la possibilité de choisir votre coach selon vos propres critères. "
        />
        <meta
          property="og:image"
          content="https://isporit.com/icon/coachIsporit.png"
        />
        <link rel="canonical" href="https://isporit.com/coaches" />
      </Head>
      <Layout>
        <div className="coaches ">
          <div className="affiche">
            <img className="affiche__img" src={affiche} alt="affiche" />
          </div>
          <div className="coaches__coach_details">
            <div className="coaches__coach_details__filter">
              <Search
                className="coaches__coach_details__filter__input_search"
                placeholder="RECHERCHE PAR NOM"
                onChange={(e) => onSearch(e.target.value)}
              />
              {renderFilter()}
            </div>

            <div className="coaches__coach_details__list_of_coach">
              {isMobile && (
                <Search
                  className="coaches__coach_details__filter__input_search-mobile"
                  placeholder="RECHERCHE PAR NOM"
                  onChange={(e) => onSearch(e.target.value)}
                />
              )}
              <div className="coaches__coach_details__list_of_coach__lenght_sortby">
                <div className="coaches__coach_details__list_of_coach__lenght_sortby__filter">
                  <div className="filerblock">
                    <img src="../../../icon/filtre.png" alt=" " />
                    <div className="filterbutton" onClick={showModal}>
                      Filter
                    </div>
                  </div>

                  <Modal
                    title="FILTRES"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    {renderFilter()}
                    {}
                  </Modal>
                </div>
                <div className="coaches__coach_details__list_of_coach__lenght_sortby__lenght">
                  {dataCopy.length} résultat(s)
                </div>
                <div className="coaches__coach_details__list_of_coach__lenght_sortby__sortby">
                  <span>Trier par : </span>
                  <Select
                    labelInValue
                    placeholder={ALL}
                    style={{ width: 200 }}
                    bordered={false}
                    className="coaches__coach_details__list_of_coach__lenght_sortby__sortby__select"
                    onChange={handleChange}
                  >
                    <Option value={ALL}>Tout</Option>
                    <Option value={ALPHABETICAL}>Ordre alphabétique</Option>
                    <Option value={RECOMMEND}>Les plus recommandés</Option>
                    <Option value={EXPERIENCE}>Années d'expérience</Option>
                  </Select>
                </div>
              </div>
              <div className="lineprofilecoach" />
              <div className="coaches__coach_details__list_of_coach__card">
                {paginate(
                  dataCopy,
                  nbr_of_card_per_page,
                  pageNumber,
                ).map((el, key) => renderCoachProfile(el))}
              </div>

              <div className="paginate">
                {Array.from({
                  length: Math.ceil(dataCopy.length / nbr_of_card_per_page),
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
Coaches.getInitialProps = async ({ req }) => {
  const coachesRes = await fetch(
    `${SERVER_SIDE_API_BASE_URL(req)}users/coaches/all`,
  )
  const jobsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}jobs`)
  const sportsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}sports`)
  const danceRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}dances/`)
  const regionsRes = await fetch(`${SERVER_SIDE_API_BASE_URL(req)}regions/`)
  let jsonCoachesRes = await coachesRes.json()
  if (jsonCoachesRes) {
    jsonCoachesRes = jsonCoachesRes.map((coach) => {
      let averageRate = 0
      if (
        coach.coachData &&
        coach.coachData.reviews &&
        coach.coachData.reviews.length !== 0
      ) {
        averageRate = getFormattedNumber(
          coach.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
            coach.coachData.reviews.length,
        )
      }
      return { ...coach, averageRate }
    })
  }
  let jsonJobsRes = await jobsRes.json()

  if (jsonJobsRes) {
    jsonJobsRes = jsonJobsRes
      .filter((job) => job.isPublic)
      .sort((a, b) => a.order - b.order)
  }

  let jsonSportsRes = await sportsRes.json()
  if (jsonSportsRes) {
    jsonSportsRes = jsonSportsRes.filter((sport) => sport.type !== undefined)
  }
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
