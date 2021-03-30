import { Icon } from 'antd'
import React, { useState } from 'react'
import ReactYoutubePlayer from 'react-player/youtube'
import ReactFacebookPlayer from 'react-player/facebook'
import { getYouTubeVideoId } from '../../../utils/string.utils'

import './style.scss'

const YoutubeVideoCard = ({ src, ...restProps }) => {
  const [isVideoActive, setIsVideoActive] = useState(false)
  if (!isVideoActive && !src.includes('facebook.com')) {
    return (
      <button
        type="button"
        onClick={() => setIsVideoActive(true)}
        style={{
          backgroundImage:
            !src.includes('facebook.com') &&
            `url(http://img.youtube.com/vi/${getYouTubeVideoId(src)}/0.jpg)`,
          width: restProps.width,
          height: restProps.height,
        }}
        className="youtube-video-card"
      >
        <div className="youtube-video-card__play-icon">
          <Icon
            type="caret-right"
            className="youtube-video-card__play-icon__icon"
          />
        </div>
      </button>
    )
  }
  return (
    <div className="">
      {src.includes('facebook.com') ? (
        <ReactFacebookPlayer url={src} width="100%" height="100%" />
      ) : (
        <ReactYoutubePlayer url={src} width="100%" height="250px" />
      )}
    </div>
  )
}

export default YoutubeVideoCard
