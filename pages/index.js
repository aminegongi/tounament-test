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

const Index = (props) => {
  const [lang, setLang] = useState(undefined)
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])

  useEffect(() => {
    window.location.href = "/contact-us";
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