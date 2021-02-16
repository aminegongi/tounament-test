import { useState, useEffect } from 'react';
import globalCss from '../../global-style.scss'
import { useRouter } from "next/router";
import Link from 'next/link'
import moment from 'moment'
import { Icon, Menu } from 'antd';
import coach from '../../../public/icon/subforcoach.svg'
import player from '../../../public/icon/subforplayer.svg'
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'

import club from '../../../public/icon/subforclub.svg'
import routes from '../../../utils/routes';
import css from './navbar.scss'

const { SubMenu } = Menu;


function NavbarIndex({ buttontwo, isFooter ,clubmanagement}) {
  const router = useRouter();
  const mobile = useMediaPredicate("(max-width: 850px)");

  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (mobile !== isMobile) {
      setIsMobile(mobile)

    }
  }, [mobile])

  const onChangeLocation = link => {
    router.push(link)
    return setIsMenuOpen(false)
  }

  if (isFooter) {
    return (
      <div className={css.footer_container}>
        <section className={`${css.footer_bar}  ${globalCss.isporit_max_width}`}>
          <div className={css.logo}>
            <Link href='/'>
              <a><img src={"../../../icon/logoindexpage.png"} alt="iSporit" /></a>
            </Link>
          </div>
          <div className={css.social_media}>
            <a href="https://www.facebook.com/iSporitOfficial" ><img src="/Facebook_logo.png" alt="facebook" /></a>
            {/* <a href="" ><img src="/Twitter_logo.png" alt="twitter" /></a> */}
            <a href="https://www.instagram.com/isporit_com/" ><img src="/Instagram_logo.png" alt="instagram" /></a>
          </div>
          <div className={css.button_container}>
            <Link href={routes.SIGN_UP.path}>
              <a>
                <button className={css.sign_up}>
                  Devenez partenaire
              </button>
              </a>
            </Link>
          </div>
        </section>
        <div className={`${css.copyright}`}>
          © {moment().format('YYYY')} iSporit. All rights reserved
        </div>

      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={css.mobile_burger_menu}>
        <div className={css.logo}>
          <Link href='/'>
            <a><img src={"../../../icon/logoindexpage.png"} alt="logo" /></a>
          </Link>
        </div>
        <BurgerMenu.slide
          styles={{
            bmBurgerButton: {
              position: 'fixed',
              height: '30px',
              width: '30px',
              right: '15px',
              top: '15px'
            },
            bmMenu: {
              background: 'white',
              fontSize: '1.15em',
            },
            bmItemList: {
              color: '#b8b7ad',
              padding: '0.8em'
            },
            bmItem: {
              display: 'inline-block'
            },
            bmOverlay: {
              backgroundColor: "transparent"
            }
          }}
          right
          onStateChange={e => setIsMenuOpen(e.isOpen)}
          isOpen={isMenuOpen}
          width={'260px'}
          customBurgerIcon={!isMenuOpen ? <Icon type="menu" /> : <Icon type="close" />}
          customCrossIcon={false}
          noOverlay={false}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{ border: "none" }}
          >
            <SubMenu className={css.menu_item} title="La plateforme" key="sub1">
              <Menu.Item onClick={() => onChangeLocation("/club")} className={css.feature_item}><img alt="club" src="icon/features/clubs.svg" /><div>Clubs</div></Menu.Item>
              <Menu.Item onClick={() => onChangeLocation("/coach")} className={css.feature_item}><img alt="club" src="icon/features/coaches.svg" /><div>Entraineurs</div></Menu.Item>
              <Menu.Item onClick={() => onChangeLocation("/player")} className={css.feature_item}><img alt="club" src="icon/features/players.svg" /><div>Joueurs/Parents</div></Menu.Item>
            </SubMenu>
            {/* <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.menu_item}>Clubs partenaires</Menu.Item> */}
            <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.menu_item}>Contact</Menu.Item>
            <Menu.Item onClick={() => onChangeLocation("/login")} className={css.menu_item}>Login</Menu.Item>

            {/* <SubMenu className={css.menu_item} title="S'inscrire gratuitement" key="sub2">
              <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.feature_item}><img alt="club" src="icon/features/clubs.svg" /><div>Clubs</div></Menu.Item>
              <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.feature_item}><img alt="club" src="icon/features/coaches.svg" /><div>Entraineurs</div></Menu.Item>
              <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.feature_item}><img alt="club" src="icon/features/players.svg" /><div>Joueurs/Parents</div></Menu.Item>
            </SubMenu> */}

          </Menu>
        </BurgerMenu.slide>
      </div>

    )
  }
  if (!isMobile) {
    return (
      <div style={{ backgroundColor: "white" }}>
        <div className={`${css.navbar_container} ${globalCss.isporit_max_width}`}>
          <div className={css.logo}>
            <Link href='/'>
              <a><img src={"../../../icon/logoindexpage.png"} alt="logo" /></a>
            </Link>
          </div>
          <div className={css.items_container}>
            <div className={css.sup}>
              <div className={css.item}>
                <div>
                  La plateforme
                <Icon className={css.fleshdown} type="down" />
                </div>
                <div className={css.subnav_content_container}>
                  <div className={css.subnav_content}>
                    <Link href={routes.CLUB_FEATURES.path}>
                      <a className={`${css.feature_desktop_item} ${css.feature_desktop_item_club}`}>
                        <img className={css.img} src={club} />
                        <div className={css.title} >Club</div>

                        <div className={css.subtitle} >
                          Digitalisez tout le travail de votre club et centralisez le dans une seule plateforme accessible depuis votre ordinateur, tablette et smartphone.
                      </div>
                      </a>
                    </Link>

                    <Link href={routes.COACH_FEATURES.path}>
                      <a className={`${css.feature_desktop_item} ${css.feature_desktop_item_coach}`}>
                        <img className={css.img} src={coach} />
                        <div className={css.title} >Entraîneur</div>

                        <div className={css.subtitle} >
                          Planifiez vos sessions, faîtes la présence de vos joueurs et suivez l'historique de chacune des session de votre groupe.
                      </div>
                      </a>
                    </Link>
                    <Link href={routes.PLAYER_FEATURES.path}>
                      <a className={`${css.feature_desktop_item} ${css.feature_desktop_item_player}`}>
                        <img className={css.img} src={player} />
                        <div className={css.title} >Joueur</div>

                        <div className={css.subtitle} >
                          Suivez vos performances, analysez les vos entraîneurs et partagez les sur vos réseaux sociaux, créez aussi votre profil public.
                      </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={css.item}>
              <Link href={routes.SEARCH_CLUB.path}>
                <a>
                  Clubs partenaires
                </a>
              </Link>
            </div> */}
            {/* <div className={css.item}>
            Chercher un joueur
          </div> */}
            <div className={css.item}>
              <Link href={routes.CONTACT_US.path}>
                <a>
                  Contact
              </a>
              </Link>
            </div>
          </div>
          <div className={css.button_container}>
            {/* 
          <Link href='/contact-us'>
            <button className={css.sign_in}>
              connexion
              <Icon className={css.fleshdown} type="down" />
            </button>
          </Link> */}
            <Link href={routes.SIGN_UP.path}>
              <a>
                <button className={css.sign_up}>
                  S'inscrire gratuitement
              {/* <Icon className={css.fleshdown} type="down" /> */}
                </button>
              </a>
            </Link>



          </div>

        </div>
      </div>
    )
  }
  return <></>
}



export default NavbarIndex;