import React from 'react'
import './style.scss'

const CoachProfileSection = ({ children, icon, isVerticalLine, title }) => {
  return (
    <div className="coach-profile-section">
      <div className="coach-profile-section__header">
        <div
          className={`coach-profile-section__header__icon ${
            isVerticalLine
              ? 'coach-profile-section__header__icon__with-line'
              : ''
          }`}
        >
          {isVerticalLine && (
            <div className="coach-profile-section__header__icon__line-vertical" />
          )}
          <div className="coach-profile-section__header__icon__img">
            <img className="" src={icon} alt="icon" />
          </div>
        </div>
        <div className="coach-profile-section__header__title">{title}</div>
      </div>
      <div className="coach-profile-section__children">{children}</div>
    </div>
  )
}

export default CoachProfileSection
