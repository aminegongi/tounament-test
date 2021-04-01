/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, Fragment } from 'react'
import App from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Axios from 'axios'
import moment from 'moment'
import { MOMENT_FRENCH_I18N } from '../utils/moment.utils'

import { hotjar } from 'react-hotjar'
import { message } from 'antd'
import AuthContext from '../utils/context.utils'
import { initGA, logPageView } from '../utils/analytics'
import { appWithTranslation } from '../i18n'
import '../shared/global-style.scss'
import {
  fetchUserProfile,
  signIn,
  signUp,
  createClub,
} from '../shared/services/auth.service'
import { CLUB, REQUEST_FAILED, REQUEST_SUCCEEDED } from '../shared/constants'
import LoginModal from '../shared/components/LoginModal/LoginModal'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const [isSignUpModal, setIsSignUpModal] = useState(false)

  const [userProfile, setUserProfile] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState()
  const [role, setRole] = useState()

  const [fetchUserProfileLoading, setFetchUserProfileLoading] = useState()
  const [loginLoading, setLoginLoading] = useState(false)
  const [callbackAfterLogin, setCallbackAfterLogin] = useState(() => {})

  const fetchProfile = async () => {
    const result = await fetchUserProfile(setFetchUserProfileLoading)
    if (result.type === REQUEST_SUCCEEDED) {
      setUserProfile(result.data.user)
      setUserType(result.data.user.userType)
      setIsLoggedIn(true)
    }
  }
  useEffect(() => {
    moment.locale('fr', MOMENT_FRENCH_I18N)
  }, [])
  useEffect(() => {
    setIsLoginModalOpen(false)

  }, [pathname])
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
    fetchProfile()
    hotjar.initialize(1813801, 6)

    if (window.location.href.includes('isporit.com')) {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  }, [])

  useEffect(() => {
    if (window.location.href.includes('isporit.com')) {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  }, [router.query])

  const toggleLogInModal = (cbAfterLogin = () => {}, isSignUp = false, role) => {
    setCallbackAfterLogin(cbAfterLogin)
    if(role){
      setRole(role)
    }
    setIsLoginModalOpen(true)
    setIsSignUpModal(isSignUp)
  }

  const onLogin = async (values) => {
    const signInResult = await signIn(values, setLoginLoading)
    if (signInResult.type === REQUEST_SUCCEEDED) {
      setUserType(signInResult.data.user.userType)
      setUserProfile(signInResult.data.user)
      setIsLoggedIn(true)
      setIsLoginModalOpen(false)

      localStorage.setItem('token', signInResult.data.token)
      if (typeof callbackAfterLogin === 'function') {
        callbackAfterLogin()
      }
      return signInResult.data
    }
    if (signInResult.type === REQUEST_FAILED) {
      return message.error("L'adresse e-mail ou le mot de passe est incorrect!")
    }
  }

  const onCreateClub = async (values, clubData) => {
    const signUpResult = await createClub(clubData, setLoginLoading)
    if (signUpResult.type === REQUEST_SUCCEEDED) {
      // onLogin(values)
    }
    if (signUpResult.type === REQUEST_FAILED) {
      if (
        signUpResult.data.errors &&
        signUpResult.data.errors.email &&
        signUpResult.data.errors.email.message === 'emailAlreadyExists'
      ) {
        message.error("l'email existe déjà!")
      }
    }
  }

  const onSignUp = async (values, clubData) => {
    const signUpResult = await signUp(values, setLoginLoading)
    if (signUpResult.type === REQUEST_SUCCEEDED) {
      const loginResult = await onLogin(values)
      if (values.userType === CLUB) {
        return onCreateClub({ ...clubData, token: loginResult.token }, clubData)
      }
    }
    if (signUpResult.type === REQUEST_FAILED) {
      if (
        signUpResult.data.errors &&
        signUpResult.data.errors.email &&
        signUpResult.data.errors.email.message === 'emailAlreadyExists'
      ) {
        return message.error("l'email existe déjà!")
      }
    }
    return ''
  }

  const logOut = () => {
    setUserType()
    setUserProfile({})
    setIsLoggedIn(false)
    localStorage.setItem('token', '')
  }

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        isLoggedIn,
        userType,
        fetchUserProfileLoading,
        toggleLogInModal,
        logOut,
      }}
    >
      <Component isLoggedIn={isLoggedIn} {...pageProps} />

      <LoginModal
        isSignUpModal={isSignUpModal}
        loading={loginLoading}
        onLogin={onLogin}
        onSignUp={onSignUp}
        role={role}
        isVisible={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
      />
    </AuthContext.Provider>
  )
}

MyApp.getInitialProps = async function (appContext) {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default appWithTranslation(MyApp)
