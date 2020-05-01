import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/home.scss'
import Clublogo from '../shared/components/clublogo/Clublogo'
import PlatformIntro from '../shared/components/PlatformIntro/PlatformIntro';
import TrustUs from '../shared/components/TrustUs/TrustUs';
import InterfacesExample from '../shared/components/InterfacesExample/InterfacesExample';
import Feature from '../shared/components/Feature/Feature';
import BecomePartner from '../shared/components/BecomePartner/BecomePartner';
import Title from '../shared/components/TitleSection/TitleSection';
import Join from '../shared/components/joinplatforme/Join';

import Demo from '../shared/components/DemoSection/DemoSection';
import Functionclub from '../shared/components/Functionclub/Functionclub';
import Navbar from '../shared/components/navbar/Navbar';
import FooterIndexPage from '../shared/components/footerIndexPage/footerIndexPage';
import performance from '../public/icon/performance.png'
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Collapse, Icon, Button } from 'antd';
import globalCss from '../shared/global-style.scss'
import Link from 'next/link';


const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};



const Index = (props) => {
  const [lang, setLang] = useState(undefined)
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])

  useEffect(() => {
    // window.location.href = "/contact-us";
    // Axios.get('https://api.isporit.com/auth/me', { withCredentials: true }).then(res => console.log('res ', res)).catch(e => console.log('e ,', e))
  }, [])

  return (
    <div className={css.home_page}>
      <Head>
        <title>{props.t("homePageTitle", "Home")}</title>
        <link rel="icon" href="/logo.png" />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Sporit Home page " />
        <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
        <meta name="author" content="sporit" />
        <link rel="manifest" href="/static/manifest/manifest.json" />

      </Head>
      <div className={css.navbar}>
        <Navbar logo={"icon/logoindexpage.png"}
          navmenu1="La plateforme"
          icon="down"
          navmenu2="Clubs partenaires"
          navmenu3="Chercher un joueur"
          navmenu4="Contact"
          buttonone="connexion"
          buttontwo="S'inscrire gratuitement"
        />
      </div>


      <div className={`${css.gerer_iluustateur}`}>
        <div className={`${css.gerer_iluustateur_container} ${globalCss.isporit_max_width}`}>
          <div className={`${css.gerer_equipe_img} `}>
            <div className={css.gerer_equipe_title}>
              Gérez vos équipes sportives efficacement et simplement n'importe où vous soyez
            </div>
            <div className={css.gerer_time_title}>
              <div>
                iSporit vous fera gagner du temps pour gérer la présence de vos groupes,
                l'organisation de vos calendriers, événements et plus encore.
              </div>
            </div>
            <Link href="/contact-us" >
              <button className={css.gerer_team}>
                Gérer mon équipe gratuitement
              </button>
            </Link>
            <div className={css.for_windows}>
              Pour Windows, Mac, Android et iOS
            </div>
          </div>
          <img alt="image" className={css.img_illustration} src={"icon/illustration.png"} alt="" />
        </div>
      </div>


      <div className={css.club_logo_and_title}>
        <Clublogo
          images={[
            {
              alt: "club",
              src: "icon/hubspot.png",
            },
            {
              alt: "club",
              src: "icon/servicetitan.png",
            },
            {
              alt: "club",
              src: "icon/square.png",
            },
            {
              alt: "club",
              src: "icon/cognizant.png",
            },
            {
              alt: "club",
              src: "icon/square.png",
            }
          ]}

        />

        <Title
          title="Regagnez votre temps à nouveau"
          sub_title="Gérer les plannings et les absences avec iSporit est plus efficace
        que de le faire"
          sub_title_two="avec des tonnes de feuilles qui auront peu de traçabilité plus tard."
        />

        <div className={`${css.presenter_winner} ${globalCss.isporit_max_width}`}>
          <div className={css.presenter_block}>
            <div style={{ justifySelf: "center" }}>
              <Demo
                img={"icon/montre.png"}
                title="Gagnez plus"
                title_two="de 10h par semaine"
                description="Notre plateforme vous offrira des outils puissants et simples qui vous permettront non seulement de gérer parfaitement vos plannings et collaborateurs mais aussi de gagner du temps."

              />
            </div>

            <img style={{ width: "100%" }} alt="image" className={css.img_platforme} src={"icon/Image_gagnant.png"} />

          </div>
        </div>



        <div className={`${css.revenus_gagnant} ${globalCss.isporit_max_width}`}>
          <div className={css.presenter_block} >
            <img style={{ width: "100%" }} alt="image" className={css.img_platforme} src={"icon/img_platforme.png"} alt="" />
            <div style={{ justifySelf: "center" }}>
              <Demo

                img={"icon/flech.png"}
                title="Accroissez"
                title_two="vos revenus"
                description="Votre club gagnera en visibilité auprès d'une grande communauté de joueurs inscrits dans la plateforme et améliorera son image de marque grâce aux consignes de notre équipe experte en digital."

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


        <div className={`${css.gestion_club} ${globalCss.isporit_max_width}`}>

          <div className={css.system_performance}>
            <Functionclub
              img={"icon/system.png"}
              title="Système de communication"
              description="Grâce aux alertes mobile et messages entre joueurs/entraîneurs/clubs, communiquez en toute efficacité!"
            />


            <Functionclub
              img={performance}
              title="Performance et statistiques"
              description="Ceux-ci aident les entraîneurs et joueurs à analyser les matchs mais aussi de mieux comprendre leurs forces et faiblesses"
            />
            <Functionclub
              img={"icon/mobile.png"}
              title="Multi-accessibilité"
              description="Vous aurez un accès à la plateforme où que vous soyez avec votre ordinateur, tablette et smartphone."
            />

            <Functionclub
              img={"icon/gestion.png"}
              title="Gestion du staff et groupes"
              description="Organisez vos joueurs, entraîneurs et groupes en gérant la présence et l'historique, la planification des tâches et des programmes à réaliser."
            />
          </div>

          <img alt="image" className={css.performance_img} src={"icon/gestion_club.png"} alt="" />

          <div>
            <button style={{ marginTop: 0 }} onClick={() => window.location.href = "/contact-us"} className={css.gerer_team}>
              Demander une démo
            </button>
          </div>
        </div>

        <Title
          title=" Questions souvent posées"
          sub_title="Vous trouverez ci-dessous les questions auxquelles nous avons fait face plusieurs "
          sub_title_two="fois et les réponses nécessaires"
        />



        <Collapse
          className={`${css.collapseStyle} ${globalCss.isporit_max_width}`}
          expandIconPosition="right"
          bordered={false}
          defaultActiveKey={['1']}

          expandIcon={({ isActive }) => <img className={css.expandicon} src={isActive ?
            "icon/moins.png"
            : "icon/plus.png"} />}
        >
          <Panel header="Comment s'inscrire sur iSporit ?" className={css.customPanelStyletext} key="1" style={customPanelStyle}>
            {/* <div className={css.customPaneltwo}>s */}
              Lorem
            {/* </div>s */}
          </Panel>
          <Panel className={css.customPanelStyletext} header="Je suis un joueur non-inscrit dans un club, est-ce que je peux utiliser la plateforme ?" key="2" style={customPanelStyle}>
            <div className={css.customPaneltwo}>
              {text}
            </div>
          </Panel>
          <Panel className={css.customPanelStyletext} header="Lorem ipsum dolor sit amet, consetetur sadispscing elitr, sed diam nonumy ?" key="3" style={customPanelStyle}>
            <div className={css.customPaneltwo}>
              {text}
            </div>
          </Panel>
          <Panel className={css.customPanelStyletext} header="Lorem ipsum dolor sit amet ?" key="4" style={customPanelStyle}>
            <div className={css.customPaneltwo}>
              {text}
            </div>
          </Panel>
          <Panel className={css.customPanelStyletext} header="Lorem ipsum dolor sit amet, consetetur sadispscing ?" key="5" style={customPanelStyle}>
            <div className={css.customPaneltwo}>
              {text}
            </div>
          </Panel>
        </Collapse>


        <div className={`${css.join} ${globalCss.isporit_max_width}`}>
          <Join buttonone="Connexion" buttontwo="Contactez notre service commercial" />
        </div>

        <div className={`${css.footer} ${globalCss.isporit_max_width}`}>
          <FooterIndexPage
            logo={"icon/logoindexpage.png"}
            navmenu1="La plateforme"
            navmenu2="Clubs partenaires"
            navmenu3="Chercher un joueur"
            navmenu4="Contact"
            navmenu5="connexion"
            buttontwo="Devenez partenaire"

          />
        </div>
        <div className={`${css.copyright} ${globalCss.isporit_max_width}`}>
          © 2020 iSporit. All rights reserved
        </div>
      </div>

    </div>
  )
}


Index.getInitialProps = async (ctx) => {

  return ({
    namespacesRequired: ['common'],
  })
}

Index.propTypes = {
  t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Index);