import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/coach.scss'
import Clublogo from '../shared/components/clublogo/Clublogo'

import Title from '../shared/components/TitleSection/TitleSection';
import Demo from '../shared/components/DemoSection/DemoSection';
import Postplatforme from '../shared/components/postplatforme/Postplatforme';
import Tab from '../shared/components/tab/Tab';
import { i18n, withTranslation } from '../i18n'
import Join from '../shared/components/joinplatforme/Join';

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import globalCss from '../shared/global-style.scss'
import routes from '../utils/routes';


const Index = (props) => {
  const [lang, setLang] = useState(undefined)
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])

  return (
    <div className={css.home_page}>
      <Head>
        <title>Entraîneur</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Avec ISporit vous pouvez planifier vos sessions, faire la présence et suivre l'historique 
            de chacune des sessions de votre groupe. Vous pouvez partager 
            votre expérience et vos réalisations via votre profil public." />
        <meta name="keywords" content="sport,clubs,coaches,players,tennis,football..." />
        <meta name="author" content="iSporit" />

      </Head>
      <Layout>
        <div className={css.postplatforme}>
          <Postplatforme
            img={"icon/forcoach.png"}
            title="Le suivi et la planification pour vos joueurs n'ont jamais été aussi simples"
            sub_title="Avec ISporit vous pouvez planifier vos sessions, faire la présence et suivre l'historique 
            de chacune des sessions de votre groupe. Vous pouvez partager 
            votre expérience et vos réalisations via votre profil public."
            buttonone="S'inscrire gratuitement"
            backgroundbutton={"#ff8760"}
            link={routes.CONTACT_US.coachPath}
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
                  title="Planifiez vos séances "
                  title_two="et suivez vos joueurs"
                  description="ISporit facilite la façon avec laquelle vous planifiez les séances de votre groupe, 
                  la communication entre vous et votre club / joueurs et vous donne 
                  la possibilité de suivre les performances de chaque match et 
                  entraînement pour tous vos joueurs."
                  link={routes.CONTACT_US.coachPath}
                />
              </div>
              <img alt="image" style={{ width: "100%" }} className={css.Image_gagnant} src={"icon/coach.svg"} alt="" />

            </div>
          </div>

          <Title title="Améliorez et suivez votre travail"
            sub_title="Nous vous offrons plusieurs outils intuitifs et faciles à utiliser"
          />
          <div className={`${globalCss.isporit_max_width} ${css.tab} `}>
            <Tab
              bgcolor={'#ffe5d9'}
              imgone={"icon/clubseance.png"}
              imgtwo={"icon/gestion_club.png"}
              imgthere={"icon/clubseance.png"}
              content={[
                {
                  title: "Planifiez et attribuez des tâches",
                  description: "Planifiez vos séances d'entraînement et créez des tâches à faire par vos joueurs."
                },
                {
                  title: "Encouragez et suivez chaque évolution",
                  description: "Encouragez vos joueurs après leur entraînement et suivez leurs évolutions grâce au partage de statistiques."
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
              link={routes.CONTACT_US.coachPath} 
              buttontwo="Contactez notre service commercial" 
              classbutton={css.buttondisplay} 
            />
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