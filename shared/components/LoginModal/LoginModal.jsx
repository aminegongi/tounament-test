/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button, message, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { CLUB, COACH, PLAYER } from '../../constants'
import IsporitModal from '../IsporitModal/IsporitModal'
import './style.scss'
import CreateClubForm from './CreateClubForm/CreateClubForm'
import routes from '../../../utils/routes'

const LoginModal = ({
  isVisible,
  onCancel,
  onSignUp,
  isSignUpModal,
  onLogin,
  loading,
  role,
}) => {
  const [isSignUp, setIsSignUp] = useState(isSignUpModal)
  const [data, setData] = useState({
    email: '',
    password: '',
    userType: 'player',
  })
  const [clubData, setClubData] = useState({
    title: '',
    phoneNumber1: '',
    address: '',
    country: 'Tunisia',
    city: '',
  })
  const [isCreateClubStep, setIsCreateClubStep] = useState(false)

  useEffect(() => {
    setIsSignUp(isSignUpModal)
  }, [isSignUpModal])

  const onChangeInput = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })

  const onUserSignUp = () => {
    if (!data.isAcceptedTermsAndConditions) {
      return message.error({
        content:
          'Vous devez accepter les Conditions d’utilisation et Politique de confidentialité pour vous inscrire',
      })
    }
    if (role) {
      data.userType = role
    }
    if (!loading && data.userType !== CLUB) {
      onSignUp(data)
    } else {
      setIsCreateClubStep(true)
    }
  }

  const signUpUI = () => {
    if (isCreateClubStep) {
      return (
        <CreateClubForm
          onSubmit={() => onSignUp(data, clubData)}
          onChange={setClubData}
          loading={loading}
          values={clubData}
        />
      )
    }

    return (
      <>
        <div className="login-modal__title">Créer un compte</div>
        <form
          onSubmit={(e) => {
            onUserSignUp()
            e.preventDefault()
          }}
          className="login-modal__body"
        >
          {!role && (
            <center className="login-modal__user-type">
              <Radio.Group
                size="default"
                value={data.userType}
                onChange={(e) => setData({ ...data, userType: e.target.value })}
                buttonStyle="solid"
              >
                <Radio.Button
                  className={
                    data.userType === PLAYER &&
                    'login-modal__radio-group-button'
                  }
                  value="player"
                >
                  Joueur
                </Radio.Button>
                <Radio.Button
                  className={
                    data.userType === COACH && 'login-modal__radio-group-button'
                  }
                  value="coach"
                >
                  Entraineur
                </Radio.Button>
                <Radio.Button
                  className={
                    data.userType === CLUB && 'login-modal__radio-group-button'
                  }
                  value="club"
                >
                  Organisation
                </Radio.Button>
              </Radio.Group>
            </center>
          )}
          {role && (
            <div className="isporit-note">
              Certaines informations vont être envoyées au coach pour connaître
              votre profil{' '}
            </div>
          )}

          <div className="login-modal__body__signup-inputs">
            <input
              type="text"
              onChange={onChangeInput}
              placeholder="Prénom"
              name="firstName"
              className="isporit-input"
              required
            />
            <input
              type="text"
              onChange={onChangeInput}
              placeholder="Nom de famille"
              name="lastName"
              className="isporit-input"
              required
            />

            <input
              type="number"
              onChange={onChangeInput}
              placeholder="Numéro de télèphone"
              name="phoneNumber"
              className="isporit-input"
              required
            />

            <input
              type="email"
              onChange={onChangeInput}
              placeholder="Email"
              name="email"
              className="isporit-input"
              required
            />
            <input
              type="password"
              onChange={onChangeInput}
              placeholder="Mot de passe "
              name="password"
              className="isporit-input"
              required
            />
            <input
              type="password"
              onChange={onChangeInput}
              placeholder="Confirmation mot de passe "
              name="confirmPassword"
              className="isporit-input"
              required
            />
            <div className="login-modal__input-label">
              <label className="" htmlFor="gender">
                Sexe
              </label>
              <select
                name="gender"
                onChange={onChangeInput}
                className="isporit-input"
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div className="login-modal__input-label">
              <label className="" htmlFor="date">
                Date de naissance
              </label>
              <input
                type="date"
                onChange={onChangeInput}
                id="date"
                placeholder="Date de naissance "
                name="birthday"
                className="isporit-input"
              />
            </div>
          </div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <input
              value={data.isAcceptedTermsAndConditions}
              onChange={(e) =>
                setData({
                  ...data,
                  isAcceptedTermsAndConditions: !data.isAcceptedTermsAndConditions,
                })
              }
              type="checkbox"
            />{' '}
            En cochant cette case, j'accepte{' '}
            <Link href={routes.TERMS_AND_CONDITIONS.path}>
              <a href={routes.TERMS_AND_CONDITIONS.path}>
                <u>
                  les Conditions d’utilisation et Politique de confidentialité
                </u>
              </a>
            </Link>{' '}
            de iSporit!
          </div>
          <center>
            <button type="submit" className="isporit-unset-button-css">
              <Button
                loading={loading}
                className="isporit-primary-button login-modal__body__submit"
                type="submit"
              >
                S'inscrire
              </Button>{' '}
            </button>
          </center>
        </form>
        <div className="login-modal__footer">
          <div className="login-modal__footer__text">
            Vous avez déjà un compte ?
          </div>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            type="button"
            className="isporit-unset-button-css login-modal__footer__create-account"
          >
            Connectez-vous
          </button>
        </div>
      </>
    )
  }

  const signInUI = () => {
    return (
      <>
        <div className="login-modal__title">Se connecter</div>
        <form
          onSubmit={(e) => {
            if (!loading) {
              onLogin(data)
            }
            e.preventDefault()
          }}
          className="login-modal__body"
        >
          <div className="login-modal__body__signin-inputs">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="isporit-input"
              onChange={onChangeInput}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe "
              name="password"
              className="isporit-input"
              onChange={onChangeInput}
              required
            />
          </div>
          <center className="login-modal__body__forgot-password">
            <Link
              href={routes.FORGOT_PASSWORD.path}
              className="login-modal__body__forgot-password"
            >
              <a href={routes.FORGOT_PASSWORD.path}>Mot de passe oublié?</a>
            </Link>
          </center>

          <center>
            <button type="submit" className="isporit-unset-button-css">
              <Button
                loading={loading}
                type="submit"
                className="login-modal__body__submit isporit-primary-button"
              >
                Se connecter
              </Button>
            </button>
          </center>
        </form>
        <div className="login-modal__footer">
          <div className="login-modal__footer__text">
            Vous n'avez pas un compte ?
          </div>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            type="button"
            className="isporit-unset-button-css login-modal__footer__create-account"
          >
            Créer un compte
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="login-modal">
      <IsporitModal
        className={`login-modal__modal ${
          isSignUp ? 'login-modal__modal__signup' : 'login-modal__modal__signin'
        }`}
        isVisible={isVisible}
        onCancel={() => {
          setIsCreateClubStep(false)
          onCancel()
        }}
      >
        {isSignUp ? signUpUI() : signInUI()}
      </IsporitModal>
    </div>
  )
}

LoginModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  isSignUpModal: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  role: PropTypes.string,
}

LoginModal.defaultProps = {
  role: '',
}

export default LoginModal
