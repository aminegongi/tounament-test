import React from 'react'
// import CoachMap from '../CoachMap/CoachMap'
import './coachBox.scss'
import moment from 'moment'

import dataMap from '../../../pages/dataMap.json'
import localisationicon from '../../../public/icon/localisationicon.png'
import videoicon from '../../../public/icon/videoicon.png'
import exclamation from '../../../public/icon/exclamation.png'
import video from '../../../public/icon/video.png'
import photoicon from '../../../public/icon/photoicon.png'

export default function CoachBox({ coachData, children, iconExclamation }) {
  return (
    <div className="coachBoxiteam">
      <div className="coachBoxiteam__info">
        <img
          className="coachBoxiteam__info__icon"
          src={iconExclamation}
          alt="icon"
        />
        <div className="coachBoxiteam__info__title">Informations</div>
        <div className="lineinformation" />
        {children}
      </div>
      <div className="coachBoxiteam__lieu">
        <div className="coachBoxiteam__lieu__linevertical" />

        <img
          className="coachBoxiteam__lieu__icon"
          src={localisationicon}
          alt="localisationicon"
        />
        <div className="coachBoxiteam__lieu__title">Lieux</div>
        <div className="lineinformation" />
        {coachData &&
          coachData.coachData &&
          coachData.coachData.privateCourseData &&
          coachData.coachData.privateCourseData.regions.map((region) => {
            return (
              <iframe className="coachBoxiteam__map" src={dataMap[region]} />
            )
          })}

        <div className="coachBoxiteam__lieu_map">
          {coachData &&
            coachData.coachData &&
            coachData.coachData.privateCourseData &&
            coachData.coachData.privateCourseData.location.map((location) => (
              <div className="coachBoxiteam__lieu_map__mapicon">
                <img src={localisationicon} alt="icon" />

                <div className="coachBoxiteam__lieu_map__mapicon__lieu">
                  {location.title}
                </div>
              </div>
            ))}
        </div>
      </div>
      {coachData &&
      coachData.coachData &&
      coachData.coachData.youtubeVideosLinks.length != 0 ? (
        <div className="coachBoxiteam__video">
          <div className="coachBoxiteam__video__linevertical" />
          <img
            className="coachBoxiteam__video__icon"
            src={videoicon.png}
            alt="videoicon"
          />
          <div className="coachBoxiteam__video__title">Vidéo</div>
          <div className="lineinformation" />
          {coachData &&
            coachData.coachData &&
            coachData.coachData.youtubeVideosLinks &&
            coachData.coachData.youtubeVideosLinks.slice(0, 1).map((video) => {
              return (
                <div className="coachBoxiteam__video__firstvideo">
                  <iframe
                    className="coachBoxiteam__video__videocoach"
                    src={video.link}
                  />
                  <div className="coachBoxiteam__video__titlevideo">
                    {video.title.slice(0.2)}
                  </div>
                  <div className="coachBoxiteam__video__date">
                    {moment(video.videoDate).format('LL')}
                  </div>
                </div>
              )
            })}
          <div className="coachBoxiteam__video__othervideo">
            {coachData &&
              coachData.coachData &&
              coachData.coachData.youtubeVideosLinks &&
              coachData.coachData.youtubeVideosLinks.slice(1).map((video) => {
                return (
                  <div>
                    <iframe
                      className="coachBoxiteam__video__videocoachother"
                      src={video.link}
                    />
                    <div className="coachBoxiteam__video__titlevideo">
                      {video.title.slice(0.2)}
                    </div>
                    <div className="coachBoxiteam__video__date">
                      {moment(video.videoDate).format('LL')}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <div className="coachBoxiteam__video__noVideo">
          <img src={video} alt="video" />
          <span>Aucun Vidéo publie</span>
        </div>
      )}
      {coachData &&
      coachData.coachData &&
      coachData.coachData.coachingPhotos.length != 0 ? (
        <div className="coachBoxiteam__photo">
          <div className="coachBoxiteam__photo__linevertical" />
          <img
            className="coachBoxiteam__photo__icon"
            src={exclamation}
            alt="exclamation"
          />
          <div className="coachBoxiteam__photo__title">Photos</div>
          <div className="lineinformation" />

          <div className="coachBoxiteam__photo__imagework">
            {coachData &&
              coachData.coachData &&
              coachData.coachData.coachingPhotos &&
              coachData.coachData.coachingPhotos.slice(0, 1).map((photo) => {
                return (
                  <div className="coachBoxiteam__photo__photocoachprincipal">
                    <img
                      src={`https://dev.isporit.com/api${photo}`}
                      alt="img"
                    />
                  </div>
                )
              })}
            <div className="coachBoxiteam__photo__photocoachother">
              {coachData &&
                coachData.coachData &&
                coachData.coachData.coachingPhotos &&
                coachData.coachData.coachingPhotos.slice(1).map((photo) => {
                  return (
                    <>
                      <img src={`https://dev.isporit.com/api${photo}`} alt="" />
                    </>
                  )
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="coachBoxiteam__photo__noPhoto">
          <img src={photoicon} alt="photo" />
          <span>Aucun photo publie</span>
        </div>
      )}
    </div>
  )
}
