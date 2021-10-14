/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react'
import '../../global-style.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu, Dropdown, Icon } from 'antd'
import 'antd/dist/antd.css'
import { Link as ScrollLink } from 'react-scroll'

import { useMediaPredicate } from 'react-media-hook'
import BurgerMenu from 'react-burger-menu'
import routes from '../../../utils/routes'
import logoImg from '../../../public/icon/logoindexpage.png'
import { getUserProfilePicture } from '../../../utils/string.utils'

import './navbar.scss'
import { AuthContext } from '../../../utils/context.utils'
import { COACH, PLAYER } from '../../constants'

function NavbarIndex() {
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
          

          <button
            onClick={() => onChangeLocation(routes.COACHES_SELECT_SPORT.path)}
            type="button"
            className="isporit-primary-button"
            style={{ marginRight: '50px', padding: '10px' }}
          >
            Réservez votre coach
          </button>
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
              

              <Menu.Item
                onClick={() =>
                  onChangeLocation(routes.COACHES_SELECT_SPORT.path)
                }
                className="menu_item"
              >
                Réservez votre coach
              </Menu.Item>

              <Menu.Item
                onClick={() => onChangeLocation(routes.HOME.path+"#contact")}
                className="menu_item"
              >
                Contact
              </Menu.Item>
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
               <ScrollLink to="contact" smooth={true} duration={800}>
                <a
                  className="text-base text-black font-medium ml-20"
                  href='/contact'
                >
                  Contact
                </a>
              </ScrollLink>
            </div>
            {/* <div className="">
              <Link href={routes.HOME.path}>
                <a
                  className="text-base text-black font-medium ml-20"
                  href={routes.HOME.path}
                >
                  Products
                </a>
              </Link>
            </div> */}

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
            className="navbar_container__button-container justify-end"
            style={{ marginTop: '0px' }}
          >
            <div className="isporit-flex-stqrt-end-v-center">
              <a
                className="text-base font-medium mx-9 sign_in"
                href={routes.COACHES_SELECT_SPORT.path}
                target="_blank"
              >
                Réservez votre coach
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}

export default NavbarIndex
