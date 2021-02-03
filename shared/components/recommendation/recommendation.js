import React from 'react'
import { Rate, Radio } from 'antd';
import css from './recommendation.scss'

export default function recommendation({ coachesList, dataCopy, setdataCopy }) {

  const onChange = e => {
    
    if (e.target.value === 4) {
      const x = (coachesList.filter(e => (Math.round((e.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / e.coachData.reviews.length))) >= 4))
      return setdataCopy(x)
    }
    if (e.target.value === 3) {
      const x = (coachesList.filter(e => (Math.round((e.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / e.coachData.reviews.length))) >= 3))

      return setdataCopy(x)
    }
    if (e.target.value === 2) {
      const x = (coachesList.filter(e => (Math.round((e.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / e.coachData.reviews.length))) >= 2))

      return setdataCopy(x)
    }
    if (e.target.value === 1) {
      const x = (coachesList.filter(e => (Math.round((e.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / e.coachData.reviews.length))) >= 1))

      return setdataCopy(x)
    }
  };
  return (
    <div className={css.recommandation}>
      <div className={css.recommendation__title} >RECOMMANDATIONS
        </div>
      <div className={css.recommendation__rate}>
        <Radio.Group onChange={onChange} >
          <Radio value={4} className={css.radio}></Radio>
          <Rate disabled defaultValue={4} className={css.rate} /> 
          <span className={css.recommendation__rate__plus}>et plus</span> <br />

          <Radio value={3}></Radio>
          <Rate disabled defaultValue={3} className={css.rate} />
           <span className={css.recommendation__rate__plus}>et plus</span> <br />
          <Radio value={2}></Radio><Rate disabled defaultValue={2} className={css.rate} /> <span className={css.recommendation__rate__plus}>et plus</span> <br />
          <Radio value={1}></Radio><Rate disabled defaultValue={1} className={css.rate} /> <span className={css.recommendation__rate__plus}>et plus</span> <br />

        </Radio.Group>
      </div>
    </div>
  )
}
