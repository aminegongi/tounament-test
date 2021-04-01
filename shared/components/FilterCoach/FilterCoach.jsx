/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import './filterCoach.scss'
import { Empty } from 'antd'
import down from '../../../public/icon/down.png'
import left from '../../../public/icon/left.png'

export default function FilterCoach({
  title,
  jobs,
  coachSpecialty,
  setCoachSpecialty,
  setCoachSpecialtyFilter,
  coachSpecialtyFilter,
  setDataCopy,
  dataCopy,
  coachesList,
  dances,
  sports,
}) {
  const [icon, seticon] = useState(left)
  const [selectedJobId, setSelectedJobId] = useState()
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState()
  const [professionId, setProfessionId] = useState()
  const changeIcon = () => {
    if (icon === down) {
      seticon(left)
    }
    if (icon === left) {
      seticon(down)
    }
  }
  const filterSpecialty = () => {
    if (coachSpecialty === 'sport') {
      return setCoachSpecialtyFilter(sports)
    }
    if (coachSpecialty === 'dances') {
      return setCoachSpecialtyFilter(dances)
    }
    return setCoachSpecialtyFilter('')
  }
  useEffect(() => {
    filterSpecialty()
  }, [coachSpecialty])
  const filterBySpecialty = (el) => {
    const filteredCoachesList = dataCopy.filter((e) =>
      e.coachData.specialty.includes(el),
    )
    setDataCopy(filteredCoachesList)
  }

  const handleProfession = (Profession) => {
    // window.scrollTo(400, 350)
    setProfessionId(Profession._id)

    if (Profession._id == professionId) {
      setDataCopy(coachesList)
      setProfessionId('')
    } else {
      setDataCopy(dataCopy.filter((e) => e.coachData.job == Profession._id))
    }
  }

  const handleSpecialty = (specialty) => {
    // window.scrollTo(400, 350)

    if (specialty._id === selectedSpecialtyId) {
      setSelectedSpecialtyId('')
      setDataCopy(coachesList)
    } else {
      filterBySpecialty(specialty._id)
      setSelectedSpecialtyId(specialty._id)
    }
  }

  const displayProfessions = () => {
    if (icon === down) {
      return (
        <div
          className={
            icon !== down
              ? 'filter_coach__filter_type__title__Professions__items'
              : 'filter_coach__show'
          }
        >
          {jobs
            // .sort((a, b) => (a.translations.fr > b.translations.fr ? 1 : -1))
            .map((job) => {
              return (
                <>
                  <div
                    className={
                      icon === down
                        ? 'filter_coach__filter_type__title__Professions__items__iteam'
                        : 'filter_coach__filter_type__title__Professions__items__iteamnotvisible'
                    }
                  >
                    <button
                      type="button"
                      className="isporit-unset-button-css"
                      style={{ textAlign: 'left' }}
                      onClick={() => {
                        handleProfession(job)
                        if (
                          coachSpecialty === job.specialty.type &&
                          selectedJobId === job._id
                        ) {
                          setCoachSpecialty('')
                          setSelectedJobId('')
                        } else {
                          setCoachSpecialty(job.specialty.type)
                          setSelectedJobId(job._id)
                        }
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedSpecialtyId('')}
                        style={{ textAlign: 'left' }}
                        className={
                          job._id === selectedJobId
                            ? 'isporit-unset-button-css filter_coach__filter_type__title__Professions__items__iteam__iteamshow'
                            : 'isporit-unset-button-css '
                        }
                      >
                        {job.translations.fr}
                      </button>
                    </button>
                  </div>
                </>
              )
            })}
        </div>
      )
    }
  }

  const displaySpecialties = () => {
    if (icon === down && coachSpecialtyFilter !== '') {
      return (
        <div
          className={
            icon !== down
              ? 'filter_coach__filter_type__title__Professions__items'
              : 'filter_coach__show'
          }
        >
          <div
            className={
              icon === down
                ? 'filter_coach__filter_type__title__Professions__items__iteam'
                : 'filter_coach__filter_type__title__Professions__items__iteamnotvisible'
            }
          >
            {coachSpecialtyFilter
              .sort((a, b) => (a.translations.fr > b.translations.fr ? 1 : -1))
              .map((coach) => {
                return (
                  <button
                    type="button"
                    className="isporit-unset-button-css filter_coach__filter_type__title__Professions__items__iteam"
                    onClick={() => handleSpecialty(coach)}
                  >
                    <div
                      className={
                        coach._id == selectedSpecialtyId
                          ? 'filter_coach__filter_type__title__Professions__items__iteam__iteamshow'
                          : ''
                      }
                    >
                      {coach.translations.fr}
                    </div>
                  </button>
                )
              })}
          </div>
        </div>
      )
    }
    if (icon === down && coachSpecialtyFilter === '') {
      return (
        <>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Pas de spécialité disponible</span>}
          />
        </>
      )
    }
  }

  return (
    <div className="filter_coach">
      <div className="filter_coach__filter_type">
        <div className="filter_coach__filter_type__title">
          <button
            type="button"
            onClick={() => changeIcon()}
            className="isporit-unset-button-css"
            style={{ width: '100%' }}
          >
            <div className="filter_coach__filter_type__title__Professions">
              <div className="">{title}</div>
              <img
                src={icon}
                className={icon === down ? 'down' : 'left'}
                alt=""
              />
            </div>
          </button>
          {title === 'PROFESSIONS'
            ? displayProfessions()
            : displaySpecialties()}
        </div>
      </div>
    </div>
  )
}
