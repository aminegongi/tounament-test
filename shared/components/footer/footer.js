import './footer.scss'
import Link  from 'next/link';
import routes from '../../../utils/routes';
import moment from 'moment'
export default function Footer() {
    return (
      <div className="footer_container">
        <section className="footer_bar isporit_max_width">
          <div className="logo">
            <Link href="/">
              <a href="/">
                <img src="../../../icon/logoindexpage.png" alt="iSporit" />
              </a>
            </Link>
          </div>
          <div className="social_media">
            <a href="https://www.facebook.com/iSporitOfficial">
              <img src="/Facebook_logo.png" alt="facebook" />
            </a>
            <a href="https://www.instagram.com/isporit_com/">
              <img src="/Instagram_logo.png" alt="instagram" />
            </a>
          </div>
          <div className="button_container">
            <Link href={routes.SIGN_UP.path}>
              <a href={routes.SIGN_UP.path}>
                <button type="submit" className="sign_up">
                  Devenez partenaire
                </button>
              </a>
            </Link>
          </div>
        </section>
        <div className={`${'copyright'}`}>
          © {moment().format('YYYY')} iSporit. All rights reserved{' '}
          <div>
            <Link href={routes.TERMS_AND_CONDITIONS.path}>
              <a href={routes.TERMS_AND_CONDITIONS.path}>
                <b>
                  <u style={{ color: '#26beb5' }}>
                    Terms & Conditions, Privacy Policy
                  </u>
                </b>
              </a>
            </Link>
          </div>
        </div>
      </div>

  
    )
  }