import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/club.scss'

import Clublogo from '../shared/components/clublogo/Clublogo'

import Title from '../shared/components/TitleSection/TitleSection';
import Demo from '../shared/components/DemoSection/DemoSection';
import Postplatforme from '../shared/components/postplatforme/Postplatforme';
import Tab from '../shared/components/tab/Tab';
import { i18n, withTranslation } from '../i18n'
import Join from '../shared/components/joinplatforme/Join';
import globalCss from '../shared/global-style.scss'

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import routes from '../utils/routes';




const Index = (props) => {
  // const [lang, setLang] = useState(undefined)
  // useEffect(() => {
  //   setLang(i18n.language)
  // }, [i18n.language])


  return (
    <div className={css.club_page}>
      <Head>
        <title>Club</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="vous pouvez digitaliser votre travail (site web, gestion, suivi, calendrier, performances ...) 
                        dans une seule plateforme. Vous pouvez personnaliser votre site Web avec vos propres informations 
                        afin que les intéressés puissent vous contacter directement depuis votre site Web." />
        <meta name="keywords" content="sport,clubs,coaches,players,tennis,football..." />
        <meta name="author" content="iSporit" />

      </Head>
      <Layout>
        <div className={css.postplatforme}>
          <Postplatforme
            img={"icon/for_club.png"}
            title="La gestion de votre club n'a jamais été aussi simple"
            sub_title="vous pouvez digitaliser votre travail (site web, gestion, suivi, calendrier, performances ...) 
                        dans une seule plateforme. Vous pouvez personnaliser votre site Web avec vos propres informations 
                        afin que les intéressés puissent vous contacter directement depuis votre site Web."
            // buttonone="Gérer mon équipe gratuitement"
            buttonone="Demander une démo"
            backgroundbutton={"#26beb5"}
            link={routes.CONTACT_US.clubPath}
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
                  img={"icon/suivi_club.png"}
                  title="Gagnez plus"
                  title_two="de 10h par semaine"
                  description="Notre plateforme offre désormais à vos joueurs et entraîneurs la possibilité de suivre les dernières actualités grâce aux alertes et messages mobiles entre joueurs / entraîneurs / clubs et de communiquer de manière transparente et efficace!"
                  link={routes.CONTACT_US.clubPath}
                />
              </div>
              <img style={{ width: "100%" }} alt="image" className={css.Image_gagnant} src={"icon/club.svg"} alt="" />

            </div>
          </div>

          <Title title="Boostez la gestion de votre club"
            sub_title="Nous vous offrons plusieurs outils intuitifs et faciles à utiliser"
          />
          <div className={`${globalCss.isporit_max_width} ${css.tab} `}>
            <Tab
              bgcolor={'#E3F7F6'}
              imgone={"feature/club/programme.svg"}
              imgtwo={"feature/club/calendar.svg"}
              imgthere={"feature/club/siteweb.svg"}
              content={[
                {
                  title: "Gérez des joueur et des entraîneurs",
                  description: "Suivez les performances de vos joueurs et le travail de vos entraîneurs en quelques clics."
                },
                {
                  title: "Gérez des groupes et du calendrier",
                  description: "Vous pouvez facilement suivre toutes les planifications et l'historique de vos groupes ainsi que le planning de vos salles/terrains."
                },
                {
                  title: "Personnalisez votre site web",
                  description: "Vous pouvez personnaliser votre site Web avec votre propre logo, images et texte afin que les intéressés puissent vous contacter à partir du site Web."
                },
              ]}

            />
          </div>

          <div className={`${globalCss.isporit_max_width} ${css.join} `}>
            <Join link={routes.CONTACT_US.clubPath} buttontwo="Contactez notre service commercial" classbutton={css.buttondisplay} />
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