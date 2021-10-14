/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './footer.scss'
import Link from 'next/link'
import moment from 'moment'
import routes from '../../../utils/routes'

export default function Footer() {
  return (
    <div className="footer_container">
      <section className="footer_bar">
        <div className="logo">
          <Link href={routes.COACHES_LIST.path}>
            <a href={routes.COACHES_LIST.path}>
              <img src="../../../icon/logoindexpage.png" alt="iSporit" />
            </a>
          </Link>
        </div>
        <div className="social_media">
          <a href="https://www.facebook.com/iSporitOfficial">
            <img src="/Facebook_logo.png" alt="facebook" />
          </a>
          <a href="https://www.instagram.com/isporit_com/" style={{marginLeft: "20px"}}>
            <img src="/Instagram_logo.png" alt="instagram" />
          </a>
        </div>
        {/* <div className="button_container">
          <Link href={routes.SIGN_UP.path}>
            <a href={routes.SIGN_UP.path}>
              <button type="submit" className="sign_up">
                Devenir partenaire
              </button>
            </a>
          </Link>
        </div> */}
      </section>
      <div className={`${'copyright'}`}>
        © {moment().format('YYYY')} iSporit. Tous droits réservés{' '}
        <div>
          <Link href={routes.TERMS_AND_CONDITIONS.path}>
            <a href={routes.TERMS_AND_CONDITIONS.path}>
              <b>
                <u style={{ color: '#26beb5' }}>
                  Termes & Conditions, Politique de confidentialité
                </u>
              </b>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
