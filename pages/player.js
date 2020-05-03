import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/player.scss'
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
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 1 second!')
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    // window.location.href = "/contact-us";
    // Axios.get('https://api.isporit.com/auth/me', { withCredentials: true }).then(res => console.log('res ', res)).catch(e => console.log('e ,', e))
  }, [])

  return (
    <div className={css.home_page}>
      <Head>
        <title>Joueur</title>
        <link rel="icon" href="/logo.png" />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Avec ISporit vous pouvez suivre vos performances, les analyser avec vos entraîneurs ou les partager sur vos réseaux sociaux. Vous pouvez aussi créer un profil public accessible à tous." />
        <meta name="keywords" content="sport,clubs,coaches,players,tennis,football..." />
        <meta name="author" content="iSporit" />
        {/* <link rel="manifest" href="/static/manifest/manifest.json" /> */}

      </Head>
      <Layout>
        <div className={css.postplatforme}>
          <Postplatforme
            img={"icon/for_player.png"}

            title="Le suivi de votre carrière n’a jamais été aussi simple"
            sub_title="Avec ISporit vous pouvez suivre vos performances, les analyser avec vos entraîneurs ou les partager sur vos réseaux sociaux. Vous pouvez aussi créer un profil public accessible à tous."
            buttonone="Inscrivez-vous gratuitement"

            backgroundbutton={"#ffcd67"}

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
                  img={performance}
                  title="Suivez et analysez"
                  title_two="vos performances"
                  description="Grâce à un affichage en courbes, vous pouvez visualiser l’évolution de vos performances au cours du temps."

                />
              </div>
              <img alt="image" style={{ width: "100%" }} className={css.Image_gagnant} src={"icon/joueur.svg"} alt="" />

            </div>
          </div>

          <Title title="Profitez pleinement du iSporit"
            sub_title="Nous vous offrons plusieurs outils intuitifs et faciles à utiliser"
          />
          <div className={`${css.tab} ${globalCss.isporit_max_width}`}>
            <Tab
              bgcolor={'#fff9e2'}
              imgone={"icon/clubseance.png"}
              imgtwo={"icon/gestion_club.png"}
              imgthere={"icon/clubseance.png"}

              content={[
                {
                  title: "Restez en contact avec vos entraîneurs et votre club",
                  description: "grâce au système de messagerie, vous pouvez contacter votre club ou votre entraîneur et envoyer des feedbacks ou des réclamations."
                },
                {
                  title: "Personnalisez votre profil et partagez-le",
                  description: "votre profil est une sorte de CV sportif dans lequel vous pouvez ajouter votre palmarès, vos résultats, vos performances..."
                },
                {
                  title: "Créez vos propres modules de statistiques",
                  description: "Pour chaque séance d'entraînement ou chaque compétition, vous pouvez comptabiliser des anciennes statistiques ou en créer des nouvelles."
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