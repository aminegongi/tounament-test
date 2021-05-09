import React, { useState, useEffect } from 'react'
import './FilterMobile.scss'
import { Popover, Empty } from 'antd'
import { isEmpty } from 'lodash'
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
}) {
  // console.log('selectedJob: ', selectedJob)
  const [specialties, setSpecialties] = useState('')
  const [jobVisible, setJobVisible] = useState(false)
  const [specialtyVisible, setSpecialtyVisible] = useState(false)
  const [regionVisible, setRegionVisible] = useState(false)

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
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )
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
            <span> Profession : {selectedJob.translations.fr} </span>
          )}

          {isEmpty(selectedJob) && <span> Professions </span>}
        </span>
      </Popover>
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
            <span> Spécialité : {selectedSpecialty.translations.fr} </span>
          )}
          {isEmpty(selectedSpecialty) && <span> Spécialités </span>}
        </span>
      </Popover>
      <Popover
        placement="bottom"
        title="Régions"
        content={displayRegions()}
        trigger="click"
        visible={regionVisible}
        onVisibleChange={(visible) => setRegionVisible(visible)}
      >
        <span className="filter-mobile__mobile-filter">
          {/* {!isEmpty(selectedJob) && selectedJob.translations.fr} */}
          {/* {!isEmpty(selectedJob) && <span> 1 Profession </span>} */}
          {!isEmpty(selectedRegions) && (
            <span> Région : {regions.find(
                              (elem) => elem._id === selectedRegions[0],
                            ).translations.fr} </span>
          )}

          {isEmpty(selectedRegions) && <span> Régions </span>}
        </span>
      </Popover>
    </div>
  )
}
