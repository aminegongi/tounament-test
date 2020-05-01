import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/club.scss'

import Clublogo from '../shared/components/clublogo/Clublogo'

import Title from '../shared/components/TitleSection/TitleSection';
import Demo from '../shared/components/DemoSection/DemoSection';
import Navbar from '../shared/components/navbar/Navbar';
import Postplatforme from '../shared/components/postplatforme/Postplatforme';
import Tab from '../shared/components/tab/Tab';
import FooterIndexPage from '../shared/components/footerIndexPage/footerIndexPage';
import { i18n, withTranslation } from '../i18n'
import Join from '../shared/components/joinplatforme/Join';
import globalCss from '../shared/global-style.scss'

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Collapse, Icon, Button } from 'antd';




const Index = (props) => {
  const [lang, setLang] = useState(undefined)
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])


  return (
    <div className={css.home_page}>
      <Head>
        <title>{props.t("homePageTitle", "Home")}</title>
        <link rel="icon" href="/logo.png" />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Sporit Home page " />
        <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
        <meta name="author" content="sporit" />

      </Head>
      <Layout>
        <div className={css.postplatforme}>
          <Postplatforme
            img={"icon/for_club.png"}
            title="Centralisez tous les données de vos équipes dans le même emplacement"
            sub_title="iSporit n'est pas seulement un outil de gestion d'effectif, mais aussi un espace de travail qui permet de centraliser les équipes, les programmes et les contenus."
            buttonone="Gérer mon équipe gratuitement"
            backgroundbutton={"#26beb5"}
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
                  description="Notre plateforme vous donne désormais la possibilité de suivre les dernières nouvelles grâce aux alertes mobile et messages entre joueurs/entraîneurs/clubs, communiquez en toute transparence et efficacité !"
                />
              </div>
              <img style={{ width: "100%" }} alt="image" className={css.Image_gagnant} src={"icon/club.svg"} alt="" />

            </div>
          </div>

          <Title title="Boostez la gestion de votre club"
            sub_title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor"
            sub_title_two="invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero"
          />
          <div className={`${css.tab} ${globalCss.isporit_max_width}`}>
            <Tab
              bgcolor={'#E3F7F6'}
              imgone={"icon/clubseance.png"}
              imgtwo={"icon/gestion_club.png"}
              imgthere={"icon/clubseance.png"}
              content={[
                {
                  title: "Organisez votre planning annuel",
                  description: "Gérez la disponibilité des terrains de votre club grâce à l'outil de gestion d'événement que la plateforme dédie et gagnez du temps."
                },
                {
                  title: "Examinez les programmes des séances",
                  description: "Gérez la disponibilité des terrains de votre club grâce à l'outil de gestion d'événement que la plateforme dédie et gagnez du temps."
                },
                {
                  title: "Contactez les parents et les joueurs",
                  description: "Gérez la disponibilité des terrains de votre club grâce à l'outil de gestion d'événement que la plateforme dédie et gagnez du temps."
                },
              ]}

            />
          </div>

          <div className={`${css.join} ${globalCss.isporit_max_width}`}>
            <Join buttontwo="Contactez notre service commercial" classbutton={css.buttondisplay} />
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