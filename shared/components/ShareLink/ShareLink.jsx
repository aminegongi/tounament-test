import React, { useState } from 'react'
import './shareLink.scss'
import { Input, Select, Icon } from 'antd'

export default function ShareLink({ coachProfile }) {
  const [link, setLink] = useState(coachProfile.username)
  const { Option } = Select
  const myFunction = () => {
    const copyText = document.getElementById('myInput')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy')
    console.log(`Copied the text: ${copyText.value}`)
  }
  return (
    <div className="sharelink">
      <div className="sharelink__text">Partager via</div>

      <img
        src="../../../public/icon/link.svg"
        alt=""
        className="iconsharelink"
      />

      <div style={{ marginBottom: 16 }}>
        <Input
          addonAfter={
            <Icon onClick={myFunction} type="link" className="sharelinkicon" />
          }
          value={`http://dev.isporit.com/coach-details/${link}`}
          defaultValue="mysite"
          className="sharelink__input"
          id="myInput"
        />
      </div>
    </div>
  )
}
