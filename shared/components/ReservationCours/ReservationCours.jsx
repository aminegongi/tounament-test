import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import './reservationCours.scss'
import { Button, message } from 'antd'
import IsporitModal from '../IsporitModal/IsporitModal'
import routes from '../../../utils/routes'
import { createRecruitmentRequest } from '../../services/coachDetails.service'
import { CLUB, REQUEST_FAILED, REQUEST_SUCCEEDED } from '../../constants'
import AuthContext from '../../../utils/context.utils'

const ReservationCours = ({
  isModalVisibleReservation,
  setIsModalVisibleReservation,
  coachProfile,
}) => {
  const [isContactStep, setIsContactStep] = useState(false)
  const [recruitmentEmail, setRecruitmentEmail] = useState('')
  const [
    sendRecruitmentRequestLoading,
    setSendRecruitmentRequestLoading,
  ] = useState(false)
  const [coachingRequestApi, setCoachingRequestApi] = useState()
  const router = useRouter()
  const authContext = useContext(AuthContext)

  const handleCancel = () => {
    setIsModalVisibleReservation(false)
    setIsContactStep(false)
  }
  const onSendRecruitmentRequest = () => {
    const onSend = async () => {
      const result = await createRecruitmentRequest(
        {
          coachId: coachProfile._id,
          emailBody: recruitmentEmail,
        },
        setSendRecruitmentRequestLoading,
      )
      if (result.type === REQUEST_FAILED) {
        if (result.data.message === 'youAreNotAClub') {
          return message.error(
            "Cette fonctionnalité n'est disponible que pour les organisations et les clubs",
          )
        }
        return message.error(
          "Ahhh! quelque chose s'est mal passé, réessayez plus tard. Merci",
        )
      }
      if (result.type === REQUEST_SUCCEEDED) {
        setCoachingRequestApi(REQUEST_SUCCEEDED)
        return setIsContactStep(false)
      }
    }
    if (!authContext.isLoggedIn) {
      handleCancel()

      return authContext.toggleLogInModal(() => () => onSend())
    }
    return onSend()
  }

  useEffect(() => {
    if (coachingRequestApi === REQUEST_SUCCEEDED) {
      setIsModalVisibleReservation(false)
      setRecruitmentEmail('')
      setSendRecruitmentRequestLoading()
    }
  }, [coachingRequestApi])

  const renderBody = () => {
    if (isContactStep) {
      return (
        <div className="reservation__contact">
          <div className="reservation__contact__title">
            Récruter l'entraineur
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSendRecruitmentRequest()
            }}
          >
            <div className="reservation__contact__textarea">
              <textarea
                value={recruitmentEmail}
                name=""
                id=""
                cols="30"
                rows="4"
                onChange={(e) => setRecruitmentEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="isporit-unset-button-css">
              <Button
                loading={sendRecruitmentRequestLoading}
                type="submit"
                className="isporit-primary-button reservation__contact__send-button"
              >
                Envoyer
              </Button>
            </button>
          </form>
        </div>
      )
    }
    return (
      <div className="reservation__block">
        {/* {authContext.userType !== CLUB &&
          coachProfile.coachData &&
          coachProfile.coachData.privateCourseData &&
          coachProfile.coachData.privateCourseData.givePrivateCourse && (
           
          )} */}
        <>
          <div className="reservation__title">Réserver vos cours</div>

          <button
            onClick={() =>
              router.push(
                routes.COACH_DETAILS.CALENDAR.linkTo(coachProfile.username),
              )
            }
            type="submit"
            className="reservation__button-availabilities"
          >
            Disponibilités
          </button>
        </>
        {coachProfile.coachData && coachProfile.coachData.lookingForJob && (
          <>
            <div className="reservation__title">Récruter l'entraineur</div>
            <button
              onClick={() => setIsContactStep(true)}
              type="submit"
              className="reservation__button_contact"
            >
              Prise de contact
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div>
      <IsporitModal
        className="reservation"
        visible={isModalVisibleReservation}
        onCancel={handleCancel}
      >
        {renderBody()}
      </IsporitModal>
    </div>
  )
}
export default ReservationCours
