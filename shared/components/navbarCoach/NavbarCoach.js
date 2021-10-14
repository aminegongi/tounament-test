/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react'
import '../../global-style.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu, Dropdown, Icon } from 'antd'
import 'antd/dist/antd.css'

import { useMediaPredicate } from 'react-media-hook'
import BurgerMenu from 'react-burger-menu'
import routes from '../../../utils/routes'
import logoImg from '../../../public/icon/logoindexpage.png'
import { getUserProfilePicture } from '../../../utils/string.utils'

import './navbarCoach.scss'
import { AuthContext } from '../../../utils/context.utils'
import { COACH, PLAYER } from '../../constants'

function NavbarCoach() {
  const router = useRouter()
  const mobile = useMediaPredicate('(max-width: 992px)')

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

  if (isMobile) {
    return (
      <div className="mobile_burger_menu">
        <div className="logo isporit-flex-h-space-v-center">
          <Link href={routes.HOME.path}>
            <a href={routes.HOME.path}>
              <img src={logoImg} alt="logo" />
            </a>
          </Link>
          {authContext.isLoggedIn &&
            authContext.fetchUserProfileLoading === false && (
              <button
                onClick={() => {
                  window.location.href = routes.ISPORIT_PLATFORM.linkTo()
                }}
                type="button"
                className="isporit-primary-button"
                style={{ marginRight: '50px', padding: '10px' }}
              >
                {authContext.userType === COACH ||
                authContext.userType === PLAYER
                  ? 'Mes réservations'
                  : 'Mon profil'}
              </button>
            )}
          {!authContext.isLoggedIn &&
            authContext.fetchUserProfileLoading === false && (
              <button
                onClick={() => {
                  authContext.toggleLogInModal(() => {}, true)
                }}
                type="button"
                className="isporit-primary-button"
                style={{ marginRight: '50px', padding: '10px' }}
              >
                Inscription
              </button>
            )}
        </div>

        <div className="">
          <BurgerMenu.slide
            styles={{
              bmBurgerButton: {
                position: 'fixed',
                height: '30px',
                width: '30px',
                right: '15px',
                top: '25px',
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
                onClick={() => onChangeLocation(routes.COACHES_LIST.path)}
                className="menu_item"
              >
                Réservez votre coach
              </Menu.Item>

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
                      authContext.toggleLogInModal(() => {}, false)
                      setIsMenuOpen(false)
                    }}
                    className="menu_item"
                  >
                    Se connecter
                  </Menu.Item>
                )}
              {authContext.isLoggedIn &&
                authContext.fetchUserProfileLoading === false && (
                  <Menu.Item onClick={authContext.logOut} className="menu_item">
                    Déconnexion
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
        <div
          className={`${'navbar_container'} flex justify-between`}
          style={{ paddingBottom: '0px' }}
        >
          <div className="flex ">
            <div className="logo" style={{ marginTop: '0px' }}>
              <Link href={routes.HOME.path}>
                <a href={routes.HOME.path}>
                  <img src="../../../icon/logoindexpage.png" alt="logo" />
                </a>
              </Link>
            </div>
            <div className="">
              <Link href={routes.HOME.path}>
                <a
                  className="text-base text-black font-medium ml-20"
                  href={routes.HOME.path}
                >
                  Accueil
                </a>
              </Link>
            </div>
            <div className="">
              <Link href={routes.COACHES_SELECT_SPORT.path}>
                <a
                  className="text-base text-black font-medium mx-9"
                  href={routes.COACHES_SELECT_SPORT.path}
                >
                  Réservez votre coach
                </a>
              </Link>
            </div>
            {/* <div className="">
              <Link href={routes.HOME.path}>
                <a
                  className="text-base text-black font-medium"
                  href={routes.HOME.path}
                >
                  Support
                </a>
              </Link>
            </div> */}
          </div>

          <div
            className="navbar-coach_container__button-container justify-end"
            style={{ marginTop: '0px' }}
          >
            {!authContext.isLoggedIn &&
              authContext.fetchUserProfileLoading === false && (
                <div className="isporit-flex-stqrt-end-v-center">
                  <button
                    onClick={authContext.toggleLogInModal}
                    type="submit"
                    className="sign_in"
                  >
                    Se connecter
                  </button>
                </div>
              )}
            {authContext.isLoggedIn &&
              authContext.fetchUserProfileLoading === false && (
                <div className="isporit-flex-h-end-v-center">
                  <button
                    onClick={() => {
                      window.location.href = routes.ISPORIT_PLATFORM.linkTo()
                    }}
                    type="button"
                    className="isporit-primary-button"
                    style={{ marginRight: '50px', padding: '10px' }}
                  >
                    {authContext.userType === COACH ||
                    authContext.userType === PLAYER
                      ? 'Mes réservations'
                      : 'Mon profil'}
                  </button>

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

export default NavbarCoach
