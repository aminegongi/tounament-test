import React from 'react'
import './coachType.scss'
import { Radio, Slider, Checkbox } from 'antd'

export default function CoachType({
  // setDataCopy, dataCopy, coachesList
  selectedLevel,
  setSelectedLevel,
  selectedAges,
  setSelectedAges,
  selectedDate,
  setSelectedDate,
}) {
  const marks = {
    1: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineHeight: '1.21',
      },
      label: <strong>1</strong>,
    },
    5: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineHeight: '1.21',
      },
      label: <strong>5</strong>,
    },

    10: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineHeight: '1.21',
      },
      label: <strong>10</strong>,
    },
  }

  const searchByLevel = (level) => {
    window.scrollTo(400, 250)
    setSelectedLevel(level.target.value)
  }
  const searchByAge = (ages) => {
    window.scrollTo(400, 250)
    setSelectedAges(ages)
  }

  const options = [
    { label: 'Enfants', value: 'kids' },
    { label: 'Juniors', value: 'junior' },
    { label: 'Séniors', value: 'senior' },
    { label: 'Adultes', value: 'adult' },
  ]

  return (
    <div className="coach_type">
      <div className="coach_type__title">FILTRER PAR</div>
      <div className="coach_type__rate">
        <div className="coach_type__rate__plus__privatesessionfilter__filterby_personnumber isporit-no-padding">
          Disponibilités
        </div>
        <input
          // onFocus={(e) => {
          //   e.target.type = 'datetime-local'
          // }}
          // onBlur={(e) => {
          //   if (!e.target.value) {
          //     e.target.type = 'text'
          //   } else {
          //     e.target.type = 'datetime-local'
          //   }
          // }}
          type="datetime-local"
          value={selectedDate}
          step="3600"
          onChange={(e) => {
            window.scrollTo(400, 250)
            setSelectedDate(
              e.target.value.slice(0, e.target.value.length - 3) + ':00',
            )
          }}
          style={{
            width: '100%',
            maxWidth: 211,
            marginTop: '1.438rem',
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
          }}
          placeholder="Quelle date?"
        />
        <div className="coach_type__rate__plus__privatesessionfilter__filterby_personnumber">
          Niveaux
        </div>
        <br />
        <Radio.Group value={String(selectedLevel)}>
          <Radio onClick={searchByLevel} className="radio" value="">
            <span className="coach_type__rate__plus">Tous</span>
          </Radio>
          <br />
          <Radio onClick={searchByLevel} className="radio" value="beginner">
            <span className="coach_type__rate__plus">Débutant</span> <br />
          </Radio>
          <Radio onClick={searchByLevel} className="radio" value="intermediate">
            <span className="coach_type__rate__plus">Intermédiaire</span>
          </Radio>
          <br />
          <Radio onClick={searchByLevel} className="radio" value="confirmed">
            <span className="coach_type__rate__plus">Confirmé</span>
          </Radio>
          <br />
        </Radio.Group>
        {/* <div className="coach_type__rate__plus__privatesessionfilter__filterby_personnumber">
          Nombre de personnes <br />
          <Slider
            class="coach_type__rate__plus__privatesessionfilter__filterby__marks"
            onChange={onChange}
            marks={marks}
            max={10}
            min={1}
          />
          <br />
        </div> */}
        <div className="coach_type__rate__plus__privatesessionfilter__filterby_personnumber">
          Ages
        </div>
        <br />
        <Checkbox.Group
          className="checkbox"
          options={options}
          value={selectedAges}
          onChange={searchByAge}
        />
      </div>
    </div>
  )
}
