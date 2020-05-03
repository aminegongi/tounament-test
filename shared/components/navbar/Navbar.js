import css from './navbar.scss'
import globalCss from '../../global-style.scss'
import { useRouter } from "next/router";
import Link from 'next/link'
import { Icon, Menu } from 'antd';
import coach from '../../../public/icon/subforcoach.svg'
import player from '../../../public/icon/subforplayer.svg'
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'

import club from '../../../public/icon/subforclub.svg'
import { useState, useEffect } from 'react';

const { SubMenu } = Menu;


function NavbarIndex({ buttontwo, isFooter }) {
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
              <a><img src={"icon/logoindexpage.png"} alt="logo" /></a>
            </Link>
          </div>
          <div className={css.social_media}>
            <a href="" ><img src="/Facebook_logo.png" alt="facebook" /></a>
            <a href="" ><img src="/Twitter_logo.png" alt="twitter" /></a>
            <a href="" ><img src="/Instagram_logo.png" alt="instagram" /></a>
          </div>
          <div className={css.button_container}>
            <Link href='/contact-us'>
              <a>
                <button className={css.sign_up}>
                  Devenez partenaire
              </button>
              </a>
            </Link>
          </div>
        </section>
        <div className={`${css.copyright}`}>
          © 2020 iSporit. All rights reserved
        </div>

      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={css.mobile_burger_menu}>
        <div className={css.logo}>
          <Link href='/'>
            <a><img src={"icon/logoindexpage.png"} alt="logo" /></a>
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
          width={'80%'}
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
            <SubMenu className={css.menu_item} title="S'inscrire gratuitement" key="sub2">
              <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.feature_item}><img alt="club" src="icon/features/clubs.svg" /><div>Clubs</div></Menu.Item>
              <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.feature_item}><img alt="club" src="icon/features/coaches.svg" /><div>Entraineurs</div></Menu.Item>
              <Menu.Item onClick={() => onChangeLocation("/contact-us")} className={css.feature_item}><img alt="club" src="icon/features/players.svg" /><div>Joueurs/Parents</div></Menu.Item>
            </SubMenu>

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
              <a><img src={"icon/logoindexpage.png"} alt="logo" /></a>
            </Link>
          </div>
          <div className={css.items_container}>
            <div className={css.sup}>
              <div className={css.item}>
                <div>
                  La plateforme
                <Icon className={css.fleshdown} type="down" />
                </div>
                <div className={css.subnav_content}>
                  <Link href='/club'>
                    <a className={`${css.feature_desktop_item} ${css.feature_desktop_item_club}`}>
                      <img className={css.img} src={club} />
                      <div className={css.title} >Clubs</div>

                      <div className={css.subtitle} >
                        Centralisez tous les données de vos emplacement et gagnez
                        du temps pour gérer l'organisation de votre club.
                    </div>
                    </a>
                  </Link>

                  <Link href='/coach'>
                    <a className={`${css.feature_desktop_item} ${css.feature_desktop_item_coach}`}>
                      <img className={css.img} src={coach} />
                      <div className={css.title} >Entraîneurs</div>

                      <div className={css.subtitle} >
                        Centralisez tous les données de vos emplacement et gagnez
                        du temps pour gérer l'organisation de votre club.
                    </div>
                    </a>
                  </Link>
                  <Link href='/player'>
                    <a className={`${css.feature_desktop_item} ${css.feature_desktop_item_player}`}>
                      <img className={css.img} src={player} />
                      <div className={css.title} >Joueur</div>

                      <div className={css.subtitle} >
                        Centralisez tous les données de vos emplacement et gagnez
                        du temps pour gérer l'organisation de votre club.
                    </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className={css.item}>
              Clubs partenaires
          </div>
            {/* <div className={css.item}>
            Chercher un joueur
          </div> */}
            <div className={css.item}>
              <Link href='/contact-us'>
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
            <Link href='/contact-us'>
              <a><button className={css.sign_up}>
                S'inscrire gratuitement
              {/* <Icon className={css.fleshdown} type="down" /> */}
              </button></a>
            </Link>



          </div>

        </div>
      </div>
    )
  }
  return <></>
}



export default NavbarIndex;