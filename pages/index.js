import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/home.scss'
import PlatformIntro from '../shared/components/PlatformIntro/PlatformIntro';
import TrustUs from '../shared/components/TrustUs/TrustUs';
import InterfacesExample from '../shared/components/InterfacesExample/InterfacesExample';
import Feature from '../shared/components/Feature/Feature';
import BecomePartner from '../shared/components/BecomePartner/BecomePartner';
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import cookies from 'next-cookies'
import contactUs from './contact-us';
import illustration from './icon/illustration.png';
import cognizant from './icon/cognizant.png';
import Grubhub from './icon/Grubhub.png';
import hubspot from './icon/hubspot.png';
import square from './icon/square.png';
import servicetitan from './icon/servicetitan.png';
import montre from './icon/montre.png';
import Image_gagnant from './icon/Image_gagnant.png';
import flech from './icon/flech.png';
import img_platforme from './icon/img_platforme.png';
import system from './icon/system.png';
import mobile from './icon/mobile.png';
import gestion from './icon/gestion.png';
import performance from './icon/performance.png';
import gestion_club from './icon/gestion_club.png';
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
            Gérez vos équipes <br />
            sportives efficacement<br />
            et simplement n'importe<br />
            où vous soyez
          </div>
          <div className={css.ispoit_gagne_text}>
            iSporit vous fera gagner du temps pour gérer la <br />
            présence de vos groupes, l'organisation de vos <br />
            calendriers, événements et plus encore.
          </div>
          <button className={css.gerer_button}>
            {/* 
              @review dont use span in button when you have only one to text to display 
            */}
            <span className={css.gerer_equipe}>
              Gérer mon équipe gratuitement

            </span>
          </button>
          <div className={css.for_windows}>

             Pour Windows, Mac, Android et iOS
          </div>
        </div>
           <img className={css.img_illustration} src={illustration} alt="" />

      </div>
      <div className={css.clubs}>
         5 clubs partenaires nous font confiance
      </div>
      <div className={css.img_club}>
        <img className={css.hubspot} src={hubspot} alt="" />
        <img className={css.servicetitan} src={servicetitan} alt="" />
        <img className={css.Grubhub} src={Grubhub} alt="" />
        <img className={css.cognizant} src={cognizant} alt="" />
        <img className={css.square} src={square} alt="" />

      </div>
     <div className={css.regagnez_temps} >
        Regagnez votre temps à nouveau
     </div>
     <div className={css.plannings}>
         Gérer les plannings et les absences avec iSporit est plus efficace que de
         le faire <br/> 
         avec des tonnes de feuilles qui auront peu de traçabilité plus tard.
       
     </div>
   
     <div className={css.gagnant_block}>
        <div className={css.gagnant_semaine}>
          <img src={montre} className={css.montre}></img>
        <div className={css.gagnant_plus_text} >
          Gagnez plus<br/>
          de 10h par semaine
        </div>
        <div className={css.gagnant_plateforme}>
          Notre plateforme vous offrira des outils puissants <br/>
          et simples qui vous permettront non seulement de<br/>
          gérer parfaitement vos plannings et collaborateurs,<br/>
          mais aussi de gagner du temps.
        </div>
        <button className={css.gerer_button}>
            <span className={css.gerer_equipe}>
            Demander une démo
            </span>
        </button>
        </div>
        <img className={css.Image_gagnant} src={Image_gagnant} alt="" />
     </div>

     <div className={css.gagnant_Accroissez}>
      <img className={css.img_platforme} src={img_platforme} alt="" />
        <div className={css.accroissez}>
          <img className={css.flech} src={flech} alt="" />
          <div className={css.accroissez_revenus}>
            Accroissez<br/>
            vos revenus
          </div>
          <div className={css.accroissez_gagnera_visiblite}>
          Votre club gagnera en visibilité auprès d'une grande <br/>
          communauté de joueurs inscrits dans la plateforme et<br/>
          améliorera son image de marque grâce aux consignes <br/>
          de notre équipe experte en digital.
          </div>
           <button className={css.gerer_button}>
                <span className={css.gerer_equipe}>
                Demander une démo
                </span>
            </button> 
        </div>
     
     </div>

      <div className={css.meilleurs_fonctionnalite}>
          Les meilleures fonctionnalités<br/>
          pour révolutionner la gestion de votre club
      </div> 
    
     <div className={css.carrere_joueurs}>
     Boostez la carrière de vos joueurs et suivez leurs parcours sportif dès leur première  <br/>
     inscription dans votre organisation.
     </div>

     <div className={css.gestion_club}>
      
      <div className={css.system_performance}>
        <div className={css.system}>
           <img className={css.system_img} src={system} alt="" />
            <div className={css.gestion_club_title}> 
               Système de communication
            </div>
            <div className={css.gestion_club_text}>
               Grâce aux alertes mobile et messages <br/>
               entre joueurs/entraîneurs/clubs,<br/>
               communiquez en toute efficacité !</div>

        </div>
        <div className={css.performance__mobile}>
           <img className={css.system_img} src={mobile} alt="" />
            <div className={css.gestion_club_title}> 
               Multi-accessibilité
            </div>
            <div className={css.gestion_club_text}>
              Vous aurez un accès à la plateforme<br/>
              où que vous soyez avec votre<br/>
              ordinateur, tablette et smartphone. 
              
              </div>
        <button className={css.gerer_equipe}>
            <span className={css.gerer_equipe}>
                Demander une démo
            </span>
        </button>
        </div>
      </div>
      

      <div className={css.system_performance}>
        
      <div className={css.performance}>
           <img className={css.performance_img} src={performance} alt="" />
            <div className={css.gestion_club_title}> 
            Performance et statistiques
            </div>
            <div className={css.gestion_club_text}>
            Ceux-ci aident les entraîneurs et joueurs<br/>
             à analyser les matchs mais aussi de<br/>
              mieux comprendre leurs forces et<br/>
               faiblesses.
            </div>

        </div>

    
        <div className={css.performance_gestion_mobile}>
           <img className={css.performance_img} src={gestion} alt="" />
            <div className={css.gestion_club_title}> 
                 Gestion du staff et groupes
            </div>
            <div className={css.gestion_club_text}>
                Organisez vos joueurs, entraîneurs et<br/>
                groupes en gérant la présence et <br/>
                l'historique, la planification des tâches<br/>
                  et des programmes à réaliser. 
            </div>

        </div>
      
      </div>

      <img className={css.performance_img} src={gestion_club} alt="" />

     </div>
     
     <div className={css.question_souvent_posee}>
        Questions souvent posées
     </div>
     <div className={css.question_reponsese_necessaires}>
     Vous trouverez ci-dessous les questions auxquelles nous avons 
     fait face plusieurs<br/>
      fois et les réponses nécessaires
     </div>
     {/* <Button></Button> */}

     <Collapse
    bordered={false}
    defaultActiveKey={['1']}
    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
  >
    <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
      <p>{text}</p>
    </Panel>
  </Collapse> 
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
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