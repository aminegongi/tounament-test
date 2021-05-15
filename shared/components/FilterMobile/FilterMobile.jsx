import React, { useState, useEffect } from 'react'
import './FilterMobile.scss'
import { Popover, Empty } from 'antd'
import { isEmpty } from 'lodash'
import { COACH_FILTER_SESSION_TYPE } from '../../constants'

export default function FilterMobile({
  jobs,
  dances,
  sports,
  regions,
  selectedJob,
  setSelectedJob,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedRegions,
  setSelectedRegions,
  selectedType,
  setSelectedType,
}) {
  const [specialties, setSpecialties] = useState('')
  const [jobVisible, setJobVisible] = useState(false)
  const [specialtyVisible, setSpecialtyVisible] = useState(false)
  const [regionVisible, setRegionVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)

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
  }, [selectedJob])

  const handleJob = (job) => {
    if (job._id === selectedJob._id) {
      setSelectedJob({})
    } else {
      setSelectedJob(job)
    }
  }

  const handleSpecialty = (specialty) => {
    if (specialty._id === selectedSpecialty._id) {
      setSelectedSpecialty({})
    } else {
      setSelectedSpecialty(specialty)
    }
  }
  const handleRegions = (region) => {
    if (!isEmpty(selectedRegions) && region._id === selectedRegions[0]) {
      setSelectedRegions([])
    } else {
      setSelectedRegions([region._id])
    }
  }
  const displayJobs = () => {
    return jobs.map((job) => {
      return (
        <div
          className={
            !isEmpty(selectedJob) &&
            job._id === selectedJob._id &&
            'filter-mobile__active'
          }
          onClick={() => {
            handleJob(job)
            setJobVisible(false)
          }}
        >
          {job.translations.fr}
        </div>
      )
    })
  }

  const displayType = () => {
    const typeData = [
      COACH_FILTER_SESSION_TYPE.online,
      COACH_FILTER_SESSION_TYPE.atHome,
      COACH_FILTER_SESSION_TYPE.onsite,
    ]
    return typeData.map((type) => {
      return (
        <div
          className={
            !isEmpty(selectedType) &&
            type === selectedType[0] &&
            'filter-mobile__active'
          }
          onClick={() => {
            if (type === selectedType[0]) {
              setSelectedType([])
            } else {
              setSelectedType([type])
            }
            setTypeVisible(false)
          }}
        >
          {type}
        </div>
      )
    })
  }

  const displayRegions = () => {
    return regions.map((region) => {
      return (
        <div
          className={
            !isEmpty(selectedRegions) &&
            region._id === selectedRegions[0] &&
            'filter-mobile__active'
          }
          onClick={() => {
            handleRegions(region)
            setRegionVisible(false)
          }}
        >
          {region.translations.fr}
        </div>
      )
    })
  }

  const displaySpecialties = () => {
    if (specialties !== '') {
      return specialties
        .sort((a, b) => (a.translations.fr > b.translations.fr ? 1 : -1))
        .map((specialty) => {
          return (
            <div
              className={
                !isEmpty(selectedSpecialty) &&
                specialty._id == selectedSpecialty._id &&
                'filter-mobile__active'
              }
              onClick={() => {
                handleSpecialty(specialty)
                setSpecialtyVisible(false)
              }}
            >
              {specialty.translations.fr}
            </div>
            // </button>
          )
        })
    }
    if (specialties === '') {
      return (
        <>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Pas de spécialités</span>}
          />
        </>
      )
    }
  }
  return (
    <div className="filter-mobile">
      <Popover
        placement="bottom"
        title="Professions"
        content={displayJobs()}
        trigger="click"
        visible={jobVisible}
        onVisibleChange={(visible) => setJobVisible(visible)}
      >
        <span className="filter-mobile__mobile-filter">
          {/* {!isEmpty(selectedJob) && selectedJob.translations.fr} */}
          {/* {!isEmpty(selectedJob) && <span> 1 Profession </span>} */}
          {!isEmpty(selectedJob) && (
            <span> Profession: {selectedJob.translations.fr} </span>
          )}

          {isEmpty(selectedJob) && <span> Professions </span>}
        </span>
      </Popover>
      {specialties !== '' && (
        <Popover
          placement="bottom"
          title="Spécialités"
          content={displaySpecialties()}
          trigger="click"
          visible={specialtyVisible}
          onVisibleChange={(visible) => setSpecialtyVisible(visible)}
        >
          <span className="filter-mobile__mobile-filter">
            {!isEmpty(selectedSpecialty) && (
              <span> Spécialité: {selectedSpecialty.translations.fr} </span>
            )}
            {isEmpty(selectedSpecialty) && <span> Spécialités </span>}
          </span>
        </Popover>
      )}
      <Popover
        placement="bottom"
        title="Régions"
        content={displayRegions()}
        trigger="click"
        visible={regionVisible}
        onVisibleChange={(visible) => setRegionVisible(visible)}
      >
        <span className="filter-mobile__mobile-filter">
          {!isEmpty(selectedRegions) && (
            <span>
              Région:{' '}
              {
                regions.find((elem) => elem._id === selectedRegions[0])
                  .translations.fr
              }{' '}
            </span>
          )}

          {isEmpty(selectedRegions) && <span> Régions </span>}
        </span>
      </Popover>
      <Popover
        placement="bottom"
        title="Type"
        content={displayType()}
        trigger="click"
        visible={typeVisible}
        onVisibleChange={(visible) => setTypeVisible(visible)}
      >
        <span className="filter-mobile__mobile-filter">
          {!isEmpty(selectedType) && <span>Type: {selectedType} </span>}

          {isEmpty(selectedType) && <span> Type </span>}
        </span>
      </Popover>
    </div>
  )
}
