/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { Rate, Radio } from 'antd'
import './recommendation.scss'

export default function Recommendation({
  selectedReviewsRate,
  setSelectedReviewsRate,
}) {
 
  const handleClick = (e) => {
    // window.scrollTo(400, 350);
    console.log('e.target.value: ', e.target.value);
    setSelectedReviewsRate(e.target.value)
  }
  return (
    <div className="recommendation">
      <div className="recommendation__title">RECOMMANDATIONS</div>
      <div className="recommendation__rate">
        <Radio.Group value={Number(selectedReviewsRate)}>
          {[5, 4, 3, 2, 1, 0].map((value) => {
            return (
              <div>
                <Radio value={value} className="radio" onClick={handleClick} />
                <Rate disabled defaultValue={value} className="rate" />
                <span className="recommendation__rate__plus">et plus</span>
              </div>
            )
          })}          
        </Radio.Group>
      </div>
    </div>
  )
}
