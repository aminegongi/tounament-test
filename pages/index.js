import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/home.scss'

import PlatformIntro from '../shared/components/PlatformIntro/PlatformIntro';
import TrustUs from '../shared/components/TrustUs/TrustUs';
import InterfacesExample from '../shared/components/InterfacesExample/InterfacesExample';
import Feature from '../shared/components/Feature/Feature';
import BecomePartner from '../shared/components/BecomePartner/BecomePartner';
import Title from '../shared/components/TitleSection/TitleSection';
import Demo from '../shared/components/DemoSection/DemoSection';
import Functionclub from '../shared/components/Functionclub/Functionclub';
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Collapse, Icon,Button } from 'antd';
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
      <div className={css.gerer_iluustateur}>
        <div className={css.gerer_equipe_img}>
          <div className={css.gerer_equipe_title}>
           <div> Gérez vos équipes </div>
           <div> sportives efficacement</div>
           <div> et simplement n'importe</div>
           <div> où vous soyez</div>
          </div>
          <div className={css.gerer_time_title}>
            <div>iSporit vous fera gagner du temps pour gérer la</div>
            <div>présence de vos groupes, l'organisation de vos</div>
            <div>calendriers, événements et plus encore.</div>
          </div>
          <button onClick={() => window.location.href = "/contact-us"} className={css.gerer_team}>
           
              Gérer mon équipe gratuitement

           
          </button>
          <div className={css.for_windows}>

             Pour Windows, Mac, Android et iOS
          </div>
        </div>
           <img alt="image" className={css.img_illustration} src={"icon/illustration.png"} alt="" />

      </div>
      <div className={css.clubs}>
         5 clubs partenaires nous font confiance
      </div>
      <div className={css.img_club}>
        <img alt="image" className={css.hubspot} src={"icon/hubspot.png"} alt="" />
        <img alt="image" className={css.servicetitan} src={"icon/servicetitan.png"} alt="" />
        <img alt="image" className={css.Grubhub} src={"icon/square.png"} alt="" />
        <img alt="image" className={css.cognizant} src={"icon/cognizant.png"} alt="" />
        <img alt="image" className={css.square} src={"icon/square.png"} alt="" />

      </div>
     <Title title="Regagnez votre temps à nouveau"
       sub_title="Gérer les plannings et les absences avec iSporit est plus efficace
        que de le faire 
                avec des tonnes de feuilles qui auront peu de traçabilité plus tard.
                "
/>
   
  <div className={css.presenter_winner}>
     <div className={css.presenter_block}>
        <Demo img={"icon/montre.png"} title="Gagnez plus" 
              title_two="de 10h par semaine" 
              sub_title="Notre plateforme vous offrira des outils puissants"
              sub_title_two=" et simples qui vous permettront non seulement de"
              sub_title_there="gérer parfaitement vos plannings et collaborateurs"
              sub_title_four=" mais aussi de gagner du temps."
        />
        <img alt="image" className={css.Image_gagnant} src={"icon/Image_gagnant.png"} alt="" />

        </div>
   </div>
   
   
   
      <div className={css.revenus_gagnant}>
        <div className={css.presenter_block}>
            <img alt="image" className={css.img_platforme} src={"icon/img_platforme.png"} alt="" />
            <Demo img={"icon/flech.png"} 
              title="Accroissez" 
              title_two="vos revenus" 
              sub_title="Votre club gagnera en visibilité auprès d'une grande"
              sub_title_two="communauté de joueurs inscrits dans la plateforme et"
              sub_title_there="améliorera son image de marque grâce aux consignes"
              sub_title_four=" de notre équipe experte en digital."
            />

        </div>
        </div>
         <Title title="  Les meilleures fonctionnalités" 
         title_two=" pour révolutionner la gestion de votre club"
         sub_title=" Boostez la carrière de vos joueurs et suivez leurs parcours sportif
        dès leur première 
       inscription dans votre organisation."
         />
  
      
     <div className={css.gestion_club}>
      
      <div className={css.system_performance}>
        <div className={css.system}>
        
               <Functionclub  
                img={"icon/system.png"}
                title="Système de communication" 
                sub_title="Grâce aux alertes mobile et messages"
                sub_title_two="entre joueurs/entraîneurs/clubs,"
               sub_title_there="communiquez en toute efficacité !"
               />
        </div>
       
        <div className={css.system_performance}>
              <Functionclub  
              className={css.system_mobile}
                img={"icon/mobile.png"}
                title="SMulti-accessibilité" 
                sub_title="Vous aurez un accès à la plateforme"
                sub_title_two="où que vous soyez avec votre"
               sub_title_there="ordinateur, tablette et smartphone. "
               />
     
        <button onClick={() => window.location.href = "/contact-us"} className={css.gerer_team}>
                Demander une démo
        </button>
        </div>
      </div>
      
    
      <div className={css.system_performance}>
              <Functionclub  
                img={"icon/performance.png"}
                title="Performance et statistiques" 
                sub_title=" Ceux-ci aident les entraîneurs et joueurs"
                sub_title_two="à analyser les matchs mais aussi de"
               sub_title_there="mieux comprendre leurs forces et "
               sub_title_four=" faiblesses."
               />
     

    
        <div className={css.system_performance}>
        <Functionclub  
                className={css.system_gestion}

                img={"icon/gestion.png"}
                title="Gestion du staff et groupes" 
                sub_title="Organisez vos joueurs, entraîneurs et"
                sub_title_two="groupes en gérant la présence et"
               sub_title_there="l'historique, la planification des tâches "
               sub_title_four="et des programmes à réaliser."
               />
        

        </div>
      
      </div>

      <img alt="image" className={css.performance_img} src={"icon/gestion_club.png"} alt="" />

     </div>
     
     <Title title=" Questions souvent posées"
       sub_title="Vous trouverez ci-dessous les questions auxquelles nous avons 
       fait face plusieurs "
       sub_title_two="fois et les réponses nécessaires"
