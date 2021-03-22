import React, { useRef } from 'react'
import './shareLink.scss'
import { Input, Icon } from 'antd'

export default function ShareLink({ coachProfile }) {
  const inputRef = useRef(null)
  const onCopy = () => {
    inputRef.current.select()
    document.execCommand('copy')
  }
  return (
    <div className="sharelink">
      <div className="sharelink__text">Partager via</div>

      <div style={{ marginBottom: 16 }}>
        <Input
          addonAfter={
            <Icon onClick={onCopy} type="link" className="sharelinkicon" />
          }
          ref={inputRef}
          value={`http://www.isporit.com/coach-details/${coachProfile.username}`}
          defaultValue="mysite"
          className="sharelink__input"
        />
      </div>
    </div>
  )
}
