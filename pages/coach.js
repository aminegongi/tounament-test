import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/coach.scss'
import Clublogo from '../shared/components/clublogo/Clublogo'

import PlatformIntro from '../shared/components/PlatformIntro/PlatformIntro';
import TrustUs from '../shared/components/TrustUs/TrustUs';
import InterfacesExample from '../shared/components/InterfacesExample/InterfacesExample';
import Feature from '../shared/components/Feature/Feature';
import BecomePartner from '../shared/components/BecomePartner/BecomePartner';
import Title from '../shared/components/TitleSection/TitleSection';
import Demo from '../shared/components/DemoSection/DemoSection';
import Functionclub from '../shared/components/Functionclub/Functionclub';
import Navbar from '../shared/components/navbar/Navbar';
import Postplatforme from '../shared/components/postplatforme/Postplatforme';
import Tab from '../shared/components/tab/Tab';
import FooterIndexPage from '../shared/components/footerIndexPage/footerIndexPage';
import performance from '../public/icon/performance.png'
import { i18n, withTranslation } from '../i18n'
import Join from '../shared/components/joinplatforme/Join';

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Collapse, Icon, Button } from 'antd';
import globalCss from '../shared/global-style.scss'


const Index = (props) => {
  const [lang, setLang] = useState(undefined)
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])

  useEffect(() => {
    // window.location.href = "/contact-us";
    Axios.get('https://api.isporit.com/auth/me', { withCredentials: true }).then(res => console.log('res ', res)).catch(e => console.log('e ,', e))
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
      <Layout>
        <div className={css.postplatforme}>
          <Postplatforme
            img={"icon/forcoach.png"}
            title="Bâtissez une grande carrière et analysez vos performances réalisées"
            sub_title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo."
            buttonone="S'inscrire gratuitement"
            backgroundbutton={"#ff8760"}

          />
        </div>
        <div className={css.iteamlistblock}>
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


          <div className={`${css.presenter_winner} ${globalCss.isporit_max_width}`}>
            <div className={css.presenter_block}>
              <div style={{ justifySelf: "center" }}>
                <Demo
                  img={"icon/icon_coach.png"}
                  title="Invitez vos joueurs"
                  title_two="et gérez les absences"
                  description="Notre plateforme vous donne désormais la possibilité de suivre les dernières nouvelles grâce aux alertes mobile et messages entre joueurs/entraîneurs/clubs, communiquez en toute transparence et efficacité !"

                />
              </div>
              <img alt="image" style={{ width: "100%" }} className={css.Image_gagnant} src={"icon/coach.svg"} alt="" />

            </div>
          </div>

          <Title title="Entraînez facilement"
            sub_title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor"
            sub_title_two="invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero"
          />
          <div className={`${css.tab} ${globalCss.isporit_max_width}`}>
            <Tab
              bgcolor={'#ffe5d9'}
              imgone={"icon/clubseance.png"}
              imgtwo={"icon/gestion_club.png"}
              imgthere={"icon/clubseance.png"}
              content={[
                {
                  title: "Encouragez vos joueurs et boostez-les",
                  description: "Gérez la disponibilité des terrains de votre club grâce à l'outil de gestion d'événement que la plateforme dédie et gagnez du temps."
                },
                {
                  title: "Personnalisez votre profil et partagez-le",
                  description: "Gérez la disponibilité des terrains de votre club grâce à l'outil de gestion d'événement que la plateforme dédie et gagnez du temps."
                },
                {
                  title: "Créez à chacune des séances un plan",
                  description: "Gérez la disponibilité des terrains de votre club grâce à l'outil de gestion d'événement que la plateforme dédie et gagnez du temps."
                },
              ]}
            />
          </div>

          <div className={`${css.join} ${globalCss.isporit_max_width}`}>
            <Join buttontwo="Contactez notre service commercial" classbutton={css.buttondisplay} />
          </div>
        </div>
      </Layout>



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