/>



     <Collapse
     className={css.collapseStyle}
     expandIconPosition="right"
    
    bordered={false}
    defaultActiveKey={['1']}

    expandIcon={({ isActive }) => <Icon type= {isActive ?
      ("minus-circle" )
    : "plus-circle" } theme="twoTone"  /> }        
  >
    <Panel header="Comment s'inscrire sur iSporit ?" className={css.customPanelStyletext} key="1" style={customPanelStyle}>
    <div className={css.customPaneltwo}>
    <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</div>
    <div>sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</div>
     <div>sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</div>
     <div> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
     <div>  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, </div>
    <div>  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</div>
    <div>   sed diam voluptua. At vero eos et accusam et.</div>
    </div>
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




<div className={css.join}>
     <div className={css.join_community}>
        Rejoignez notre communauté <br />
        et faîtes partie des meilleurs
     </div>
     <div className={css.join_button}>
        <button onClick={() => window.location.href = "/contact-us"} className={css.buttom_connexion}>
          Connexion
        </button>
        <button onClick={() => window.location.href = "/contact-us"} className={css.button_commercial}>
          Contactez notre service commercial
        </button>
      </div>
</div>
      {/* {
        lang && <Layout loggedIn={props.loggedIn}> */}
          {/* <PlatformIntro
            title={props.t("homePagePlatformIntroTitle", "Book your tennis court for free!")}
            description={props.t("homePagePlatformIntroDescription", "Accessing the best courts has never been easier.")}
            bookCourt={props.t("homePagePlatformIntroBookCourt", "Book Court")}
            clubArea={props.t("homePagePlatformIntroClubArea", "Club Area")}
          /> */}
          {/* <TrustUs title={props.t("homePageTrustUsTitle", "clubs that trust us")} /> */}
          {/* <InterfacesExample
            title={props.t("homePageInterfacesExampleTitle", "A platform dedicated to players, Coaches and clubs")}
            description={props.t("homePageInterfacesExampleDescription", "Organize your matches, manage your sports club and follow your performances.")}
            button={props.t("homePageInterfacesExampleButton", "Functionalities")}
          />
          <Feature
            title={props.t("homePageFeatureTitle", "Discover your latest performances.")}
            description={props.t("homePageFeatureDescription", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reicabo.")}
            button={props.t("homePageFeatureButton", "Join Us")}
          />
          <BecomePartner
            title={props.t("homePagePartnerTitle", "Do you have a court? Join us!")}
            description={props.t("homePagePartnerDescription", "Already using iSporit? Login")}
            button={props.t("homePagePartnerButton", "become partner")}
          /> */}
          
        {/* </Layout>
      } */}
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