/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { intersection, isEmpty } from 'lodash'
import Head from 'next/head'
import { Breadcrumb, Icon, Affix } from 'antd'
import { useMediaPredicate } from 'react-media-hook'
import Axios from 'axios'
import InfoCoach from '../../shared/components/InfoCoach/InfoCoach'
import '../../shared/css/coachDetails.scss'
import {
  SERVER_SIDE_API_BASE_URL,
  // CLUB,
  FRONT_END_PLATFORM_URL,
  CLIENT_SIDE_API_BASE_URL,
  ABOUT_TAB,
  BIOGRAPHY_TAB,
  CALENDAR_TAB,
  SUCCESS_BOOKING_TAB,
  CONTACT_TAB,
  SUCCESS_CONTACT_TAB,
} from '../../shared/constants'
import CoachBox, {
  isSessionPricesEmpty,
} from '../../shared/components/CoachBox/CoachBox'
// import CoachAvis from '../../shared/components/CoachAvis/CoachAvis'
import Biography from '../../shared/components/Biography/Biography'
import affiche from '../../public/icon/Banniere.png'
import exclamation from '../../public/icon/exclamation.png'
// import { AuthContext } from '../../utils/context.utils'
import Layout from '../../shared/components/layout/Layout'
import {
  cutString,
  getPackagesAndFirstSession,
  getUserProfilePicture,
  nl2br,
} from '../../utils/string.utils'
import CoachCalendar from '../../shared/components/CoachCalendar/CoachCalendar'
import Error from '../../shared/components/PageError'
import routes from '../../utils/routes'
import FacebookPixel from '../../shared/components/FacebookPixel'
import CardProfileCoach from '../../shared/components/CardProfileCoachFilter/CardProfileCoach'
import CoachProfileContactTab from '../../shared/components/CoachProfileContactTab'
import IsporitModal from '../../shared/components/IsporitModal/IsporitModal'

