import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/club.scss'
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
import Postplatforme from '../shared/components/Postplatforme/Postplatforme';
import Tab from '../shared/components/Tab/Tab';
import FooterIndexPage from '../shared/components/footerIndexPage/footerIndexPage';
import performance from '../public/icon/performance.png'
import { i18n, withTranslation } from '../i18n'
import Join from '../shared/components/joinplatforme/Join';

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Collapse, Icon,Button } from 'antd';




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
      <Navbar logo= {"icon/logoindexpage.png"} 
       navmenu1="La plateforme"
       icon="down"
       navmenu2="Clubs partenaires" 
       navmenu3="Chercher un joueur" 
       navmenu4="Contact"
       buttonone="connexion"
       buttontwo="S'inscrire gratuitement"
       />
<div className={css.postplatforme}>
     <Postplatforme 
     img={"icon/for_club.png"}
     title="Suivez votre club"
     title_two="depuis votre canapé"
     sub_title="Notre plateforme vous donne désormais la"
     sub_title_two=" possibilité de suivre les dernières nouvelles grâce"
     sub_title_three="aux alertes mobile et messages entre joueurs/"
     sub_title_four="entraîneurs/clubs, communiquez en toute"
     sub_title_five="transparence et efficacité !"
     buttonone="Gérer mon équipe gratuitement"
     backgroundbutton={"#26beb5"}
    />
        </div>
<div className={css.iteamlistblock}>
     <Clublogo  
          iconone="icon/hubspot.png"
          icontwo="icon/servicetitan.png"
          iconthree="icon/square.png"
          iconfour="icon/cognizant.png"
          iconfive="icon/square.png"

      />


  <div className={css.presenter_winner}>
     <div className={css.presenter_block}>
        <Demo img={"icon/suivi_club.png"} title="Gagnez plus" 
              title_two="de 10h par semaine" 
              sub_title="Notre plateforme vous offrira des outils puissants"
              sub_title_two=" et simples qui vous permettront non seulement de"
              sub_title_there="gérer parfaitement vos plannings et collaborateurs"
              sub_title_four=" mais aussi de gagner du temps."
        />
        <img alt="image" className={css.Image_gagnant} src={"icon/club.svg"} alt="" />

        </div>
    </div>

    <Title title="Boostez la gestion de votre club"
       sub_title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor"
       sub_title_two="invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero"
    />
    <div className={css.tab}>
       <Tab
       bgcolor={'#E3F7F6'}
       imgone={"icon/clubseance.png"} 
       imgtwo={"icon/gestion_club.png"}
       imgthere={"icon/clubseance.png"} 

       title="Organisez votre planning annuel"
       sub_title="Gérez la disponibilité des terrains de votre club"
       sub_title_two="grâce à l'outil de gestion d'événement que la"
       sub_title_there="plateforme dédie et gagnez du temps."
       title_two="Examinez les programmes des séances"
       sub_title_four="Lorem ipsum dolor sit amet, consetetur sadipscing"
       sub_title_five="elitr, sed diam nonumy eirmod tempor invidunt ut"
       sub_title_six="labore et dolore magna aliquyam erat, sed diam"
       title_three="Contactez les parents et les joueurs"
       sub_title_seven="Lorem ipsum dolor sit amet, consetetur sadipscing"
       sub_title_eight="elitr, sed diam nonumy eirmod tempor invidunt ut"
       sub_title_nine="labore et dolore magna aliquyam erat, sed diam"
       />
    </div>

    <div className={css.join}>
  <Join buttonone="S'inscrire gratuitement"classbutton={css.buttondisplay} />
</div>
      <div className={css.footer}>
        <FooterIndexPage 
        logo= {"icon/logoindexpage.png"} 
        navmenu1="La plateforme"
        navmenu2="Clubs partenaires" 
        navmenu3="Chercher un joueur" 
        navmenu4="Contact"
        navmenu5="connexion"

        buttontwo="Devenez partenaire"

        />
       </div>
<div className={css.copyright}>
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