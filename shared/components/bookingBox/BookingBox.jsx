/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import './BookingBox.scss'
import { useMediaPredicate } from 'react-media-hook'
import { Select } from 'antd'
import { CALENDAR_TAB, CONTACT_TAB } from '../../constants'
import moneyIcon from '../../../public/icon/money.png'
import CoachProfileSection from '../CoachProfileSection'
import { getPrices } from '../../../utils/string.utils'

export default function BookingBox({
  sessionPrices,
  isporitPriceFirstSession,
  setTab,
  isVerticalLine,
  setPricePackage,
}) {
  const isMobile = useMediaPredicate('(max-width: 768px)')
  const [selectedOffer, setSelectedOffer] = useState(
    sessionPrices.slice().sort((a, b) => a.price - b.price)[0],
  )

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
          <div>{selectedOffer && `${selectedOffer.price} DT`}</div>
        </div>
        <div>
          {isporitPriceFirstSession !== undefined &&
            isporitPriceFirstSession !== -1 && (
              <>
                <h3>
                  <span>OU</span>
                </h3>

                <div className="booking-box__content__first-session">
                  <div>
                    Essayez votre 1ère séance <br /> (prix iSporit){' '}
                  </div>
                  <div className="booking-box__content__first-session__price">
                    {isporitPriceFirstSession === 0
                      ? 'GRATUITE'
                      : `${isporitPriceFirstSession} DT`}
                  </div>
                </div>
              </>
            )}
        </div>
        <div className="isporit-flex-h-center-v-center">
          <button
            onClick={() => {
              window.scrollTo(400, !isMobile ? 250 : 650)
              setPricePackage(selectedOffer)
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
        <div className="isporit-flex-h-center-v-center">
          <button
            onClick={() => {
              window.scrollTo(400, !isMobile ? 250 : 90)
              setPricePackage(selectedOffer)
              setTab(CONTACT_TAB)
            }}
            type="button"
            className="isporit-secondary-button"
            style={{
              padding: '13px 36px',
              width: '100%',
            }}
          >
            Envoyer un message
          </button>
        </div>
      </div>
    </CoachProfileSection>
  )
}
