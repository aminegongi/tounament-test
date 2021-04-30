import React, { useState } from 'react'
import './BookingBox.scss'
import moneyIcon from '../../../public/icon/money.png'
import { CALENDAR_TAB } from './../../../pages/coaches/[username]'
import CoachProfileSection from '../CoachProfileSection'
import { useMediaPredicate } from 'react-media-hook'
import { Select } from 'antd'

export default function BookingBox({
  sessionPrices,
  isporitPriceFirstSession,
  setTab,
  isVerticalLine,
}) {
  const isMobile = useMediaPredicate('(max-width: 768px)')
  const [selectedOffer, setSelectedOffer] = useState(sessionPrices[0])
  const getPrices = (offer) => ({
    onsite: {
      value: `${offer.onSiteSessionsNumber}
        séance${offer.onSiteSessionsNumber > 1 ? 's' : ''} sur place`,
    },
    online: {
      value: `${offer.onlineSessionsNumber}
      séance${offer.onlineSessionsNumber > 1 ? 's' : ''} en ligne`,
    },
    mixed: {
      value: `${offer.onSiteSessionsNumber + offer.onlineSessionsNumber}
      séances (${offer.onlineSessionsNumber} en ligne)`,
    },
  })
  return (
    <CoachProfileSection
      title="Réservations"
      isVerticalLine={isVerticalLine}
      icon={moneyIcon}
    >
      <div className="booking-box">
        <div className="booking-box__content">
          <div className="booking-box__content__title">
            {' '}
            Choisissez votre pack
          </div>
          <div>
            <Select
              className="booking-box__content__list"
              defaultValue={selectedOffer._id}
              onChange={(offerId) =>
                setSelectedOffer(
                  sessionPrices.find((offer) => offer._id === offerId),
                )
              }
            >
              {sessionPrices
                .slice()
                .sort((a, b) => a.price - b.price)
                .map((offer, index) => {
                  return (
                    <Select.Option value={offer._id}>
                      {getPrices(offer)[offer.type].value}
                    </Select.Option>
                  )
                })}
            </Select>
          </div>
        </div>
        <div className="booking-box__content__price">
          <div>{selectedOffer && selectedOffer.price + ' DT'}</div>
        </div>
        <div>
          {isporitPriceFirstSession !== undefined &&
            isporitPriceFirstSession !== -1 && (
              <>
                <h3>
                  <span>OU</span>
                </h3>

                <div className="booking-box__content__first-session">
                  <div>Essayez votre 1ère séance <br/> (prix iSporit) </div>
                  <div className="booking-box__content__first-session__price">
                    {isporitPriceFirstSession === 0
                      ? 'GRATUITE'
                      : isporitPriceFirstSession + ' DT'}
                  </div>
                </div>
              </>
            )}
        </div>
        <div className="isporit-flex-h-center-v-center">
          <button
            onClick={() => {
              window.scrollTo(400, !isMobile ? 250 : 650)

              setTab(CALENDAR_TAB)
            }}
            type="button"
            className="isporit-primary-button"
            style={{
              padding: '13px 36px',
              // marginTop: '16px',
              // backgroundColor:"#ff8760 !important",
              width: !isMobile ? 'fit-content' : '100%',
            }}
          >
            Réserver des séances
          </button>
        </div>
      </div>
    </CoachProfileSection>
  )
}
