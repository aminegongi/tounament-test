import React, { useEffect, useState, Fragment } from 'react'
import App from 'next/app'
import { appWithTranslation } from '../i18n'
import { initGA, logPageView } from '../utils/analytics';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Axios from 'axios';
import { hotjar } from 'react-hotjar';


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  
  useEffect(() => {
    
    // if ('serviceWorker' in navigator) {
      
    //   navigator.serviceWorker
    //   .register('/service-worker.js')
    //   .then(registration => {
    //     console.log('service worker registration successful')
    //   })
    //   .catch(err => {
    //     console.warn('service worker registration failed', err.message)
    //   })
      
    // }

    hotjar.initialize(1813801, 6);


    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])
  
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [router.query])
  
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
}

MyApp.getInitialProps = async function(appContext) {
  // console.log('appContext: ', appContext);
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps }
};

export default appWithTranslation(MyApp)