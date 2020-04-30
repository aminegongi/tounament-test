import css from './navbar.scss'
import globalCss from '../../global-style.scss'
import Link from 'next/link'
import { Icon } from 'antd';
import coach from '../../../public/icon/subforcoach.svg'
import player from '../../../public/icon/subforplayer.svg'

import club from '../../../public/icon/subforclub.svg'

function NavbarIndex({ logo, navmenu1, navmenu2, navmenu3, navmenu4, navmenu5, buttonone, buttontwo, buttonthere }) {
  return (
    <div className={`${css.navbar_container} ${globalCss.isporit_max_width}`}>
      <div className={css.logo}>
        <Link href='/'>
          <a><img src={logo} alt="logo" /></a>
        </Link>
      </div>
      <div className={css.items_container}>
        <div className={css.sup}>
          <div className={css.item}>
            <div>
              {navmenu1}
              <Icon className={css.fleshdown} type="down" />
            </div>
            <div className={css.subnav_content}>
              <Link href='/club'>
                <a>
                  <img className={css.img} src={club} />
                  <div className={css.title} >Clubs</div>

                  <div className={css.subtitle} >
                    <div>Centralisez tous les</div>
                    <div>données de vos</div>
                    <div>équipes dans le même</div>
                    <div>emplacement et</div>
                    <div>gagnez du temps pour</div>
                    <div>gérer l'organisation de</div>
                    <div>votre club.</div>
                  </div>
                </a>
              </Link>

              <Link href='/coach'>
                <a>
                  <img className={css.img} src={coach} />
                  <div className={css.title} >Entraîneurs</div>

                  <div className={css.subtitle} >
                    <div>Lorem ipsum dolor sit</div>
                    <div>amet, consetetur</div>
                    <div>sadipscing elitr, sed</div>
                    <div>diam nonumy eirmod </div>
                    <div>tempor invidunt ut </div>
                    <div>labore et dolore magna</div>
                    <div> aliquyam erat.</div>

                  </div>
                </a>
              </Link>
              <Link href='/player'>
                <a>
                  <img className={css.img} src={player} />
                  <div className={css.title} >Joueur</div>

                  <div className={css.subtitle} >
                    <div>Lorem ipsum dolor sit</div>
                    <div>amet, consetetur</div>
                    <div>sadipscing elitr, sed</div>
                    <div>diam nonumy eirmod </div>
                    <div>tempor invidunt ut </div>
                    <div>labore et dolore magna</div>
                    <div> aliquyam erat.</div>
                  </div>
                </a>
              </Link>
              {/* <Link href='/coach'>
              <a ></a>
            </Link> 
            <Link href='/player'>
              <a >Joueur</a>
            </Link> */}
            </div>
          </div>
        </div>
        <div className={css.item}>
          {navmenu1}<Icon className={css.fleshdown} type="down" />
        </div>
        <div className={css.item}>
          {navmenu2}
        </div>
        <div className={css.item}>
          {navmenu3}
        </div>
        <div className={css.item}>
          {navmenu4}
        </div>
        <div className={css.item}>
          {navmenu5}
        </div>
      </div>
      <div className={css.button_container}>
        {/* 
        <Link href='/contact-us'>
          <button className={css.sign_in}>
            {buttonone}
            <Icon className={css.fleshdown} type="down" />
          </button>
        </Link> */}
        <Link href='/contact-us'>
          <a><button className={css.sign_up}>
            {buttontwo}
            <Icon className={css.fleshdown} type="down" />
          </button></a>
        </Link>



      </div>

    </div>
  );
}



export default NavbarIndex;