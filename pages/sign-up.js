/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */
import getConfig from 'next/config'
import Head from 'next/head'
import '../shared/css/login.scss'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import Axios from 'axios'
import { Icon, Modal, Radio } from 'antd'
import randomId from 'random-id'
import { useMediaPredicate } from 'react-media-hook'
import Layout from '../shared/components/layout/Layout'
import routes from '../utils/routes'
import { CLIENT_SIDE_API_BASE_URL } from '../shared/constants'

const { publicRuntimeConfig } = getConfig()

const MAX_USERNAME_LENGTH = 60

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

// function validateUsername(string) {
//   const re = /^[a-z][a-z\-0-9]+[a-z0-9]$/i
//   return re.test(string)
// }

function validatePhoneNumber(string) {
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
  return re.test(string)
}

function removeSpaceInString(string) {
  return string.replace(/\s/g, '')
}

const SignUp = () => {
  const router = useRouter()
  const [data, setData] = useState({
    username:
      router.query.firstName && router.query.lastName
        ? removeSpaceInString(
            `${router.query.firstName}${router.query.lastName}`,
          ).slice(0, 10) +
          randomId(
            MAX_USERNAME_LENGTH -
              `${router.query.firstName}${router.query.lastName}`.slice(0, 10)
                .length,
            'aA0',
          )
        : '',
    firstName: router.query.firstName || '',
    lastName: router.query.lastName || '',
    email: router.query.email || '',
    birthday: '',
    password: '',
    confirmPassword: '',
    address: '',
    userType: 'player',
    sport: [],
    country: 'Tunisia',
    timezone: 'Africa/Tunis',
    phoneNumber: router.query.phoneNumber || '',
    facebookLink: '',
    gender: 'M',
    locale: 'fr',
  })

  const [showPassword, setShowPassword] = useState({
    password1: false,
    password2: false,
  })

  const [localErrors, setLocalErrors] = useState({
    usernameAlreadyExists: false,
    inputErrors: false,
    emailAlreadyExists: false,
  })

  const isSizeUnder360 = useMediaPredicate('(max-width: 360px)')

  const {
    redirectTo = publicRuntimeConfig.LOGIN_REDIRECT_URL,
    env = 'prod',
  } = router.query
  const apiUrl = publicRuntimeConfig[`${env.toUpperCase()}_API_URL`]
  const registerApiUrl = `${apiUrl}/auth/register`

  const loginApiUrl = `${apiUrl}/auth/login`

  const onLogin = async () => {
    try {
      const result = await Axios.post(loginApiUrl, {
        email: data.email,
        password: data.password,
      })
      localStorage.setItem('token', result.data.token)
      window.location.href = `${redirectTo}?accessToken=${result.data.token}`
    } catch (error) {
      router.push({
        pathname: '/login',
        query: {
          ...router.query,
          email: data.email,
          verifyEmail: true,
        },
      })
    }
  }

  const onRegister = async (e) => {
    e.preventDefault()

    if (
      isEmpty(data.firstName) ||
      isEmpty(data.lastName) ||
      isEmpty(data.email) ||
      !validateEmail(data.email) ||
      isEmpty(data.password) ||
      isEmpty(data.confirmPassword) ||
      !validatePhoneNumber(data.phoneNumber) ||
      data.phoneNumber.length < 7 ||
      data.password !== data.confirmPassword
    ) {
      return setLocalErrors({ ...localErrors, inputErrors: true })
    }
    try {
      let result = {}
      let query = ''
      if (router.query.invitationToken) {
        query = `invitationToken=${router.query.invitationToken}`
      }
      result = await Axios.post(`${registerApiUrl}?${query}`, {
        ...data,
        username:
          data.firstName && data.lastName
            ? removeSpaceInString(`${data.firstName}${data.lastName}`).slice(
                0,
                10,
              ) +
              randomId(
                MAX_USERNAME_LENGTH -
                  `${data.firstName}${data.lastName}`.slice(0, 10).length,
                'aA0',
              )
            : '',
      })

      if (result.data.message === 'invalidInvitation') {
        return Modal.success({
          content:
            'Bienvenue à iSporit, Veuillez confirmer votre inscription par email',
          onOk() {
            router.push({
              pathname: '/login',
              query: {
                ...router.query,
                email: data.email,
                verifyEmail: true,
              },
            })
          },
        })
      }
      return Modal.success({
        content: 'Félicitations et bienvenue à iSporit',
        onOk() {
          onLogin()
        },
      })
    } catch (error) {
      if (
        error.response &&
        error.response.data.errors &&
        error.response.data.errors.email &&
        error.response.data.errors.email.message === 'emailAlreadyExists'
      ) {
        setLocalErrors({
          ...localErrors,
          emailAlreadyExists: true,
          usernameAlreadyExists: false,
        })
      }
      if (
        error.response &&
        error.response.data.errors &&
        error.response.data.errors.username &&
        error.response.data.errors.username.message === 'usernameAlreadyExists'
      ) {
        setLocalErrors({
          ...localErrors,
          usernameAlreadyExists: true,
          emailAlreadyExists: false,
        })
      }
    }
    return ''
  }

  return (
    <div className="html">
      <Head>
        <title>Créer un compte</title>
        <link rel="icon" href="/logo.png" />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Sporit Home page " />
        <meta
          name="keywords"
          content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644"
        />
        <meta name="author" content="sporit" />
      </Head>
      <Layout>
        <div className="login_container">
          <div className="left_side">
            {/* <div className={"logo"}>
                            <Link href={{ pathname: '/' }} >
                                <a>
                                    <img src="icon/logoindexpage.png" alt="" />
                                </a>
                            </Link>
                        </div> */}
            <h1 className="page_title">Créer un compte</h1>

            {/* {
                            !router.query.invitationToken && <Select value={data.userType} onChange={e => setData({ ...data, userType: e })} className={"select_input"} name="" id="">
                                <Select.Option value="player">Joueur</Select.Option>
                                <Select.Option value="coach">Entraineur</Select.Option>
                                <Select.Option value="club">Directeur de club</Select.Option>
                            </Select>
                        } */}
            {!router.query.invitationToken && (
              <Radio.Group
                size={isSizeUnder360 ? 'small' : 'large'}
                defaultValue="club"
                value={data.userType}
                onChange={(e) => setData({ ...data, userType: e.target.value })}
                buttonStyle="solid"
              >
                <Radio.Button
                  className={data.userType === 'player' && 'radio_group_button'}
                  value="player"
                >
                  Adhérent/Joueur
                </Radio.Button>
                <Radio.Button
                  className={data.userType === 'coach' && 'radio_group_button'}
                  value="coach"
                >
                  Entraineur
                </Radio.Button>
                <Radio.Button
                  className={data.userType === 'club' && 'radio_group_button'}
                  value="club"
                >
                  Directeur de club
                </Radio.Button>
              </Radio.Group>
            )}

            {/* <Input maxLength={MAX_USERNAME_LENGTH} value={data.username} onChange={e => setData({ ...data, username: removeSpaceInString(e.target.value) })} className={"input"} placeholder="Nom d'utilisateur" type='text' />
                        {
                            localErrors.inputErrors && data.username.length < 6 && <span className={"error"}>Minimum 6 caractère</span>
                        }
                        {
                            localErrors.inputErrors && !validateUsername(data.username) && <span className={"error"}>Nom d'utilisateur n'est pas valide ( seuls les chiffres et lettres de l'alphabet sont autorisés )</span>
                        }
                        {
                            localErrors.inputErrors && !isNaN(data.username.charAt(0)) && <span className={"error"}>Le nom d'utilisateur doit commencer par une lettre alphabétique</span>
                        } */}

            {localErrors.usernameAlreadyExists && (
              <span className="error">Nom d'utilisateur existe déjà</span>
            )}

            <form onSubmit={onRegister}>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                placeholder="Prénom"
                name="firstName"
                className="isporit-input"
                maxLength={20}
                required
              />
              {localErrors.inputErrors && isEmpty(data.firstName) && (
                <span className="error">Champ obligatoire</span>
              )}
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                placeholder="Nom de famille"
                name="lastname"
                className="isporit-input"
                maxLength={20}
                required
              />
              {localErrors.inputErrors && isEmpty(data.lastName) && (
                <span className="error">Champ obligatoire</span>
              )}
              <input
                maxLength={70}
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
                name="email"
                className="isporit-input"
                disabled={!isEmpty(router.query.email)}
                required
              />
              {localErrors.inputErrors && isEmpty(data.email) && (
                <span className="error">Champ obligatoire</span>
              )}
              {localErrors.inputErrors && !validateEmail(data.email) && (
                <span className="error">
                  Cette adresse email n'est pas valide
                </span>
              )}
              {localErrors.emailAlreadyExists && (
                <span className="error">Email existe déjà</span>
              )}
              <div className="input-with-label">
                <label className="" htmlFor="gender">
                  Sexe
                </label>{' '}
                <select
                  name="gender"
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  className="isporit-input select_input"
                  id="gender"
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              <div className="input-with-label">
                <label className="" htmlFor="date">
                  Date de naissance
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    setData({ ...data, birthday: e.target.value })
                  }
                  id="date"
                  placeholder="Date de naissance "
                  value={data.birthday}
                  name="birthday"
                  className="isporit-input"
                />
              </div>
              <input
                type="number"
                maxLength={40}
                onChange={(e) =>
                  setData({ ...data, phoneNumber: e.target.value })
                }
                value={data.phoneNumber}
                placeholder="Numéro de télèphone"
                name="phoneNumber"
                className="isporit-input"
                required
              />
              {localErrors.inputErrors && isEmpty(data.phoneNumber) && (
                <span className="error">Champ obligatoire</span>
              )}
              {localErrors.inputErrors &&
                !validatePhoneNumber(data.phoneNumber) && (
                  <span className="error">
                    Numéro de téléphone n'est pas valide
                  </span>
                )}
              {localErrors.inputErrors && data.phoneNumber.length < 7 && (
                <span className="error">Au moins 8 numéros</span>
              )}
              <div className="isporit-password-input-with-icon">
                <input
                  type={showPassword.password1 ? 'text' : 'password'}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="Mot de passe "
                  value={data.password}
                  name="password"
                  className="isporit-input"
                  required
                />
                <Icon
                  type={showPassword.password1 ? 'eye' : 'eye-invisible'}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password1: !showPassword.password1,
                    })
                  }
                />
              </div>
              {localErrors.inputErrors && isEmpty(data.password) && (
                <span className="error">Champ obligatoire</span>
              )}
              <div className="isporit-password-input-with-icon">
                <input
                  type={showPassword.password2 ? 'text' : 'password'}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  placeholder="Confirmation mot de passe"
                  value={data.confirmPassword}
                  name="password"
                  className="isporit-input"
                  required
                />
                <Icon
                  type={showPassword.password2 ? 'eye' : 'eye-invisible'}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password2: !showPassword.password2,
                    })
                  }
                />
              </div>
              {localErrors.inputErrors && isEmpty(data.confirmPassword) && (
                <span className="error">Champ obligatoire</span>
              )}
              {localErrors.inputErrors &&
                data.password !== data.confirmPassword && (
                  <span className="error">
                    Deux mots de passe ne sont pas égaux
                  </span>
                )}
              {/* <div className="login_container__terms" style={{ marginTop: 20 }}>
                <input type="checkbox" /> En cochant cette case, j'accepte{' '}
                <Link href={routes.TERMS_AND_CONDITIONS.path}>
                  <a href={routes.TERMS_AND_CONDITIONS.path}>
                    <u>
                      les Conditions d’utilisation et Politique de
                      confidentialité
                    </u>
                  </a>
                </Link>{' '}
                de iSporit!
              </div> */}
              <div className="signup_btn_container">
                <button type="submit" className="primary_button">
                  S'INSCRIRE
                </button>
              </div>
              <div className="already_have_account">
                <Link href={routes.LOG_IN.path}>
                  Vous avez déjà un compte ?
                </Link>
              </div>
            </form>
          </div>

          <div
            style={{ backgroundImage: 'url(loginBgColor.svg)' }}
            className="right_side"
          >
            <h2 className="title">Vous avez déjà un compte</h2>

            <Link
              href={{
                pathname: '/login',
                query: {
                  email: data.email,
                  isLocalhost: router.query.isLocalhost || '',
                  env: router.query.env || '',
                },
              }}
            >
              <a>
                <button className="button" type="submit">
                  SE CONNECTER
                </button>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}

SignUp.getInitialProps = async () => ({})

SignUp.propTypes = {}
export default SignUp
