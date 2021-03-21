import { Icon } from 'antd'
import React, { useState } from 'react'
import { getYouTubeVideoId } from '../../../utils/string.utils'
import './style.scss'

const YoutubeVideoCard = ({ src, ...restProps }) => {
  const [isVideoActive, setIsVideoActive] = useState(false)
  if (!isVideoActive) {
    return (
      <button
        type="button"
        onClick={() => setIsVideoActive(true)}
        style={{
          backgroundImage: `url(http://img.youtube.com/vi/${getYouTubeVideoId(
            src,
          )}/0.jpg)`,
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
    <iframe
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={restProps.title}
      src={src}
      {...restProps}
    />
  )
}

export default YoutubeVideoCard
