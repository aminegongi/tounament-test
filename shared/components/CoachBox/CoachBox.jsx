/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
// import CoachMap from '../CoachMap/CoachMap'
import PropTypes from 'prop-types'
import './coachBox.scss'
import moment from 'moment'
import { Modal } from 'antd'

import { useMediaPredicate } from 'react-media-hook'
import { isEmpty } from 'lodash'
import dataMap from '../../../pages/dataMap.json'
import localisationicon from '../../../public/icon/locationSectionIcon.svg'
import videoicon from '../../../public/icon/videoicon.png'
import exclamationIcon from '../../../public/icon/exclamation.png'
import picturesIcon from '../../../public/icon/photoSectionIcon.png'

import video from '../../../public/icon/video.png'
import photoicon from '../../../public/icon/photoicon.png'
import CoachProfileSection from '../CoachProfileSection'
import { API } from '../../constants'
import YoutubeVideoCard from '../YoutubeVideoCard/YoutubeVideoCard'

export default function CoachAboutBoxes({ coachData }) {
  const isMobile = useMediaPredicate('(max-width: 768px)')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const isLocationEmpty = () => {
    if (
      coachData &&
      coachData &&
      coachData.privateCourseData &&
      isEmpty(coachData.privateCourseData.regions) &&
      isEmpty(coachData.privateCourseData.location)
    ) {
      return true
    }
    return false
  }

  return (
    <div className="coachBoxiteam">
      <div className="coachBoxiteam__column">
        <CoachProfileSection title="Informations" icon={exclamationIcon}>
          <div className="coachBox">
            {coachData.experiencesYearsNumber ? (
              <div className="coachBox__content">
                <div className="coachBox__content__title">
                  Années d'expérience:{' '}
                  <span className="coachBox__content__value">
                    {coachData && coachData.experiencesYearsNumber}
                  </span>
                </div>
              </div>
            ) : (
              ''
            )}

            {coachData.playerData &&
              coachData.playerData.experiencesYearsNumber && (
                <div className="coachBox__content">
                  <div className="coachBox__content__title">
                    Années à jouer:{' '}
                    <span className="coachBox__content__value">
                      {coachData.playerData.experiencesYearsNumber}
                    </span>
                  </div>
                </div>
              )}

            {coachData &&
              coachData.privateCourseData &&
              coachData.privateCourseData.personsNumberPerSession && (
                <div className="coachBox__content">
                  <div className="coachBox__content__title">
                    Nombre de personnes par séances:
                    <span className="coachBox__content__value">
                      {coachData.privateCourseData.personsNumberPerSession}
                    </span>
                  </div>
                </div>
              )}
            {coachData &&
              coachData.privateCourseData &&
              !isEmpty(coachData.privateCourseData.level) && (
                <div className="coachBox__content">
                  <span className="coachBox__content__title">
                    Niveaux:{' '}
                    <span className="coachBox__content__value">
                      {coachData.privateCourseData.level.join(', ')}
                    </span>
                  </span>
                </div>
              )}
            {coachData &&
              coachData.privateCourseData &&
              !isEmpty(coachData.privateCourseData.ages) && (
                <div className="coachBox__content">
                  <div className="coachBox__content__title ">
                    Catégories d'ages:{' '}
                    <span className="coachBox__content__value">
                      {coachData.privateCourseData.ages.join(', ')}
                    </span>
                  </div>
                </div>
              )}
          </div>
        </CoachProfileSection>

        {coachData && coachData && coachData.youtubeVideosLinks.length !== 0 ? (
          <CoachProfileSection title="Videos" isVerticalLine icon={videoicon}>
            <div className="coachBoxiteam__video-section">
              {coachData &&
                coachData &&
                coachData.youtubeVideosLinks &&
                coachData.youtubeVideosLinks.slice(0, 1).map((v) => {
                  return (
                    <div className="coachBoxiteam__video-section__first-video">
                      <YoutubeVideoCard
                        title="caoch-video"
                        width="100%"
                        className="coachBoxiteam__video-section__first-video__video"
                        src={v.link}
                        height="250px"
                      />
                      <div className="coachBoxiteam__video-section__first-video__title">
                        {v.title}
                      </div>
                      <div className="coachBoxiteam__video-section__first-video__date">
                        {moment(v.videoDate).format('LL')}
                      </div>
                    </div>
                  )
                })}
              <div className="coachBoxiteam__video-section__other-videos">
                {coachData &&
                  coachData &&
                  coachData.youtubeVideosLinks &&
                  coachData.youtubeVideosLinks.slice(1).map((v) => {
                    return (
                      <div>
                        <YoutubeVideoCard
                          title={v.title}
                          width="100%"
                          className="coachBoxiteam__video-section__other-videos__video"
                          src={v.link}
                          height="194px"
                        />
                        <div className="coachBoxiteam__video-section__other-videos__title">
                          {v.title}
                        </div>
                        <div className="coachBoxiteam__video-section__other-videos__date">
                          {moment(v.videoDate).format('LL')}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </CoachProfileSection>
        ) : (
          <div className="coachBoxiteam__video__noVideo">
            <img src={video} alt="video" />
            <span>Aucun Vidéo publie</span>
          </div>
        )}
      </div>

      <div className="coachBoxiteam__column">
        {!isLocationEmpty() && (
          <CoachProfileSection
            title="Lieux"
            isVerticalLine={isMobile}
            icon={localisationicon}
          >
            {coachData &&
              coachData &&
              coachData.privateCourseData &&
              coachData.privateCourseData.regions.map((region) => {
                if (dataMap[region]) {
                  return (
                    <iframe
                      className="coachBoxiteam__location-map"
                      src={dataMap[region]}
                      title="coah-region"
                    />
                  )
                }
              })}

            <div className="coachBoxiteam__locations-container">
              {coachData &&
                coachData &&
                coachData.privateCourseData &&
                coachData.privateCourseData.location.map((location) => (
                  <div className="coachBoxiteam__locations-container__location">
                    <img src={localisationicon} alt="icon" />

                    <div className="coachBoxiteam__locations-container__location__text">
                      {location.title}
                    </div>
                  </div>
                ))}
            </div>
          </CoachProfileSection>
        )}

        {coachData && coachData && coachData.coachingPhotos.length !== 0 ? (
          <CoachProfileSection
            title="Photos"
            isVerticalLine
            icon={picturesIcon}
          >
            <div className="coachBoxiteam__pictures-section">
              {coachData &&
                coachData &&
                coachData.coachingPhotos &&
                coachData.coachingPhotos.slice(0, 1).map((photo) => {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(API + photo)
                        setPreviewVisible(true)
                      }}
                      style={{
                        backgroundImage: `url(${API}${photo})`,
                      }}
                      className="coachBoxiteam__pictures-section__first-picture"
                    />
                  )
                })}
              <div className="coachBoxiteam__pictures-section__other-pictures">
                {coachData &&
                  coachData &&
                  coachData.coachingPhotos &&
                  coachData.coachingPhotos.slice(1).map((photo) => {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(API + photo)
                          setPreviewVisible(true)
                        }}
                        className="isporit-unset-button-css"
                      >
                        <img src={`${API}${photo}`} alt="" />
                      </button>
                    )
                  })}
              </div>
            </div>
          </CoachProfileSection>
        ) : (
          <div className="coachBoxiteam__photo__noPhoto">
            <img src={photoicon} alt="" />
            <span>Aucun photo publie</span>
          </div>
        )}
      </div>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <center>
          <img alt="example" style={{ maxWidth: '100%' }} src={previewImage} />
        </center>
      </Modal>
    </div>
  )
}

CoachAboutBoxes.propTypes = {
  coachData: PropTypes.objectOf(PropTypes.any).isRequired,
}
