import React from 'react'
import notFoundImage from '../../../public/not-found-image.svg'
import './style.scss'
const Error = ({ statusCode, description, buttonText, redirectUrl }) => {
  if (statusCode === 404) {
    return (
      <div className="error-page">
        <div className="error-page__not-found isporit-flex-h-center-v-center">
          <img src={notFoundImage} alt="" srcSet="" />
          <div className="error-page__description">{description}</div>.
        </div>
      </div>
    )
  }
  return ''
}

export default Error
