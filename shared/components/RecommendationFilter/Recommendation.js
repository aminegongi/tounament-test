import React, { useState } from 'react'
import { Rate, Radio } from 'antd';
import css from './recommendation.scss'

export default function Recommendation({ coachesList, dataCopy, setDataCopy }) {
  const [selectedRate, setSelectedRate] = useState(-1)
  const onChange = e => {
    // setDataCopy((coachesList.filter(coach => 
    //   (Math.round((coach.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coach.coachData.reviews.length))) >= e.target.value)))

  };
  const handleClick = (e) => {
    if (e.target.value === selectedRate) {
      setSelectedRate("")
      setDataCopy(dataCopy)
      window.scrollTo(400, 350);

    }
    else {
      window.scrollTo(400, 350);
      setSelectedRate(e.target.value)
      setDataCopy((dataCopy.filter(coach =>
        (Math.round((coach.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coach.coachData.reviews.length))) >= e.target.value)))
    }
  }
  return (
    <div className={css.recommandation}>
      <div className={css.recommendation__title} >RECOMMANDATIONS
        </div>
      <div className={css.recommendation__rate}>
        <Radio.Group value={Number(selectedRate)} >
          <Radio value={4} className={css.radio} onClick={handleClick}></Radio>
          <Rate disabled defaultValue={4} className={css.rate} />
          <span className={css.recommendation__rate__plus}>et plus</span> <br />
          <Radio value={3} onClick={handleClick}></Radio>
          <Rate disabled defaultValue={3} className={css.rate} />
          <span className={css.recommendation__rate__plus}>et plus</span> <br />
          <Radio value={2} onClick={handleClick}></Radio><Rate disabled defaultValue={2} className={css.rate} />
          <span className={css.recommendation__rate__plus}>et plus</span> <br />
          <Radio value={1} onClick={handleClick}></Radio><Rate disabled defaultValue={1} className={css.rate} />
          <span className={css.recommendation__rate__plus}>et plus</span> <br />
        </Radio.Group>
      </div>
    </div>
  )
}
