/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react'
import '../../global-style.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import { Menu, Dropdown, Icon } from 'antd'

import { useMediaPredicate } from 'react-media-hook'
import BurgerMenu from 'react-burger-menu'
import SubMenu from 'antd/lib/menu/SubMenu'
import { getUserProfilePicture } from '../../../utils/string.utils'
import logoImg from '../../../public/icon/logoindexpage.png'
import coach from '../../../public/icon/subforcoach.svg'
import player from '../../../public/icon/subforplayer.svg'
import coachesIcon from '../../../public/icon/features/coaches.svg'
import playersIcon from '../../../public/icon/features/players.svg'
import clubsIcon from '../../../public/icon/features/clubs.svg'

import club from '../../../public/icon/subforclub.svg'
import routes from '../../../utils/routes'
import './navbar.scss'
import { AuthContext } from '../../../utils/context.utils'

function NavbarIndex({ buttontwo, isFooter, clubmanagement }) {
  const router = useRouter()
  const mobile = useMediaPredicate('(max-width: 850px)')

  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const authContext = useContext(AuthContext)

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          window.location.href = routes.ISPORIT_PLATFORM.linkTo()
        }}
      >
        Profil
      </Menu.Item>
      <Menu.Item onClick={authContext.logOut}>Déconnexion</Menu.Item>
    </Menu>
  )

  useEffect(() => {
    if (mobile !== isMobile) {
      setIsMobile(mobile)
    }
  }, [mobile])

  const onChangeLocation = (link) => {
    router.push(link)
    return setIsMenuOpen(false)
  }

  if (isFooter) {
    return (
      <div className="footer_container">
        <section className={`${'footer_bar'}  ${'isporit_max_width'}`}>
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
            {/* <a href="" ><img src="/Twitter_logo.png" alt="twitter" /></a> */}
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
          © {moment().format('YYYY')} iSporit. All rights reserved
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="mobile_burger_menu">
        <div className="logo">
          <Link href="/">
            <a href="/">
              <img src={logoImg} alt="logo" />
            </a>
          </Link>
        </div>
        <div className="">
          <BurgerMenu.slide
            styles={{
              bmBurgerButton: {
                position: 'fixed',
                height: '30px',
                width: '30px',
                right: '15px',
                top: '15px',
              },
              bmMenu: {
                background: 'white',
                fontSize: '1.15em',
                boxShadow: '0 20px 40px 0 rgba(0, 0, 0, 0.2)',
              },
              bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em',
              },
              bmItem: {
                display: 'inline-block',
              },
              bmOverlay: {
                backgroundColor: 'transparent',
              },
            }}
            right
            onStateChange={(e) => setIsMenuOpen(e.isOpen)}
            isOpen={isMenuOpen}
            width="260px"
            customBurgerIcon={
              !isMenuOpen ? <Icon type="menu" /> : <Icon type="close" />
            }
            customCrossIcon={false}
            noOverlay={false}
          >
            <Menu
              mode="inline"
              defaultOpenKeys={['sub1']}
              style={{ border: 'none' }}
            >
              {authContext.isLoggedIn &&
                authContext.fetchUserProfileLoading === false && (
                  <Menu.Item
                    onClick={() => {
                      window.location.href = routes.ISPORIT_PLATFORM.linkTo()
                    }}
                    className="menu_item"
                  >
                    <div className="isporit-flex-h-any-v-center">
                      <div className="navbar_container__user-card">
                        <img
                          src={getUserProfilePicture(
                            authContext.userProfile.profilePicture,
                          )}
                          alt=""
                        />
                        <div className="navbar_container__user-card__name">
                          {authContext.userProfile.firstName}{' '}
                          {authContext.userProfile.lastName}
                        </div>
                      </div>
                    </div>
                  </Menu.Item>
                )}

              <Menu.Item
                onClick={() => onChangeLocation('/profile-coach')}
                className="menu_item"
              >
                Entraineurs
              </Menu.Item>
              <SubMenu className="menu_item" title="La plateforme" key="sub1">
                <Menu.Item
                  onClick={() => onChangeLocation('/club')}
                  className="feature_item"
                >
                  <img alt="club" src={clubsIcon} />
                  <div>Clubs</div>
                </Menu.Item>
                <Menu.Item
                  onClick={() => onChangeLocation('/coach')}
                  className="feature_item"
                >
                  <img alt="club" src={coachesIcon} />
                  <div>Entraineurs</div>
                </Menu.Item>
                <Menu.Item
                  onClick={() => onChangeLocation('/player')}
                  className="feature_item"
                >
                  <img alt="club" src={playersIcon} />
                  <div>Joueurs/Parents</div>
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                onClick={() => onChangeLocation('/contact-us')}
                className="menu_item"
              >
                Contact
              </Menu.Item>

              {!authContext.isLoggedIn &&
                authContext.fetchUserProfileLoading === false && (
                  <Menu.Item
                    onClick={() => {
                      authContext.toggleLogInModal(null, true)
                      setIsMenuOpen(false)
                    }}
                    className="menu_item"
                  >
                    Inscription
                  </Menu.Item>
                )}
              {!authContext.isLoggedIn &&
                authContext.fetchUserProfileLoading === false && (
                  <Menu.Item
                    onClick={() => {
                      authContext.toggleLogInModal()
                      setIsMenuOpen(false)
                    }}
                    className="menu_item"
                  >
                    Log in
                  </Menu.Item>
                )}
            </Menu>
          </BurgerMenu.slide>
        </div>
      </div>
    )
  }
  if (!isMobile) {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div className={`${'navbar_container'} ${'isporit_max_width'}`}>
          <div className="logo">
            <Link href="/">
              <a href="/">
                <img src="../../../icon/logoindexpage.png" alt="logo" />
              </a>
            </Link>
          </div>
          <div className="items_container">
            <div className="sup">
              <div className="item">
                <div>
                  La plateforme
                  <Icon className="fleshdown" type="down" />
                </div>
                <div className="subnav_content_container">
                  <div className="subnav_content">
                    <Link href={routes.CLUB_FEATURES.path}>
                      <a
                        href={routes.CLUB_FEATURES.path}
                        className={`${'feature_desktop_item'} ${'feature_desktop_item_club'}`}
                      >
                        <img alt="" className="img" src={club} />
                        <div className="title">Club</div>

                        <div className="subtitle">
                          Digitalisez tout le travail de votre club et
                          centralisez le dans une seule plateforme accessible
                          depuis votre ordinateur, tablette et smartphone.
                        </div>
                      </a>
                    </Link>

                    <Link href={routes.COACH_FEATURES.path}>
                      <a
                        href={routes.COACH_FEATURES.path}
                        className={`${'feature_desktop_item'} ${'feature_desktop_item_coach'}`}
                      >
                        <img alt="" className="img" src={coach} />
                        <div className="title">Entraîneur</div>

                        <div className="subtitle">
                          Planifiez vos sessions, faîtes la présence de vos
                          joueurs et suivez l'historique de chacune des session
                          de votre groupe.
                        </div>
                      </a>
                    </Link>
                    <Link href={routes.PLAYER_FEATURES.path}>
                      <a
                        href={routes.PLAYER_FEATURES.path}
                        className={`${'feature_desktop_item'} ${'feature_desktop_item_player'}`}
                      >
                        <img alt="" className="img" src={player} />
                        <div className="title">Joueur</div>

                        <div className="subtitle">
                          Suivez vos performances, analysez les vos entraîneurs
                          et partagez les sur vos réseaux sociaux, créez aussi
                          votre profil public.
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <Link href={routes.COACHES_LIST.path}>
                <a href={routes.COACHES_LIST.path}>Entraineurs</a>
              </Link>
            </div>
            {/*             
            <div className="item">
              <Link href={routes.SEARCH_CLUB.path}>
                <a href={routes.SEARCH_CLUB.path}>Clubs partenaires</a>
              </Link>
            </div> */}
            {/* <div className={"item"}>
            Chercher un joueur
          </div> */}
            <div className="item">
              <Link href={routes.CONTACT_US.path}>
                <a href={routes.CONTACT_US.path}>Contact</a>
              </Link>
            </div>
          </div>
          <div className="navbar_container__button-container">
            {!authContext.isLoggedIn &&
              authContext.fetchUserProfileLoading === false && (
                <div className="isporit-flex-h-any-v-center">
                  <button
                    onClick={() => authContext.toggleLogInModal(null, true)}
                    type="submit"
                    className="sign_up"
                  >
                    Inscription
                    {/* S'inscrire gratuitement */}
                    {/* <Icon className={"fleshdown"} type="down" /> */}
                  </button>
                  <button
                    onClick={authContext.toggleLogInModal}
                    type="submit"
                    className="sign_in"
                  >
                    Log in
                    {/* S'inscrire gratuitement */}
                    {/* <Icon className={"fleshdown"} type="down" /> */}
                  </button>
                </div>
              )}
            {authContext.isLoggedIn &&
              authContext.fetchUserProfileLoading === false && (
                <div className="isporit-flex-h-end-v-center">
                  <Dropdown overlay={menu}>
                    <div className="isporit-flex-h-any-v-center">
                      <div className="navbar_container__user-card">
                        <img
                          src={getUserProfilePicture(
                            authContext.userProfile.profilePicture,
                          )}
                          alt=""
                        />
                        <div className="navbar_container__user-card__name">
                          {authContext.userProfile.firstName}{' '}
                          {authContext.userProfile.lastName}
                        </div>
                      </div>

                      <Icon
                        type="down"
                        className="navbar_container__user-card__down-icon"
                      />
                    </div>
                  </Dropdown>
                </div>
              )}
          </div>
        </div>
      </div>
    )
  }
  return <></>
}

export default NavbarIndex
