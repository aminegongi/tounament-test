/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import Axios from 'axios'
import { Collapse, Icon, Button } from 'antd'
import Link from 'next/link'
import Countdown from 'antd/lib/statistic/Countdown'
import Layout from '../shared/components/layout/Layout'
import '../shared/css/home.scss'
import Clublogo from '../shared/components/clublogo/Clublogo'
import PlatformIntro from '../shared/components/PlatformIntro/PlatformIntro'
import TrustUs from '../shared/components/TrustUs/TrustUs'
import InterfacesExample from '../shared/components/InterfacesExample/InterfacesExample'
import Feature from '../shared/components/Feature/Feature'
import BecomePartner from '../shared/components/BecomePartner/BecomePartner'
import Title from '../shared/components/TitleSection/TitleSection'
import Join from '../shared/components/joinplatforme/Join'
import moment from 'moment'
import { useMediaPredicate } from 'react-media-hook'

import Demo from '../shared/components/DemoSection/DemoSection'
import Functionclub from '../shared/components/Functionclub/Functionclub'
import Navbar from '../shared/components/navbar/Navbar'
import FooterIndexPage from '../shared/components/footerIndexPage/footerIndexPage'
import performance from '../public/icon/performance.png'
import { i18n, withTranslation } from '../i18n'
import {
  API,
} from '../shared/constants'
import '../shared/global-style.scss'
import routes from '../utils/routes'
// import Countdown from '../shared/components/CountDown'

const { Panel } = Collapse
import { useRouter } from 'next/router'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
}

const Index = ({ coachesList, jobs, sports, dances, regions }) => {
  const [lang, setLang] = useState(undefined)
  const [searchBar, setSearchBar] = useState(true)
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])
  const router = useRouter()

const mobile = useMediaPredicate('(max-width: 850px)')

