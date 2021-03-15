import React, { useEffect, useState } from 'react'
import IsporitModal from '../IsporitModal/IsporitModal'
import './style.scss'

const LoginModal = ({
  isVisible,
  onCancel,
  onSubmit,
  onSignIn,
  isSignUpModal,
}) => {
  const [isSignUp, setIsSignUp] = useState(isSignUpModal)

  useEffect(() => {
    setIsSignUp(isSignUpModal)
  }, [isSignUpModal])

  const signUpUI = () => (
    <>
      <div className="login-modal__title">Créer un compte</div>
      <form onSubmit={(e) => e.preventDefault()} className="login-modal__body">
        <div className="login-modal__body__signup-inputs">
          <input
            type="text"
            placeholder="Prénom"
            name="firstName"
            className="isporit-input"
            required
          />
          <input
            type="text"
            placeholder="Nom de famille"
            name="lastname"
            className="isporit-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="isporit-input"
            required
          />

          <input
            type="number"
            placeholder="Numéro de télèphone"
            name="phoneNumber"
            className="isporit-input"
            required
          />
          <input
            type="date"
            placeholder="Date de naissance "
            name="date"
            className="isporit-input"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe "
            name="password"
            className="isporit-input"
            required
          />
          <input
            type="password"
            placeholder="Confirmation mot de passe "
            name="password"
            className="isporit-input"
            required
          />
        </div>

        <center>
          <button
            className="isporit-primary-button login-modal__body__submit"
            type="submit"
          >
            S'inscrire
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

  const signInUI = () => (
    <>
      <div className="login-modal__title">Se connecter</div>
      <form onSubmit={(e) => e.preventDefault()} className="login-modal__body">
        <div className="login-modal__body__signin-inputs">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="isporit-input"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe "
            name="password"
            className="isporit-input"
            required
          />
        </div>
        <center>
          <div className="login-modal__body__forgot-password">
            Mot de passe oublié?
          </div>
        </center>

        <center>
          <button
            className="isporit-primary-button login-modal__body__submit"
            type="submit"
          >
            Se connecter
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

  return (
    <div className="login-modal">
      <IsporitModal
        className={`login-modal__modal ${
          isSignUp ? 'login-modal__modal__signup' : 'login-modal__modal__signin'
        }`}
        isVisible={isVisible}
        onCancel={onCancel}
      >
        {isSignUp ? signUpUI() : signInUI()}
      </IsporitModal>
    </div>
  )
}

export default LoginModal
