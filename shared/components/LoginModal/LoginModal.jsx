import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button, Radio } from 'antd'
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
            if (!loading && data.userType !== CLUB) {
              onSignUp(data)
            } else {
              setIsCreateClubStep(true)
            }
            e.preventDefault()
          }}
          className="login-modal__body"
        >
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
              type="email"
              onChange={onChangeInput}
              placeholder="Email"
              name="email"
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
                required
              />
            </div>
          </div>
          <center className="login-modal__user-type">
            <Radio.Group
              size="default"
              value={data.userType}
              onChange={(e) => setData({ ...data, userType: e.target.value })}
              buttonStyle="solid"
            >
              <Radio.Button
                className={
                  data.userType === PLAYER && 'login-modal__radio-group-button'
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
                className="isporit-primary-button login-modal__body__submit"
                type="submit"
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
}

export default LoginModal
