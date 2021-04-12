/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
// import CoachMap from '../CoachMap/CoachMap'
import PropTypes from 'prop-types'
import './coachBox.scss'
import moment from 'moment'
import { Modal } from 'antd'
import { useMediaPredicate } from 'react-media-hook'
import { isEmpty } from 'lodash'
import { getUserProfilePicture } from '../../../utils/string.utils'
import dataMap from '../../../pages/dataMap.json'
import localisationIcon from '../../../public/icon/locationSectionIcon.svg'
import localisation from '../../../public/icon/localisation.png'
import videoicon from '../../../public/icon/videoicon.png'
import exclamationIcon from '../../../public/icon/exclamation.png'
import picturesIcon from '../../../public/icon/photoSectionIcon.png'

import video from '../../../public/icon/video.png'
import photoicon from '../../../public/icon/photoicon.png'
import CoachProfileSection from '../CoachProfileSection'
import YoutubeVideoCard from '../YoutubeVideoCard/YoutubeVideoCard'
import { ages, levels } from './../../constants'

export default function CoachAboutBoxes({ coachData, specialty }) {
  const isMobile = useMediaPredicate('(max-width: 768px)')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const isThereVideo =
    coachData &&
    coachData &&
    coachData.videosLinks &&
    coachData.videosLinks.length !== 0

  const isTherePhoto =
    coachData &&
    coachData &&
    coachData.coachingPhotos &&
    coachData.coachingPhotos.length !== 0
  const minimumPhotosNumber = 3

  const isThereALotOfPhotos =
    coachData &&
    coachData &&
    coachData.coachingPhotos &&
    coachData.coachingPhotos.length >= minimumPhotosNumber

  

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

  const isInformationEmpty = () => {
    if (
      !coachData.experiencesYearsNumber &&
      !(coachData.playerData && coachData.playerData.experiencesYearsNumber) &&
      !(
        coachData.privateCourseData &&
        coachData.privateCourseData.personsNumberPerSession
      ) &&
      !(
        coachData.privateCourseData &&
        !isEmpty(coachData.privateCourseData.level)
      ) &&
      !(
        coachData.privateCourseData &&
        !isEmpty(coachData.privateCourseData.ages)
      )
    ) {
      return true
    }
    return false
  }
  const isSessionPricesEmpty = () => {
    if (
      coachData &&
      coachData.privateCourseData &&
      coachData.privateCourseData.sessionPrices && 
      coachData.privateCourseData.sessionPrices.length!==0      
    ) {
      return false
    }
    return true
  }
  const renderVideos = () => {
    if (isThereVideo) {
      return (
        <CoachProfileSection
          title="Vidéos"
          isVerticalLine={!isInformationEmpty() || !isSessionPricesEmpty()}
          icon={videoicon}
        >
          <div className="coachBoxiteam__video-section">
            {coachData &&
              coachData &&
              coachData.videosLinks &&
              coachData.videosLinks.slice(0, 1).map((v) => {
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
                coachData.videosLinks &&
                coachData.videosLinks.slice(1).map((v) => {
                  return (
                    <div className="coachBoxiteam__video-section__other-videos__container">
                      <YoutubeVideoCard
                        title={v.title}
                        width="100%"
                        className="coachBoxiteam__video-section__other-videos__video"
                        src={v.link}
                        height="194px"
                      />
                      <div className="">
                        <div className="coachBoxiteam__video-section__other-videos__title">
                          {v.title}
                        </div>
                        <div className="coachBoxiteam__video-section__other-videos__date">
                          {moment(v.videoDate).format('LL')}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </CoachProfileSection>
      )
    }
    if (isThereALotOfPhotos) {
      return (
        <CoachProfileSection
          title="Photos"
          isVerticalLine={!isLocationEmpty()}
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
                      setPreviewImage(getUserProfilePicture(photo))
                      setPreviewVisible(true)
                    }}
                    style={{
                      backgroundImage: `url(${getUserProfilePicture(photo)})`,
                    }}
                    className="coachBoxiteam__pictures-section__first-picture"
                  />
                )
              })}
            <div className="coachBoxiteam__pictures-section__other-pictures">
              {coachData &&
                coachData &&
                coachData.coachingPhotos &&
                coachData.coachingPhotos.slice(1, 3).map((photo) => {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(getUserProfilePicture(photo))
                        setPreviewVisible(true)
                      }}
                      className="isporit-unset-button-css"
                    >
                      <img src={`${getUserProfilePicture(photo)}`} alt="" />
                    </button>
                  )
                })}
            </div>
          </div>
        </CoachProfileSection>
      )
    }
    if (!isTherePhoto && !isMobile) {
      return (
        <div className="coachBoxiteam__video__noVideo">
          <img src={video} alt="video" />
          <span>Aucune Vidéo publiée</span>
        </div>
      )
    }
  }

  return (
    <div className="coachBoxiteam">
      <div className="coachBoxiteam__column">
        {!isInformationEmpty() && (
          <CoachProfileSection
            title="Informations sportives"
            icon={exclamationIcon}
          >
            <div className="coachBox">
              {coachData.experiencesYearsNumber ? (
                <div className="coachBox__content">
                  <div className="coachBox__content__title">
                    Années d'expérience:{' '}
                    <span className="coachBox__content__value">
                      {coachData && coachData.experiencesYearsNumber} ans
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
                      Années en tant que joueur:{' '}
                      <span className="coachBox__content__value">
                        {coachData.playerData.experiencesYearsNumber} ans
                      </span>
                    </div>
                  </div>
                )}

              {/* {coachData.privateCourseData &&
                coachData.privateCourseData.personsNumberPerSession && (
                  <div className="coachBox__content">
                    <div className="coachBox__content__title">
                      Nombre de personnes par séance:
                      <span className="coachBox__content__value">
                        {coachData.privateCourseData.personsNumberPerSession}
                      </span>
                    </div>
                  </div>
                )} */}
              {coachData.privateCourseData &&
                !isEmpty(coachData.privateCourseData.level) && (
                  <div className="coachBox__content">
                    <span className="coachBox__content__title">
                      Niveaux:{' '}
                      <span className="coachBox__content__value">
                        {coachData.privateCourseData.level
                          .map((level) => levels[level].label)
                          .join(', ')}
                      </span>
                    </span>
                  </div>
                )}
              {coachData.privateCourseData &&
                !isEmpty(coachData.privateCourseData.ages) && (
                  <div className="coachBox__content">
                    <div className="coachBox__content__title ">
                      Catégories d'âges:{' '}
                      <span className="coachBox__content__value">
                        {coachData.privateCourseData.ages
                          .map((age) => ages[age].label)
                          .join(', ')}
                      </span>
                    </div>
                  </div>
                )}
              {specialty && !isEmpty(specialty) && (
                <div className="coachBox__content">
                  <div className="coachBox__content__title ">
                    Spécialités:{' '}
                    <span className="coachBox__content__value">
                      {specialty.map((el, index) => {
                        if (index !== specialty.length - 1) {
                          return `${el.translations.fr}, `
                        }
                        return el.translations.fr
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CoachProfileSection>
        )}
        {!isSessionPricesEmpty() && (
          <CoachProfileSection
            title="Packs offerts"
            icon={exclamationIcon}
            isVerticalLine={!isInformationEmpty()}
          >
            <div className="coachBox">
              {coachData.privateCourseData.sessionPrices.map((offer, index) => {
                return (
                  <div className="coachBox__content">
                    <div
                      style={{
                        marginBottom: '10px',
                      }}
                    >
                      Pack {index + 1} :{' '}
                    </div>
                    <span className="coachBox__content__title">
                      {offer.type === 'onsite' && (
                        <span className="coachBox__content__value">
                          {offer.price} DT pour {offer.onSiteSessionsNumber}{' '}
                          séance(s) sur place
                        </span>
                      )}
                      {offer.type === 'online' && (
                        <span className="coachBox__content__value">
                          {offer.price} DT pour {offer.onlineSessionsNumber}{' '}
                          séance(s) en ligne
                        </span>
                      )}
                      {offer.type === 'mixed' && (
                        <span className="coachBox__content__value">
                          {offer.price} DT pour {offer.onSiteSessionsNumber}{' '}
                          séance(s) sur place et {offer.onlineSessionsNumber}{' '}
                          séance(s) en ligne
                        </span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          </CoachProfileSection>
        )}

        {renderVideos()}
      </div>

      <div className="coachBoxiteam__column">
        {!isLocationEmpty() && (
          <CoachProfileSection
            title="Lieux"
            isVerticalLine={isMobile}
            icon={localisationIcon}
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
                      title="coach-region"
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
                    <img src={localisation} alt="icon" />

                    <div className="coachBoxiteam__locations-container__location__text">
                      {location.title}
                    </div>
                  </div>
                ))}
            </div>
          </CoachProfileSection>
        )}

        {isTherePhoto && coachData.coachingPhotos.length > minimumPhotosNumber && (
          <CoachProfileSection
            title={
              isThereALotOfPhotos && !isThereVideo ? 'Autres photos' : 'Photos'
            }
            isVerticalLine={!isLocationEmpty()}
            icon={picturesIcon}
          >
            <div className="coachBoxiteam__pictures-section">
              {coachData &&
                coachData &&
                coachData.coachingPhotos &&
                coachData.coachingPhotos
                  .slice(
                    isThereALotOfPhotos ? minimumPhotosNumber : 0,
                    isThereALotOfPhotos ? minimumPhotosNumber + 1 : 1,
                  )
                  .map((photo) => {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(getUserProfilePicture(photo))
                          setPreviewVisible(true)
                        }}
                        style={{
                          backgroundImage: `url(${getUserProfilePicture(
                            photo,
                          )})`,
                        }}
                        className="coachBoxiteam__pictures-section__first-picture"
                      />
                    )
                  })}
              <div className="coachBoxiteam__pictures-section__other-pictures">
                {coachData &&
                  coachData &&
                  coachData.coachingPhotos &&
                  coachData.coachingPhotos
                    .slice(isThereALotOfPhotos ? 4 : 1)
                    .map((photo) => {
                      return (
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(getUserProfilePicture(photo))
                            setPreviewVisible(true)
                          }}
                          className="isporit-unset-button-css"
                        >
                          <img src={`${getUserProfilePicture(photo)}`} alt="" />
                        </button>
                      )
                    })}
              </div>
            </div>
          </CoachProfileSection>
        )}
        {!isTherePhoto && (
          <div className="coachBoxiteam__photo__noPhoto">
            <img src={photoicon} alt="" />
            <span>Aucune photo publiée</span>
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
  specialty: PropTypes.arrayOf(PropTypes.any),
}

CoachAboutBoxes.defaultProps = {
  specialty: [],
}
