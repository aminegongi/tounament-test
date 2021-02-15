import React, { useState } from 'react'
import css from './coachType.scss'
import { Radio, Slider, Checkbox } from 'antd';
import { PRIVATECOACH, PRIVATESESSION } from '../../constants'

export default function CoachType({ setDataCopy, dataCopy, coachesList }) {
  const marks = {
    1: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineheight: '1.21',
      },
      label: <strong>1</strong>,
    },
    5: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineheight: '1.21',
      },
      label: <strong>5</strong>,
    },


    10: {
      style: {
        color: '#000000',
        fontsize: '14px',
        lineheight: '1.21',
      },
      label: <strong>10</strong>,
    },
  };
  const [value, setValue] = useState()
  const [level, setLevel] = useState()
  const [selectedRate, setSelectedRate] = useState("-1")

  const searchbylevel = level => {
    window.scrollTo(400, 350);
    if (level.target.value == selectedRate) {
      setSelectedRate("")
      setDataCopy(dataCopy)

    }
    else {
      setSelectedRate(level.target.value)
      setLevel(level.target.value)
      setDataCopy(dataCopy.filter(coach => coach.coachData.privateCourseData.level.includes(level.target.value)))
    }
  }
  const searchbybyAge = age => {
    // window.scrollTo(400, 350);
    // setDataCopy(coachesList.filter(coach => coach.coachData.privateCourseData.ages.includes(age)))
    {
      age.length != 0 ?
        setDataCopy(dataCopy.filter(coach => coach.coachData.privateCourseData.ages.find(el => age.includes(el))))
        : setDataCopy(dataCopy)
    }

  }
  const onChange = personNumber => {

    setDataCopy(dataCopy.filter(coach => coach.coachData.privateCourseData.personsNumberPerSession >= personNumber))

  }

  const options = [
    { label: 'Enfants', value: 'kids' },
    { label: 'Junior', value: 'Junior' },
    { label: 'senior', value: 'senior' },
    { label: 'Adult', value: 'Adult' },

  ];


  return (
    <div className={css.coach_type}>
      <div className={css.coach_type__title}>
        FILTRE PAR
      </div>
      <div className={css.coach_type__rate}>

        <Radio.Group value={String(selectedRate)}>
          <Radio onClick={searchbylevel} className={css.radio} value={"beginner"} />
          <span className={css.coach_type__rate__plus}>Débutant
                </span> <br />
          <Radio onClick={searchbylevel} className={css.radio} value={"intermediate"} />
          <span className={css.coach_type__rate__plus}>Intermédiaire
                </span> <br />

          <Radio onClick={searchbylevel} className={css.radio} value={'confirmed'} />
          <span className={css.coach_type__rate__plus}>Confirmé
                  </span> <br />
        </Radio.Group>
        <div className={css.coach_type__rate__plus__privatesessionfilter__filterby_personnumber}>
          Nombre de personnes <br />
          <Slider
            class={css.coach_type__rate__plus__privatesessionfilter__filterby__marks}
            onChange={onChange}
            marks={marks} max={10} min={1} />
          <br />

        </div>

        <Checkbox.Group className={css.checkbox} options={options} onChange={searchbybyAge} />
      </div>
    </div>
  )
}
