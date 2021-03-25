/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { Rate, Radio } from 'antd'
import './recommendation.scss'

export default function Recommendation({ coachesList, dataCopy, setDataCopy }) {
  const [selectedRate, setSelectedRate] = useState(-1)
  const onChange = (e) => {
    // setDataCopy((coachesList.filter(coach =>
    //   (Math.round((coach.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coach.coachData.reviews.length))) >= e.target.value)))
  }
  const handleClick = (e) => {
    if (e.target.value === selectedRate) {
      setSelectedRate('')
      setDataCopy(dataCopy)
      // window.scrollTo(400, 350);
    } else {
      // window.scrollTo(400, 350);
      setSelectedRate(e.target.value)
      setDataCopy(
        dataCopy.filter(
          (coach) =>
            Math.round(
              coach.coachData.reviews.reduce((a, v) => (a += v.rating), 0) /
                coach.coachData.reviews.length,
            ) >= e.target.value,
        ),
      )
    }
  }
  return (
    <div className="recommendation">
      <div className="recommendation__title">RECOMMANDATIONS</div>
      <div className="recommendation__rate">
        <Radio.Group value={Number(selectedRate)}>
          <div>
            <Radio value={4} className="radio" onClick={handleClick} />
            <Rate disabled defaultValue={4} className="rate" />
            <span className="recommendation__rate__plus">et plus</span>
          </div>
          <div>
            <Radio value={3} className="radio" onClick={handleClick} />
            <Rate disabled defaultValue={3} className="rate" />
            <span className="recommendation__rate__plus">et plus</span>
          </div>
          <div>
            <Radio value={2} className="radio" onClick={handleClick} />
            <Rate disabled defaultValue={2} className="rate" />
            <span className="recommendation__rate__plus">et plus</span>
          </div>
          <div>
            <Radio value={1} className="radio" onClick={handleClick} />
            <Rate disabled defaultValue={1} className="rate" />
            <span className="recommendation__rate__plus">et plus</span>
          </div>
        </Radio.Group>
      </div>
    </div>
  )
}
