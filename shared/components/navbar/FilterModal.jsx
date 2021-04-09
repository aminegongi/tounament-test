/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Icon, Select } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-calendar'
import ColorHash from 'color-hash'
import 'react-calendar/dist/Calendar.css'
import './filter-modal-style.scss'
import moment from 'moment'
import IsporitModal from '../IsporitModal/IsporitModal'

const JOB_STEP = 1
const SPORT_STEP = 2
const REGION_STEP = 3
const AVAILABILITY_STEP = 4

const INITIAL_FILTER_INPUT = {
  specialty: '',
  job: '',
  region: '',
}

const FilterCoachIndexModal = ({
  sports,
  dances,
  jobs,
  regions,
  onCancel,
  ...props
}) => {
  const router = useRouter()
  const colorHash = new ColorHash()
  const [step, setStep] = useState(JOB_STEP)
  const [filterData, setFilterData] = useState({
    specialty: {},
    job: {},
    region: {},
    availabilityDate: {
      date: '',
      hour: `${moment().format('HH')}:00`,
    },
  })
  const [filterInputs, setFilterInputs] = useState(INITIAL_FILTER_INPUT)

  const onChangeFilter = (e) => {
    if (step === SPORT_STEP) {
      setFilterInputs({
        job: '',
        region: '',
        specialty: e.target.value,
      })
    }
    if (step === JOB_STEP) {
      setFilterInputs({
        specialty: '',
        region: '',
        job: e.target.value,
      })
    }
    if (step === REGION_STEP) {
      setFilterInputs({
        specialty: '',
        job: '',
        region: e.target.value,
      })
    }
  }

  const filterValue = () => {
    if (step === SPORT_STEP) {
      return filterInputs.specialty
    }
    if (step === JOB_STEP) {
      return filterInputs.job
    }
    if (step === REGION_STEP) {
      return filterInputs.region
    }
    return ''
  }

  const filterPlaceholder = () => {
    if (step === SPORT_STEP) {
      return 'Quel sport?'
    }
    if (step === JOB_STEP) {
      return 'Quel métier?'
    }
    if (step === REGION_STEP) {
      return 'Quelle zone?'
    }
    return ''
  }

  const onClickBack = () => {
    if (step === SPORT_STEP) {
      return setStep(JOB_STEP)
    }
    if (step === JOB_STEP) {
      return onCancel()
    }
    if (step === REGION_STEP) {
      if (filterData.job.specialty && filterData.job.specialty.type) {
        return setStep(SPORT_STEP)
      }
      return setStep(JOB_STEP)
    }

    if (step === AVAILABILITY_STEP) {
      return setStep(REGION_STEP)
    }
    return null
  }

  return (
    <IsporitModal
      onCancel={onCancel}
      className="filter-coach-index-modal"
      {...props}
    >
      <div className="filter-coach-index-modal__header">
        <Icon
          type="left"
          onClick={onClickBack}
          className="filter-coach-index-modal__header__left-icon"
        />
        <input
          disabled={step === AVAILABILITY_STEP}
          value={filterValue()}
          onChange={onChangeFilter}
          placeholder={filterPlaceholder()}
        />
      </div>
      {step === SPORT_STEP && (
        <div className="filter-coach-index-modal__sports">
          {(filterData.job.specialty &&
          filterData.job.specialty.type === 'sport'
            ? sports
            : dances
          )
            .filter((el) =>
              el.translations.fr.toLowerCase().includes(filterInputs.specialty),
            )
            .map((el) => (
              <button
                key={el._id}
                type="submit"
                onClick={() => {
                  setFilterData({
                    ...filterData,
                    specialty: el,
                  })
                  setStep(REGION_STEP)
                  setFilterInputs(INITIAL_FILTER_INPUT)
                }}
                style={{
                  borderColor: colorHash.hex(
                    el.translations && el.translations.fr,
                  ),
                }}
                className="isporit-unset-button-css filter-coach-index-modal__sports__item"
              >
                <div className="">{el.translations && el.translations.fr}</div>
                <Icon type="right" />
              </button>
            ))}
        </div>
      )}
      {step === JOB_STEP && (
        <div className="filter-coach-index-modal__sports">
          {jobs
            .filter((el) =>
              el.translations.fr.toLowerCase().includes(filterInputs.job),
            )
            .map((el) => (
              <button
                key={el._id}
                type="submit"
                onClick={() => {
                  setFilterData({
                    ...filterData,
                    job: el,
                  })
                  setFilterInputs(INITIAL_FILTER_INPUT)
                  if (el.specialty && el.specialty.type) {
                    return setStep(SPORT_STEP)
                  }
                  return setStep(REGION_STEP)
                }}
                style={{
                  borderColor: colorHash.hex(
                    el.translations && el.translations.fr,
                  ),
                }}
                className="isporit-unset-button-css filter-coach-index-modal__sports__item"
              >
                <div className="">{el.translations && el.translations.fr}</div>
                <Icon type="right" />
              </button>
            ))}
        </div>
      )}
      {step === REGION_STEP && (
        <div className="filter-coach-index-modal__sports">
          {regions
            .filter((el) =>
              el.translations.fr.toLowerCase().includes(filterInputs.region),
            )
            .map((el) => (
              <button
                key={el._id}
                type="submit"
                onClick={() => {
                  setFilterData({
                    ...filterData,
                    region: el,
                  })
                  setStep(AVAILABILITY_STEP)
                  setFilterInputs(INITIAL_FILTER_INPUT)
                }}
                style={{
                  borderColor: colorHash.hex(
                    el.translations && el.translations.fr,
                  ),
                }}
                className="isporit-unset-button-css filter-coach-index-modal__sports__item"
              >
                <div className="">{el.translations && el.translations.fr}</div>
                <Icon type="right" />
              </button>
            ))}
        </div>
      )}
      {step === AVAILABILITY_STEP && (
        <div className="filter-coach-index-modal__availability-container">
          <Calendar
            locale="fr"
            className="filter-coach-index-modal__availability-container__calendar"
            showNeighboringMonth={false}
            // value={moment(filterData.availabilityDate).format()}
            onChange={(newDate) => {
              setFilterData({
                ...filterData,
                availabilityDate: {
                  ...filterData.availabilityDate,
                  date: moment(newDate).format('YYYY-MM-DD'),
                },
              })
            }}
            view="month"
          />
          <div className="filter-coach-index-modal__availability-container__hours">
            <label htmlFor="hour">Quelle heure?</label>
            <Select
              showSearch
              className="filter-coach-index-modal__availability-container__hours__select"
              style={{ width: '100%' }}
              optionFilterProp="children"
              onChange={(e) => {
                setFilterData({
                  ...filterData,
                  availabilityDate: {
                    ...filterData.availabilityDate,
                    hour: e,
                  },
                })
              }}
              value={filterData.availabilityDate.hour}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {Array.from({ length: 24 }).map((elt, index) => {
                return (
                  <Select.Option value={`${index < 9 ? '0' : ''}${index}:00`}>
                    {`${index < 9 ? '0' : ''}${index}:00`}
                  </Select.Option>
                )
              })}
            </Select>
          </div>
          <div className="filter-coach-index-modal__availability-container__footer">
            <button
              onClick={() => {
                router.push({
                  pathname: '/coaches',
                  query: {
                    job: filterData.job._id,
                    specialty: filterData.specialty._id,
                    region: filterData.region._id,
                  },
                })
                onCancel()
              }}
              type="submit"
              className="isporit-unset-button-css"
            >
              <u>Passer</u>
            </button>
            <button
              onClick={() => {
                router.push({
                  pathname: '/coaches',
                  query: {
                    job: filterData.job._id,
                    specialty: filterData.specialty._id,
                    region: filterData.region._id,
                    availabilityDate: `${filterData.availabilityDate.date} ${filterData.availabilityDate.hour}`,
                  },
                })
                onCancel()
              }}
              type="submit"
              className="isporit-primary-button"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </IsporitModal>
  )
}
FilterCoachIndexModal.propTypes = {
  sports: PropTypes.arrayOf(PropTypes.any),
  dances: PropTypes.arrayOf(PropTypes.any),
  jobs: PropTypes.arrayOf(PropTypes.any),
  regions: PropTypes.arrayOf(PropTypes.any),
  onCancel: PropTypes.func.isRequired,
}
FilterCoachIndexModal.defaultProps = {
  sports: [],
  dances: [],
  jobs: [],
  regions: [],
}
export default FilterCoachIndexModal