const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (mobile !== isMobile) {
      setIsMobile(mobile)
    }
  }, [mobile])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isVisibleElement = (el) => {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    const elemTop = rect.top
    const elemBottom = rect.bottom
    // Only completely visible elements return true:
    // const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    const isVisibleC = elemTop < window.innerHeight && elemBottom >= 0
    return isVisibleC
  }
  const handleScroll = () => {
    let el = document.getElementById('cv')
    let isVisibleC = isVisibleElement(el)
    if (isVisibleC) {

      setSearchBar(true)
    } else {
 
      setSearchBar(false)
    }
  }
  useEffect(() => {
    // window.location.href = "/contact-us";
    // Axios.get('https://api.isporit.com/auth/me', { withCredentials: true }).then(res => console.log('res ', res)).catch(e => console.log('e ,', e))
  }, [])
  if(!router.query.draft){
  return (
    <div className="home_page">
      <div className="home_page__counter-page">
        <img
          width="400px"
          src="../../../icon/coachIsporit.png"
          alt="iSporit"
        />
        <h1 className="home_page__counter-page__counter">
          <Countdown
            title=""
            value={moment('2021 04 16 18:00', 'YYYY MM DD HH:mm')}
            format="DD [Jours] HH [Heures] mm [Minutes] ss [Secondes] "
          />
        </h1>
        <Link href={routes.CONTACT_US.path}>
          <a href={routes.CONTACT_US.path}>
            <Button className="home_page__counter-page__contact" type="primary">
              Contact
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
  }

  return (
    <div className="home_page">
      <Head>
        <title>Accueil</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Notre plateforme vous offrira des outils puissants et simples qui vous permettront non seulement de gérer parfaitement vos plannings et collaborateurs mais aussi de gagner du temps."
        />
        <meta
          name="keywords"
          content="sport,clubs,coaches,players,tennis,football"
        />
        <meta name="author" content="iSporit" />
      </Head>

      <Layout
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        coachesList={coachesList}
        jobs={jobs}
        sports={sports}
        dances={dances}
        regions={regions}
      >
        <div
          className={`${'gerer_iluustateur'}`}
          style={!isMobile?{ paddingTop: '11rem' }:{}}
        >
          <div
            className={`${'gerer_iluustateur_container'} ${'isporit_max_width'}`}
          >
            <div className={`${'gerer_equipe_img'} `}>
              <h1 className="gerer_equipe_title">
                Réservez dès maintenant votre entraîneur Isporit
              </h1>
              <div className="gerer_time_title" id="cv">
                <div>
                  Avec Isporit, vous trouverez des entraîneurs qualifiés et
                  expérimentés, vous pouvez planifier votre séance avec un
                  professionnel en sport et yoga.
                </div>
              </div>
              <Link href={routes.COACHES_LIST.path}>
                <button className="gerer_team">Réservez vos entraîneurs</button>
              </Link>
            </div>
            <img
              alt="image"
              className="img_illustration"
              src="icon/coachesBanner.png"
              alt=""
            />
          </div>
        </div>

        <div className={`${'gerer_iluustateur'}`} id="reste">
          <div
            className={`${'gerer_iluustateur_container'} ${'isporit_max_width'}`}
          >
            <div className={`${'gerer_equipe_img'} `}>
              <h1 className="gerer_equipe_title">
                Gérez vos équipes sportives efficacement et simplement n'importe
                où vous soyez
              </h1>
              <div className="gerer_time_title">
                <div>
                  iSporit vous fera gagner du temps pour gérer la présence de
                  vos groupes, l'organisation de vos calendriers, événements et
                  plus encore.
                </div>
              </div>
              <Link href={routes.CLUB_FEATURES.path}>
                <button className="gerer_team">
                  Gérer mon équipe gratuitement
                </button>
              </Link>
              <div className="for_windows">
                Pour Windows, Mac, Android et iOS
              </div>
            </div>
            <img
              alt="image"
              className="img_illustration"
              src="icon/illustration.png"
              alt=""
            />
          </div>
        </div>

        <div className="club_logo_and_title">
          {/* <Clublogo
            images={[
              {
                alt: 'club',
                src: 'clubLogo/radesTennisAcademy.jpg',
              },
              {
                alt: 'club',
                src: 'clubLogo/eliteSportAcademy.jpg',
              },
              {
                alt: 'club',
                src: 'clubLogo/omSchoolTunis.jpg',
              },
              {
                alt: 'club',
                src: 'clubLogo/green_park.png',
              },
            ]}
          /> */}

          {/* <Title
            title="Regagnez votre temps à nouveau"
            sub_title="Gérer les plannings et les absences avec iSporit est plus efficace
            que de le faire"
            sub_title_two="avec des tonnes de feuilles qui auront peu de traçabilité plus tard."
          />

          <div className={`${'presenter_winner'} ${'isporit_max_width'}`}>
            <div className="presenter_block">
              <div style={{ justifySelf: 'center' }}>
                <Demo
                  img="icon/montre.png"
                  title="Gagnez plus"
                  title_two="de 10h par semaine"
                  description="Notre plateforme vous offrira des outils puissants et simples qui vous permettront non seulement de gérer parfaitement vos plannings et collaborateurs mais aussi de gagner du temps."
                  link={routes.CONTACT_US.clubPath}
                />
              </div>

              <img
                style={{ width: '100%' }}
                alt="image"
                className="img_platforme"
                src="icon/Image_gagnant.png"
              />
            </div>
          </div>

          <div className={`${'revenus_gagnant'} ${'isporit_max_width'}`}>
            <div className="presenter_block">
              <img
                style={{ width: '100%' }}
                alt="image"
                className="img_platforme"
                src="icon/img_platforme.png"
                alt=""
              />
              <div style={{ justifySelf: 'center' }}>
                <Demo
                  img="icon/flech.png"
                  title="Accroissez"
                  title_two="vos revenus"
                  description="Votre club gagnera en visibilité auprès d'une grande communauté de joueurs inscrits dans la plateforme et améliorera son image de marque grâce aux consignes de notre équipe experte en digital."
                  link={routes.CONTACT_US.clubPath}
                />
              </div>
            </div>
          </div>

          <Title
            title="  Les meilleures fonctionnalités"
            title_two=" pour révolutionner la gestion de votre club"
            sub_title=" Boostez la carrière de vos joueurs et suivez leurs parcours sportif
        dès leur première"
            sub_title_two="inscription dans votre organisation."
          />

          <div className={`${'gestion_club'} ${'isporit_max_width'}`}>
            <div className="system_performance">
              <Functionclub
                img="icon/system.png"
                title="Système de communication"
                description="Grâce aux alertes mobile et messages entre joueurs/entraîneurs/clubs, communiquez en toute efficacité!"
              />

              <Functionclub
                img={performance}
                title="Performance et statistiques"
                description="Ceux-ci aident les entraîneurs et joueurs à analyser les matchs mais aussi de mieux comprendre leurs forces et faiblesses"
              />
              <Functionclub
                img="icon/mobile.png"
                title="Multi-accessibilité"
                description="Vous aurez un accès à la plateforme où que vous soyez avec votre ordinateur, tablette et smartphone."
              />

              <Functionclub
                img="icon/gestion.png"
                title="Gestion du staff et groupes"
                description="Organisez vos joueurs, entraîneurs et groupes en gérant la présence et l'historique, la planification des tâches et des programmes à réaliser."
              />
            </div>

            <img
              alt="image"
              className="performance_img"
              src="icon/gestion_club.png"
              alt=""
            />

            <div>
              <Link href={routes.CONTACT_US.clubPath}>
                <button
                  style={{ marginTop: 0 }}
                  onClick={() => (window.location.href = '/contact-us')}
                  className="gerer_team"
                >
                  J'inscris mon club
                </button>
              </Link>
            </div>
          </div> */}

          {/* <Title
            title=" Questions souvent posées"
            sub_title="Vous trouverez ci-dessous les questions auxquelles nous avons fait face plusieurs "
            sub_title_two="fois et les réponses nécessaires"
          />



          <Collapse
            className={`${"collapseStyle"} ${"isporit_max_width"}`}
            expandIconPosition="right"
            bordered={false}
            defaultActiveKey={['1']}

            expandIcon={({ isActive }) => <img alt="icon" className={"expandicon"} src={isActive ?
              "icon/moins.png"
              : "icon/plus.png"} />}
          >
            <Panel header="Comment s'inscrire sur iSporit ?" className={"customPanelStyletext"} key="1" style={customPanelStyle}>
              Lorem
            </Panel>
            <Panel className={"customPanelStyletext"} header="Je suis un joueur non-inscrit dans un club, est-ce que je peux utiliser la plateforme ?" key="2" style={customPanelStyle}>
              <div className={"customPaneltwo"}>
                {text}
              </div>
            </Panel>
            <Panel className={"customPanelStyletext"} header="Lorem ipsum dolor sit amet, consetetur sadispscing elitr, sed diam nonumy ?" key="3" style={customPanelStyle}>
              <div className={"customPaneltwo"}>
                {text}
              </div>
            </Panel>
            <Panel className={"customPanelStyletext"} header="Lorem ipsum dolor sit amet ?" key="4" style={customPanelStyle}>
              <div className={"customPaneltwo"}>
                {text}
              </div>
            </Panel>
            <Panel className={"customPanelStyletext"} header="Lorem ipsum dolor sit amet, consetetur sadispscing ?" key="5" style={customPanelStyle}>
              <div className={"customPaneltwo"}>
                {text}
              </div>
            </Panel>
          </Collapse> */}

          <div className={`${'isporit_max_width'} ${'join'} `}>
            <Join
              link={routes.CONTACT_US.clubPath}
              buttonone="Connexion"
              buttontwo="Contactez notre service commercial"
            />
          </div>
        </div>
      </Layout>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  const coachesRes = await fetch(`${API}users/coaches/all`)
  const jobsRes = await fetch(`${API}jobs`)
  const sportsRes = await fetch(`${API}sports`)
  const danceRes = await fetch(`${API}dances/`)
  const regionsRes = await fetch(`${API}regions/`)
  const jsonCoachesRes = await coachesRes.json()
  let jsonJobsRes = await jobsRes.json()

  if (jsonJobsRes) {
    jsonJobsRes = jsonJobsRes
      .filter((job) => job.isPublic)
      .sort((a, b) => a.order - b.order)
  }

  let jsonSportsRes = await sportsRes.json()
  if (jsonSportsRes) {
    jsonSportsRes = jsonSportsRes.filter((sport) => sport.type !== undefined)
  }
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coachesList: jsonCoachesRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes,
    namespacesRequired: ['common'],
  }
 
}



Index.propTypes = {
  t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Index)
