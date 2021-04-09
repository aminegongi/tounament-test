import React from 'react'
import notFoundImage from '../../../public/not-found-image.svg'

const Error = ({ statusCode, description, buttonText, redirectUrl }) => {
  if (statusCode === 404) {
    return (
      <div className="error-page__not-found">
        <img src={notFoundImage} alt="" srcSet="" />
        <div className="error-page__description">{description}</div>.
      </div>
    )
  }
  return ''
}

export default Error
