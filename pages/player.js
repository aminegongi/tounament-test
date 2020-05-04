import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/player.scss'
import Clublogo from '../shared/components/clublogo/Clublogo'

import Title from '../shared/components/TitleSection/TitleSection';
import Demo from '../shared/components/DemoSection/DemoSection';
import Postplatforme from '../shared/components/postplatforme/Postplatforme';
import Tab from '../shared/components/tab/Tab';
import performance from '../public/icon/performance.png'
import { i18n, withTranslation } from '../i18n'
import Join from '../shared/components/joinplatforme/Join';

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import globalCss from '../shared/global-style.scss'
import routes from '../utils/routes';



const Index = (props) => {
  // const [lang, setLang] = useState(undefined)
  // useEffect(() => {
  //   setLang(i18n.language)
  // }, [i18n.language])
  // useEffect(() => {
  //   // window.location.href = "/contact-us";
  //   // Axios.get('https://api.isporit.com/auth/me', { withCredentials: true }).then(res => console.log('res ', res)).catch(e => console.log('e ,', e))
  // }, [])

  return (
    <div className={css.home_page}>
      <Head>
        <title>Joueur</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Avec ISporit vous pouvez suivre vos performances, les analyser avec vos entraîneurs ou les partager sur vos réseaux sociaux. Vous pouvez aussi créer un profil public accessible à tous." />
        <meta name="keywords" content="sport,clubs,coaches,players,tennis,football..." />
        <meta name="author" content="iSporit" />

      </Head>
      <Layout>
        <div className={css.postplatforme}>
          <Postplatforme
            img={"icon/for_player.png"}

            title="Le suivi de votre carrière n’a jamais été aussi simple"
            sub_title="Avec ISporit vous pouvez suivre vos performances, les analyser avec vos entraîneurs ou les partager sur vos réseaux sociaux. Vous pouvez aussi créer un profil public accessible à tous."
            buttonone="Inscrivez-vous gratuitement"

            backgroundbutton={"#ffcd67"}
            link={routes.CONTACT_US.playerPath}
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
                  link={routes.CONTACT_US.playerPath}

                />
              </div>
              <img alt="image" style={{ width: "100%" }} className={css.Image_gagnant} src={"icon/joueur.svg"} alt="" />

            </div>
          </div>

          <Title title="Profitez pleinement du iSporit"
            sub_title="Nous vous offrons plusieurs outils intuitifs et faciles à utiliser"
          />
          <div className={`${globalCss.isporit_max_width} ${css.tab} `}>
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

          <div className={`${globalCss.isporit_max_width} ${css.join} `}>
            <Join 
              link={routes.CONTACT_US.playerPath}
              buttontwo="Contactez notre service commercial" 
              classbutton={css.buttondisplay} 
            />
          </div>
        </div>
      </Layout>

    </div>


  )
}


// Index.getInitialProps = async (ctx) => {

//   return ({
//     namespacesRequired: ['common'],
//   })
// }

Index.propTypes = {
  // t: PropTypes.func.isRequired,
}
// export default withTranslation('common')(Index);
export default Index