import React from 'react'
import { Rate, Radio } from 'antd';
import css from './recommendation.scss'

export default function Recommendation({ coachesList, dataCopy, setDataCopy }) {

  const onChange = e => {
    
      return setDataCopy((coachesList.filter(coach => 
        (Math.round((coach.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coach.coachData.reviews.length))) >= e.target.value)))
    
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
