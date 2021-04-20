/* eslint-disable react/jsx-filename-extension */
import getConfig from 'next/config'
import Head from 'next/head'
import '../shared/css/login.scss'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { isEmpty, isNumber } from 'lodash'
import { useRouter } from 'next/router'
import Axios from 'axios'
import Layout from '../shared/components/layout/Layout'

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}
const { publicRuntimeConfig } = getConfig()

const ForgotPassword = (props) => {
  const router = useRouter()
  const [email, setEmail] = useState(
    router.query.email ? router.query.email : '',
  )
  const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
  const [localErrors, setLocalErrors] = useState({
    wrongEmailOrPassword: false,
    verifyYourAccount: router.query.verifyEmail === 'true' || false,
  })

  const {
    redirectTo = publicRuntimeConfig.LOGIN_REDIRECT_URL,
    env = 'prod',
  } = router.query
  const apiUrl = publicRuntimeConfig[`${env.toUpperCase()}_API_URL`]
  const forgotPasswordApiUrl = `${apiUrl}/auth/forgotPassword`

  if (!apiUrl) {
    console.error('Missing API URL for this environment')
  }

  const onSend = async (e) => {
    e.preventDefault()
    if (isEmpty(email) || !validateEmail(email)) {
      return setLocalErrors({ ...localErrors, inputErrors: true })
    }

    try {
      await Axios.get(`${forgotPasswordApiUrl}?email=${email}`)

      window.location.href = `/login`
    } catch (error) {
      if (error.response && error.response.data.message === 'userDoesntExist') {
        setLocalErrors({ userDoesntExist: true })
      }
    }
  }

  return (
    <div className="html">
      <Head>
        <title>Mot de passe oublié</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Sporit connection" />
        <meta
          name="keywords"
          content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644"
        />
        <meta name="author" content="sporit" />
      </Head>
      <Layout>
        <div className="login_container">
          <form className="left_side">
            <div className="logo">
              <Link href={{ pathname: '/' }}>
                <a>
                  <img src="icon/logoindexpage.png" alt="" />
                </a>
              </Link>
            </div>
            <h1 className="page_title">Mot de passe oublié</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="isporit-input"
              placeholder="Email"
              type="email"
            />
            <center>
              <b>
                <Link href={{ pathname: '/login' }}>
                  <a style={{ color: '#26beb5' }}>Se Connecter</a>
                </Link>
              </b>
            </center>
            {localErrors.inputErrors && isEmpty(email) && (
              <span className="error">Champ obligatoire</span>
            )}
            {localErrors.inputErrors && !validateEmail(email) && (
              <span className="error">
                Cette adresse email n'est pas valide
              </span>
            )}
            {localErrors.userDoesntExist && (
              <span className="error">L'utilisateur n'existe pas</span>
            )}

            <div className="signup_btn_container">
              <button onClick={onSend} className="primary_button">
                Envoyer
              </button>
            </div>
          </form>

          <div
            style={{ backgroundImage: 'url(loginBgColor.svg)' }}
            className="right_side"
          >
            <h2 className="title">Rejoignez notre platforme</h2>

            <span className="description">
              Entrez vos information et débutez avec nous votre parcours
            </span>
            <Link href={{ pathname: '/login', query: router.query }}>
              <a>
                <button className="button" type="submit">
                  S'INSCRIRE
                </button>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}

ForgotPassword.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
  }
}

export default ForgotPassword
