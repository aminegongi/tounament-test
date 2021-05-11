/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import './filterCoach.scss'
// import { useRouter } from 'next/router'
import { Empty } from 'antd'
import down from '../../../public/icon/down.png'
import left from '../../../public/icon/left.png'

export default function FilterCoach({
  title,
  jobs,
  dances,
  sports,
  selectedJob,
  setSelectedJob,
  selectedSpecialty,
  setSelectedSpecialty,
}) {
  const [icon, setIcon] = useState(down)
  const [specialties, setSpecialties] = useState('')

  const changeIcon = () => {
    if (icon === down) {
      setIcon(left)
    }
    if (icon === left) {
      setIcon(down)
    }
  }
  const filterSpecialty = () => {
    if (!isEmpty(selectedJob)) {
      if (selectedJob.specialty.type === 'sport') {
        setSpecialties(sports)
      } else if (selectedJob.specialty.type === 'dance') {
        setSpecialties(dances)
      } else {
        setSpecialties('')
      }
    } else {
      setSpecialties(sports)
    }
  }

  useEffect(() => {
    filterSpecialty()
  }, [selectedJob, sports])

  const handleJob = (job) => {
    window.scrollTo(400, 250)

    if (job._id === selectedJob._id) {
      setSelectedJob({})
    } else {
      setSelectedJob(job)
    }
  }

  const handleSpecialty = (specialty) => {
    window.scrollTo(400, 250)

    if (specialty._id === selectedSpecialty._id) {
      setSelectedSpecialty({})
    } else {
      setSelectedSpecialty(specialty)
    }
  }

  const displayJobs = () => {
    if (icon === down) {
      return (
        <div
          className={
            icon !== down
              ? 'filter_coach__filter_type__title__Professions__items'
              : 'filter_coach__show'
          }
        >
          {jobs.map((job) => {
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
                    className={
                      selectedJob && job._id === selectedJob._id
                        ? 'isporit-unset-button-css filter_coach__filter_type__title__Professions__items__iteam__iteamshow'
                        : 'isporit-unset-button-css '
                    }
                    style={{ textAlign: 'left' }}
                    onClick={() => {
                      handleJob(job)
                    }}
                  >
                    {job.translations.fr}
                  </button>
                </div>
              </>
            )
          })}
        </div>
      )
    }
  }
  console.log('specialties: ', specialties)

  const displaySpecialties = () => {
    if (icon === down && specialties !== '') {
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
            {specialties
              .sort((a, b) => (a.translations.fr > b.translations.fr ? 1 : -1))
              .map((specialty) => {
                return (
                  <button
                    type="button"
                    className="isporit-unset-button-css filter_coach__filter_type__title__Professions__items__iteam"
                    onClick={() => handleSpecialty(specialty)}
                  >
                    <div
                      className={
                        selectedSpecialty &&
                        specialty._id == selectedSpecialty._id
                          ? 'filter_coach__filter_type__title__Professions__items__iteam__iteamshow'
                          : ''
                      }
                    >
                      {specialty.translations.fr}
                    </div>
                  </button>
                )
              })}
          </div>
        </div>
      )
    }
    if (icon === down && specialties === '') {
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
          {title === 'PROFESSIONS' ? displayJobs() : displaySpecialties()}
        </div>
      </div>
    </div>
  )
}
