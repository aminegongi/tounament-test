import { isEmpty } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Button, message as messageAlert } from 'antd'
import { AuthContext } from '../../../utils/context.utils'
import { getPrices } from '../../../utils/string.utils'
import { REQUEST_FAILED, REQUEST_SUCCEEDED } from '../../constants'
import { createRecruitmentRequest } from '../../services/coachDetails.service'
import './style.scss'

const CoachProfileContactTab = ({ onSuccess, coach, pricePackage }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [selectedPackage, setSelectedPackage] = useState()
  useEffect(() => {
    if (pricePackage) {
      const prices = getPrices(pricePackage)
      setSelectedPackage(
        `${prices[pricePackage.type].value} (${pricePackage.price} DT)`,
      )
    }
  }, [pricePackage])

  const getNote = () => {
    if (isEmpty(message)) return selectedPackage
    if (selectedPackage) return `${selectedPackage}*-+*+-?***${message}`
    return message
  }
  const authContext = useContext(AuthContext)

  const onSendMessage = async () => {
    const onSend = async () => {
      const result = await createRecruitmentRequest(
        {
          coachId: coach._id,
          emailBody: getNote(),
        },
        setLoading,
      )
      if (result.type === REQUEST_FAILED) {
        if (result.data.message === 'youAreNotAClub') {
          return messageAlert.error(
            "Cette fonctionnalité n'est disponible que pour les organisations et les clubs",
          )
        }
        return messageAlert.error(
          "Ahhh! quelque chose s'est mal passé, réessayez plus tard. Merci",
        )
      }
      if (result.type === REQUEST_SUCCEEDED) {
        return onSuccess()
      }
    }
    if (!authContext.isLoggedIn) {
      return authContext.toggleLogInModal(() => () => onSend())
    }
    return onSend()
  }

  return (
    <div className="coach-profile-contact-tab">
      <div className="coach-profile-contact-tab__input-label">Message</div>
      <div className="coach-profile-contact-tab__input">
        <textarea
          className="isporit-input"
          rows={5}
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="coach-profile-contact-tab__send-btn">
        <Button
          onClick={onSendMessage}
          type="button"
          loading={loading}
          className="isporit-primary-button"
        >
          Envoyer
        </Button>
      </div>
    </div>
  )
}

export default CoachProfileContactTab