export async function getServerSideProps({ query, req }) {
  const coachRes = await fetch(
    `${SERVER_SIDE_API_BASE_URL(req)}users/coaches/slug/${query.username}`,
  )

  const jsonCoachRes = await coachRes.json()

  return {
    props: {
      coach: jsonCoachRes,
      userNotFound: coachRes.status === 404,
    },
  }
}
export default function CoachDetails({
  coach,
  userNotFound,
  appCoachesList,
  setAppCoachesList,
}) {
  const router = useRouter()
  // const [coachData, setCoachData] = useState()
  const [specialty, setSpecialty] = useState()
  const [job, setJob] = useState()
  const [tab, setTab] = useState(ABOUT_TAB)
  const [pricePackage, setPricePackage] = useState()
  const [similarCoaches, setSimilarCoaches] = useState([])
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [nbDisplayedSimilarCoaches, setBbDisplayedSimilarCoaches] = useState(3)

  const isMobile = useMediaPredicate('(max-width: 992px)')

  const [jobs, setJobs] = useState([])
  const [sports, setSports] = useState([])
  const [dances, setDances] = useState([])

  useEffect(() => {
    Axios.all([
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/jobs`),
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/sports`),
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/dances`),
    ]).then((res) => {
      setDances(res[2].data)
      setSports(res[1].data)
      setJobs(res[0].data)
    })
    if (isEmpty(appCoachesList)) {
      Axios.get(`${CLIENT_SIDE_API_BASE_URL()}/users/coaches/all`).then(
        (res) => {
          setAppCoachesList(res.data)
          setSimilarCoaches(
            res.data.filter(
              (el) =>
                (!isEmpty(
                  intersection(
                    coach.coachData.specialty,
                    el.coachData.specialty,
                  ),
                ) ||
                  el.coachData.job === coach.coachData.job) &&
                router.query.username !== el.username,
            ),
          )
        },
      )
    } else {
      setSimilarCoaches(
        appCoachesList.filter(
          (el) =>
            (!isEmpty(
              intersection(coach.coachData.specialty, el.coachData.specialty),
            ) ||
              el.coachData.job === coach.coachData.job) &&
            router.query.username !== el.username,
        ),
      )
    }
  }, [])

  const renderCoachProfile = () => {
    return (
      <InfoCoach
        coachProfile={coach}
        job={job}
        specialty={specialty}
        onOpenCalendar={() => {
          window.scrollTo(400, !isMobile ? 250 : 650)
          setTab(CALENDAR_TAB)
        }}
      />
    )
  }

  const displayTabs = () => {
    if (coach) {
      if (tab === ABOUT_TAB) {
        return (
          <div className="tabsinfo__title">
            <CoachBox
              mainJob={job}
              allJobs={jobs}
              allSpecialties={dances.concat(sports)}
              coachData={coach.coachData}
              iconExclamation={exclamation}
              specialty={specialty}
              setTab={setTab}
              setPricePackage={setPricePackage}
            />
          </div>
        )
      }
      // if (tab === RECOMMENDATION_TAB) {
      //   return <CoachAvis coach={coach} />
      // }
      if (tab === BIOGRAPHY_TAB) {
        return (
          <Biography
            coachProfile={coach}
            title="Biographie"
            icon={exclamation}
          />
        )
      }

      if (tab === CALENDAR_TAB) {
        return (
          <CoachCalendar
            onSuccess={() => setTab(SUCCESS_BOOKING_TAB)}
            coach={coach}
            pricePackage={pricePackage}
          />
        )
      }

      if (tab === SUCCESS_BOOKING_TAB) {
        return (
          <div className="coach-calendar__request-succeeded">
            <div className="coach-calendar__request-succeeded__icon">
              <Icon type="check-circle" />
            </div>
            <div className="coach-calendar__request-succeeded__title">
              Confirmation
            </div>
            <div className="coach-calendar__request-succeeded__description">
              Votre demande de réservation a été envoyée à l'entraîneur!
            </div>
            <div className="coach-calendar__request-succeeded__sub-description">
              vous serez contacté par téléphone pour confirmer votre cours .
              <div>
                <a
                  href={FRONT_END_PLATFORM_URL(
                    typeof window !== 'undefined' &&
                      window.localStorage &&
                      window.localStorage.getItem('token'),
                  )}
                  className="isporit-primary-button link-platform"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir mes réservations
                </a>
              </div>
            </div>
          </div>
        )
      }
      if (tab === SUCCESS_CONTACT_TAB) {
        return (
          <div className="coach-calendar__request-succeeded">
            <div className="coach-calendar__request-succeeded__icon">
              <Icon type="check-circle" />
            </div>
            <div className="coach-calendar__request-succeeded__title">
              Confirmation
            </div>
            <div className="coach-calendar__request-succeeded__description">
              votre message a été envoyé
            </div>
            <div className="coach-calendar__request-succeeded__sub-description">
              {coach.firstName} vous contactera par téléphone ou par e-mail.
              <div>
                <a
                  href={FRONT_END_PLATFORM_URL(
                    typeof window !== 'undefined' &&
                      window.localStorage &&
                      window.localStorage.getItem('token'),
                  )}
                  className="isporit-primary-button link-platform"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir mon profil
                </a>
              </div>
            </div>
          </div>
        )
      }

      if (tab === CONTACT_TAB) {
        return (
          <CoachProfileContactTab
            onSuccess={() => setTab(SUCCESS_CONTACT_TAB)}
            coach={coach}
            pricePackage={pricePackage}
          />
        )
      }
    }
  }

  useEffect(() => {
    // setCoachData(coach)
    const job = jobs.find(
      (j) => j._id === (coach.coachData && coach.coachData.job),
    )

    let specialty = []
    if (job) {
      if (job.specialty && job.specialty.type === 'sport') {
        specialty = coach.coachData.specialty
          ? coach.coachData.specialty.reduce((acc, val) => {
              const element = sports.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      } else if (job.specialty && job.specialty.type === 'dance') {
        specialty = coach.coachData.specialty
          ? coach.coachData.specialty.reduce((acc, val) => {
              const element = dances.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      }
    }
    setSpecialty(specialty)
    setJob(job)
  }, [router.query.id, jobs])

  useEffect(() => {
    if (router.query.calendar) {
      window.scrollTo(400, !isMobile ? 250 : 650)
      setTab(CALENDAR_TAB)
    }
  }, [router.query.calendar])

  if (userNotFound) {
    return (
      <Error statusCode={404} description={"Oops!!! Ce coach n'existe pas"} />
    )
  }

  if (isEmpty(coach.coachData)) {
    return (
      <Error statusCode={404} description={"Oops!!! Ce coach n'existe pas"} />
    )
  }

  const coachProfileCard = (el, isLast) => {
    const j = jobs.find((j) => j._id === (el.coachData && el.coachData.job))
    let sp = []
    if (j) {
      if (j.specialty && j.specialty.type === 'sport') {
        sp = el.coachData.specialty
          ? el.coachData.specialty.reduce((acc, val) => {
              const element = sports.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      } else if (j.specialty && j.specialty.type === 'dance') {
        sp = el.coachData.specialty
          ? el.coachData.specialty.reduce((acc, val) => {
              const element = dances.find((dance) => dance._id === val)
              if (element) {
                acc = [...acc, element]
              }
              return acc
            }, [])
          : []
      }
    }

    const sessionPrices = getPackagesAndFirstSession(el)

    return (
      <Link href={routes.COACH_DETAILS.PROFILE.linkTo(el.username)}>
        <a
          className={`text-unset-color flex py-2  border-gray-200  md:border-none md:w-6/12 w-full px-3 md:py-4 lg:w-4/12 hover:text-unset-color ${
            isLast ? '' : 'border-b-2'
          }`}
          href={routes.COACH_DETAILS.PROFILE.linkTo(el.username)}
        >
          <div className="min-w-max mr-2">
            <img
              className="w-28 h-28 rounded-full object-cover"
              src={getUserProfilePicture(el.profilePicture)}
              alt={`${el.firstName} ${el.lastName}`}
            />
          </div>
          <div className="w-auto">
            <div className="text-base font-bold text-black capitalize">
              {cutString(`${el.firstName} ${el.lastName}`, 30)}
            </div>
            <div className="text-base font-medium text-gray-600">
              {el.coachData &&
                el.coachData.experiencesYearsNumber > 1 &&
                `${
                  el.coachData && el.coachData.experiencesYearsNumber
                } ans d'expérience`}
              {el.coachData &&
                el.coachData.experiencesYearsNumber === 1 &&
                `1 an d'expérience`}
            </div>
            <div className="text-base font-medium text-gray-600">
              {j && j.translations && j.translations.fr}
            </div>
            <div className="">
              {sp && cutString(sp.map((s) => s.translations.fr).join(', '), 30)}
            </div>
            {sessionPrices && sessionPrices.cheapestPrice && (
              <div className="">
                {sessionPrices.cheapestPrice} DT -{' '}
                {sessionPrices.cheapestPriceSessions} seance(s)
              </div>
            )}
            {sessionPrices && sessionPrices.firstSessionPrice !== -1 && (
              <div className="text-primary font-semibold">
                1ère séance {sessionPrices.firstSessionPrice}
              </div>
            )}
          </div>
        </a>
      </Link>
    )
  }

  const onClickContactButton = () => {
    setIsContactModalOpen(true)

    // window.scrollTo(400, !isMobile ? 250 : 650)

    // setTab(CALENDAR_TAB)
  }

  return (
    <>
      <Head>
        <title>
          {coach.firstName[0].toUpperCase() + coach.firstName.slice(1)}{' '}
          {coach.lastName[0].toUpperCase() + coach.lastName.slice(1)}
        </title>
        <meta
          name="description"
          content={coach.coachData && nl2br(coach.coachData.aboutMe)}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://isporit.com/coaches/${coach.username}`}
        />
        <meta property="og:description" content={coach.coachData.aboutMe} />
        <meta
          property="og:image"
          content={getUserProfilePicture(coach.profilePicture)}
        />
        <link
          rel="canonical"
          href={`https://isporit.com/coaches/${coach.username}`}
        />
        <FacebookPixel />
      </Head>
      <Layout>
        <div className="coach">
          <div className="affiche">
            <img className="affiche__img" src={affiche} alt="affiche" />
          </div>

          {isMobile && (
            <div style={{ margin: '20px 10px 10px 16px' }}>
              <Breadcrumb separator=">">
                <Breadcrumb.Item className="isporit-breadcrumb-link">
                  <Link href={routes.COACHES_LIST.path}>
                    <a href={routes.COACHES_LIST.path}>Tous les coachs</a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {`${
                    coach.firstName[0].toUpperCase() + coach.firstName.slice(1)
                  } ${coach.lastName[0].toUpperCase()}${coach.lastName.slice(
                    1,
                  )}`}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          )}

          <div className="coach__coachdetails">
            <div className="coach__cordonneBlock">
              <div className="coach__coachdetails__contact">
                {coach && jobs && renderCoachProfile(coach)}
              </div>
            </div>
            {isMobile && isSessionPricesEmpty(coach.coachData) && (
              <Affix offsetTop={65}>
                <button
                  onClick={onClickContactButton}
                  type="button"
                  className="isporit-primary-button tabs__contact"
                  style={{
                    marginTop: '10px',
                    padding: '5px 34px',
                    width: '100%',
                  }}
                >
                  Contact
                </button>
              </Affix>
            )}
            <div className="tabsinfo">
              {!isMobile && (
                <Breadcrumb separator=">">
                  <Breadcrumb.Item className="isporit-breadcrumb-link">
                    <Link href={routes.COACHES_LIST.path}>
                      <a href={routes.COACHES_LIST.path}>Tous les coachs</a>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {`${
                      coach.firstName[0].toUpperCase() +
                      coach.firstName.slice(1)
                    } ${coach.lastName[0].toUpperCase()}${coach.lastName.slice(
                      1,
                    )}`}
                  </Breadcrumb.Item>
                </Breadcrumb>
              )}
              <div className="tabs">
                <div className="tabs__button">
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 1 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(ABOUT_TAB)}
                  >
                    A propos
                  </button>
                  <button
                    type="button"
                    className={`isporit-unset-button-css tabs__button__not-active ${
                      tab === 3 ? 'tabs__button__active' : ''
                    }`}
                    onClick={() => setTab(BIOGRAPHY_TAB)}
                  >
                    Biographie
                  </button>
                </div>
                {!isMobile && isSessionPricesEmpty(coach.coachData) && (
                  <button
                    onClick={onClickContactButton}
                    type="button"
                    className="isporit-primary-button tabs__contact"
                  >
                    Contact
                  </button>
                )}
              </div>
              {displayTabs()}
            </div>
          </div>
        </div>

        <IsporitModal
          isVisible={isContactModalOpen}
          onCancel={() => setIsContactModalOpen(false)}
          footer={false}
          title={false}
          className="coach__contact-modal-open"
        >
          <div className="isporit-flex-h-center-v-center">
            <button
              onClick={() => {
                window.scrollTo(400, !isMobile ? 250 : 550)
                setTab(CALENDAR_TAB)
                setIsContactModalOpen(false)
              }}
              type="button"
              className="isporit-primary-button coach__contact-modal-open__booking-btn"
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
                window.scrollTo(400, !isMobile ? 250 : 140)
                setTab(CONTACT_TAB)
                setIsContactModalOpen(false)
              }}
              type="button"
              className="isporit-secondary-button"
              style={{
                padding: '13px 36px',
                width: !isMobile ? 'fit-content' : '100%',
              }}
            >
              Envoyer un message
            </button>
          </div>
        </IsporitModal>

        {!isEmpty(similarCoaches) && (
          <h2 className="text-2xl px-3 font-light">
            Autres coachs qui peuvent vous intéresser
          </h2>
        )}
        <div className="flex flex-wrap">
          {similarCoaches
            .slice(0, nbDisplayedSimilarCoaches)
            .map((el, index) =>
              coachProfileCard(
                el,
                similarCoaches.slice(0, nbDisplayedSimilarCoaches).length -
                  1 ===
                  index,
              ),
            )}
        </div>
        {!isEmpty(similarCoaches) && (
          <button
            type="submit"
            onClick={() => setBbDisplayedSimilarCoaches((nb) => nb + 3)}
            className="text-center text-black text-lg w-full underline my-4"
          >
            Voir plus
          </button>
        )}
      </Layout>
    </>
  )
}

CoachDetails.propTypes = {
  coach: PropTypes.objectOf(PropTypes.any).isRequired,
}
