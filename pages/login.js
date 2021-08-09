/* eslint-disable react/jsx-filename-extension */
import getConfig from 'next/config'
import Head from 'next/head'
import '../shared/css/login.scss'
import React, { useState } from 'react'
import Link from 'next/link'
import { isEmpty, isNumber } from 'lodash'
import { useRouter } from 'next/router'
import Axios from 'axios'
import { Icon, Input } from 'antd'
import Layout from '../shared/components/layout/Layout'
import routes from '../utils/routes'

const { publicRuntimeConfig } = getConfig()

const Login = (props) => {
  const router = useRouter()
  const [email, setEmail] = useState(
    router.query.email ? router.query.email : '',
  )

  const [showPassword, setShowPassword] = useState(false)

  const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
  const [password, setPassword] = useState('')
  const [localErrors, setLocalErrors] = useState({
    wrongEmailOrPassword: false,
    verifyYourAccount: router.query.verifyEmail === 'true' || false,
  })

  const {
    redirectTo = publicRuntimeConfig.LOGIN_REDIRECT_URL,
    env = 'prod',
  } = router.query
  const apiUrl = publicRuntimeConfig[`${env.toUpperCase()}_API_URL`]
  const loginApiUrl = `${apiUrl}/auth/login`

  if (!apiUrl) {
    console.error('Missing API URL for this environment')
  }

  const onLogin = async (e) => {
    e.preventDefault()
    if (isEmpty(email) || isEmpty(password)) {
      return setLocalErrors({ ...localErrors, inputErrors: true })
    }

    try {
      const result = await Axios.post(loginApiUrl, {
        email,
        password,
      })
      localStorage.setItem('token', result.data.token)
      window.location.href = `${redirectTo}?accessToken=${result.data.token}&env=${env}`
    } catch (error) {
      if (
        error.response &&
        error.response.data.message ===
          'accountIsNotConfirmedPleaseConfirmYourAccount'
      ) {
        setLocalErrors({ verifyYourAccount: true, wrongEmailOrPassword: false })
      }
      if (
        error.response &&
        error.response.data.message === 'wrongEmailOrPassword'
      ) {
        setLocalErrors({ wrongEmailOrPassword: true, verifyYourAccount: false })
      }
    }
  }

  return (
    <div className="html">
      <Head>
        <title>Login</title>

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
          <form onSubmit={onLogin} className="left_side">
            <h1 className="page_title">Connectez-vous</h1>
            <input
              value={email}
              maxLength={40}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
              className="isporit-input"
              required
            />
            {localErrors.inputErrors && isEmpty(email) && (
              <span className="error">Champ obligatoire</span>
            )}

            <div className="isporit-password-input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe "
                value={password}
                name="password"
                className="isporit-input"
                required
              />
              <Icon
                type={showPassword ? 'eye' : 'eye-invisible'}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <center className="forgot_password">
              <Link href={{ pathname: '/forgot-password' }}>
                <a style={{ color: '#26beb5' }}>Mot de passe oublié?</a>
              </Link>
            </center>
            {localErrors.inputErrors && isEmpty(password) && (
              <span className="error">Champ obligatoire</span>
            )}
            <div className="error">
              {localErrors.verifyYourAccount &&
                "Compte n'est pas vérifié, Veuillez confirmer votre inscription par email"}
              {localErrors.wrongEmailOrPassword &&
                'E-mail ou mot de passe incorrect'}
            </div>
            <div className="signup_btn_container">
              <button type="submit" className="primary_button">
                Se Connecter
              </button>
            </div>
            <div className="create_account_btn">
              <Link
                href={{ pathname: routes.SIGN_UP.path, query: router.query }}
              >
                <a>
                  <button className="button" type="submit">
                    Créer un compte
                  </button>
                </a>
              </Link>
            </div>
          </form>

          <div
            style={{ backgroundImage: 'url(loginBgColor.svg)' }}
            className="right_side"
          >
            <h2 className="title">Rejoignez notre platforme</h2>

            <span className="description">
              Entrez vos informations et débutez avec nous votre parcours
            </span>
            <Link href={{ pathname: routes.SIGN_UP.path, query: router.query }}>
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

Login.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
  }
}

export default Login
