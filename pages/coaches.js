/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { Input, Select, Modal } from 'antd'
import '../shared/css/coaches.scss'
import '../shared/global-style.scss'
import fetch from 'isomorphic-unfetch'
import { useMediaPredicate } from 'react-media-hook'
import {
  ALL,
  ALPHABETICAL,
  RECOMMEND,
  EXPERIENCE,
  API,
} from '../shared/constants'
import FilterCoach from '../shared/components/FilterCoach/FilterCoach'
import Experiencefilter from '../shared/components/Experiencefilter/Experiencefilter'
import Recommendation from '../shared/components/RecommendationFilter/Recommendation'
import CoachType from '../shared/components/CoachTypeFilter/CoachType'
import CoachRegion from '../shared/components/CoachRegionFilter/CoachRegion'
import CardProfileCoach from '../shared/components/CardProfileCoachFilter/CardProfileCoach'
import affiche from '../public/icon/Banniere.png'
import Layout from '../shared/components/layout/Layout'

const { Search } = Input

export default function Coaches({
  coachesList,
  jobs,
  sports,
  dances,
  regions,
}) {
  const [dataCopy, setDataCopy] = useState(coachesList)
  const [coachSpecialty, setCoachSpecialty] = useState()
  const [coachSpecialtyFilter, setCoachSpecialtyFilter] = useState('')
  const nbr_of_card_per_page = 9
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
    setDataCopy(
      dataCopy.filter(
        (e) => e.firstName.includes(value) || e.lastName.includes(value),
      ),
    )
  }
  const { Option } = Select
  const handleChange = (value) => {
    if (value.key === 'alphabetique') {
      const sortbyalphabetical = [...dataCopy].sort((a, b) =>
        a.firstName - b.firstName ? 1 : -1,
      )
      return setDataCopy(sortbyalphabetical)
    }

    if (value.key === 'Tout') {
      return setDataCopy(coachesList)
    }
    if (value.key === 'experience') {
      const sortbyexperience = [...dataCopy].sort((a, b) =>
        a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber
          ? 1
          : -1,
      )
      return setDataCopy(sortbyexperience)
    }
    if (value.key === 'recommander') {
      const sortbyrecommend = [...coachesList].sort((a, b) =>
        Math.round(
          a.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
            a.coachData.reviews.length,
        ) <
        Math.round(
          b.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
            b.coachData.reviews.length,
        )
          ? 1
          : -1,
      )
      return setDataCopy(sortbyrecommend)
    }
  }

  return (
    <Layout>
      <div className="profil_coach">
        <div className="affiche">
          <img className="affiche__img" src={affiche} alt="affiche" />
        </div>
        <div className="profil_coach__coach_details">
          <div className="profil_coach__coach_details__filter">
            {!isMobile && (
              <Search
                className="profil_coach__coach_details__filter__input_searsh"
                placeholder="RECHERCHE PAR NOM"
                onChange={(e) => onSearch(e.target.value)}
              />
            )}

            {/* <div className="lineprofilecoach" /> */}

            <FilterCoach
              coachSpecialty={coachSpecialty}
              setCoachSpecialty={setCoachSpecialty}
              setCoachSpecialtyFilter={setCoachSpecialtyFilter}
              coachSpecialtyFilter={coachSpecialtyFilter}
              dances={dances}
              sports={sports}
              title="PROFESSIONS"
              jobs={jobs}
              setDataCopy={setDataCopy}
              dataCopy={dataCopy}
              coachesList={coachesList}
            />
            {/* <div className="lineprofilecoach" /> */}
            <FilterCoach
              dances={dances}
              sports={sports}
              setDataCopy={setDataCopy}
              dataCopy={dataCopy}
              coachesList={coachesList}
              coachSpecialty={coachSpecialty}
              setCoachSpecialty={setCoachSpecialty}
              setCoachSpecialtyFilter={setCoachSpecialtyFilter}
              coachSpecialtyFilter={coachSpecialtyFilter}
              jobs={jobs}
              title="SPECIALITES"
            />
            {/* <div className="lineprofilecoach" /> */}
            <Experiencefilter
              setDataCopy={setDataCopy}
              dataCopy={dataCopy}
              coachesList={coachesList}
            />
            {/* <div className="lineprofilecoach" /> */}
            <Recommendation
              dataCopy={dataCopy}
              setDataCopy={setDataCopy}
              coachesList={coachesList}
            />
            {/* <div className="lineprofilecoach" /> */}
            <CoachType
              setDataCopy={setDataCopy}
              dataCopy={dataCopy}
              coachesList={coachesList}
            />
            {/* <div className="lineprofilecoach" /> */}
            <CoachRegion
              regions={regions}
              setDataCopy={setDataCopy}
              dataCopy={dataCopy}
              coachesList={coachesList}
            />
          </div>

          <div className="profil_coach__coach_details__list_of_coach">
            {isMobile && (
              <Search
                className="profil_coach__coach_details__filter__input_searshmobile"
                placeholder="RECHERCHE PAR NOM"
                onChange={(e) => onSearch(e.target.value)}
                // style={{
                //     width: 270,
                // }}
              />
            )}
            <div className="profil_coach__coach_details__list_of_coach__lenght_sortby">
              <div className="profil_coach__coach_details__list_of_coach__lenght_sortby__filter">
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
                  <FilterCoach
                    coachSpecialty={coachSpecialty}
                    setCoachSpecialty={setCoachSpecialty}
                    setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                    coachSpecialtyFilter={coachSpecialtyFilter}
                    dances={dances}
                    sports={sports}
                    title="PROFESSIONS"
                    jobs={jobs}
                    setDataCopy={setDataCopy}
                    dataCopy={dataCopy}
                    coachesList={dataCopy}
                  />
                  <FilterCoach
                    dances={dances}
                    sports={sports}
                    setDataCopy={setDataCopy}
                    dataCopy={dataCopy}
                    coachesList={dataCopy}
                    coachSpecialty={coachSpecialty}
                    setCoachSpecialty={setCoachSpecialty}
                    setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                    coachSpecialtyFilter={coachSpecialtyFilter}
                    jobs={jobs}
                    title="SPECIALITES"
                  />
                  <div className="lineprofilecoach" />
                  <Experiencefilter
                    setDataCopy={setDataCopy}
                    dataCopy={dataCopy}
                    coachesList={coachesList}
                  />
                  <div className="lineprofilecoach" />
                  <Recommendation
                    dataCopy={dataCopy}
                    setDataCopy={setDataCopy}
                    coachesList={coachesList}
                  />
                  <div className="lineprofilecoach" />
                  <CoachType
                    setDataCopy={setDataCopy}
                    dataCopy={dataCopy}
                    coachesList={coachesList}
                  />
                  <div className="lineprofilecoach" />
                  <CoachRegion
                    regions={regions}
                    setDataCopy={setDataCopy}
                    dataCopy={dataCopy}
                    coachesList={coachesList}
                  />
                </Modal>
              </div>
              <div className="profil_coach__coach_details__list_of_coach__lenght_sortby__lenght">
                {dataCopy.length} résultat(s)
              </div>
              <div className="profil_coach__coach_details__list_of_coach__lenght_sortby__sortby">
                <span>Trier par : </span>
                <Select
                  labelInValue
                  placeholder={ALL}
                  style={{ width: 200 }}
                  bordered={false}
                  className="profil_coach__coach_details__list_of_coach__lenght_sortby__sortby__select"
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
            <div className="profil_coach__coach_details__list_of_coach__card">
              {paginate(
                dataCopy,
                nbr_of_card_per_page,
                pageNumber,
              ).map((el, key) => renderCoachProfile(el))}
            </div>

            <div className="paginate">
              {Array.from({
                length: Math.round(dataCopy.length / nbr_of_card_per_page),
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
  )
}
Coaches.getInitialProps = async () => {
  const coachesRes = await fetch(`${API}users/coaches/all`)
  const jobsRes = await fetch(`${API}jobs`)
  const sportsRes = await fetch(`${API}sports`)
  const danceRes = await fetch(`${API}dances/`)
  const regionsRes = await fetch(`${API}regions/`)
  const jsonCoachesRes = await coachesRes.json()
  const jsonJobsRes = await jobsRes.json()
  let jsonSportsRes = await sportsRes.json()
  if(jsonSportsRes){
    jsonSportsRes=jsonSportsRes.filter(sport=>sport.type!==undefined)
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
