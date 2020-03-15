import css from './navbar.scss'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../i18n'

function Navbar({ isNabVisible, setNavIsVisible, loggedIn, t }) {
  return (
    <div className={css.navbar_container}>
      <div className={css.logo}>
        <Link href='/'>
          <a><img src='/logoSporit.svg' alt="logo" /></a>
        </Link>
      </div>
      <div className={css.items_container}>
        <div className={css.item}>
          Fonctionnalités
          </div>
        <div className={css.item}>
          Tarifs
          </div>
        <div className={css.item}>
          Aide
          </div>
        <div className={css.item}>
          à propos
          </div>
      </div>
      <div className={css.button_container}>
        <Link href='/contact-us'>
          <button className={css.sign_in}>{t('navbarTryForFree' , "Try For Free")}</button>
        </Link>
        <Link href='/contact-us'>
          <a><button className={css.sign_up}>{t('navbarDemoButton', 'ASK FOR A DEMO')}</button></a>
        </Link>

      </div>
      <button className={css.navBarButton} onClick={() => setNavIsVisible(!isNabVisible)}>
        <img className={css.burger} src="/burger.png" alt="" />
      </button>
      {
        isNabVisible && <div className={css.mobileNavBar}>
          <div className={css.button_container}>
            <Link href='/contact-us'>
              <button className={css.sign_in}>Se connecter</button>
            </Link>
            <Link href='/contact-us'>
              <a><button className={css.sign_up}>DEMANDER UNE DEMO</button></a>
            </Link>
          </div>
        </div>
      }
    </div>
  );
}

Navbar.getInitialProps = async () => {
  return ({
    namespacesRequired: ['common']
  })
}

Navbar.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Navbar);