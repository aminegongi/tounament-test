/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react'
import '../../global-style.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import { Menu, Dropdown, Icon, Button, Select } from 'antd'
import 'antd/dist/antd.css'
import routes from '../../../utils/routes'

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
import './navbar.scss'
import { AuthContext } from '../../../utils/context.utils'
const { Option } = Select

function NavbarIndex({
  searchBar,
  setSearchBar,
  buttontwo,
  isFooter,
  clubmanagement,
  coachesList,
  jobs,
  sports,
  dances,
  regions,
}) {
  const router = useRouter()
  const mobile = useMediaPredicate('(max-width: 850px)')

  const [isMobile, setIsMobile] = useState(false)
  const [job, setJob] = useState()
  const [specialty, setSpecialty] = useState()
  const [region, setRegion] = useState()
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
                onClick={() => onChangeLocation(routes.COACHES_LIST.path)}
                className="menu_item"
              >
                Réserver votre coach
              </Menu.Item>

              <Menu.Item
                onClick={() => onChangeLocation('/contact-us')}
                className="menu_item"
              >
                Contact
              </Menu.Item>

              {/* {!authContext.isLoggedIn &&
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
                )} */}
              {!authContext.isLoggedIn &&
                authContext.fetchUserProfileLoading === false && (
                  <Menu.Item
                    onClick={() => {
                      authContext.toggleLogInModal()
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
          className={`${'navbar_container'} ${'isporit_max_width'}`}
          style={!searchBar ? { paddingBottom: '0px' } : {}}
        >
          <div className="logo" style={!searchBar ? { marginTop: '0px' } : {}}>
            <Link href="/">
              <a href="/">
                <img src="../../../icon/logoindexpage.png" alt="logo" />
              </a>
            </Link>
          </div>
          <div style={searchBar ? { position: 'relative', top: '30px' } : {}}>
            <div
              className="items_container"
              style={!searchBar ? { width: '100%' } : {}}
            >
              <div className="sup"></div>

              {searchBar && (
                <div className="item">
                  {/* <Link href={routes.COACHES_LIST.path}> */}
                  {/* <a href={routes.COACHES_LIST.path}> */}
                    Réservez votre coach
                    {/* </a> */}
                  {/* </Link> */}
                </div>
              )}
              {!searchBar && (
                <div
                  className="isporit-search-bar2"
                  style={
                    router.pathname !== routes.HOME.path
                      ? { visibility: 'hidden' }
                      : {}
                  }
                  onClick={() => setSearchBar(true)}
                >
                  Rechercher un coach
                  <Button type="primary" shape="circle" icon="search" />
                </div>
              )}
            </div>
            {/* {router.pathname === routes.HOME.path && */}
            {searchBar && (
              <div className="isporit-search-bar">
                <div>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Quel métier?"
                    optionFilterProp="children"
                    onChange={(e) => {
                      setJob(e)
                    }}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {jobs.map((job) => {
                      return (
                        <Option value={job._id}>{job.translations.fr}</Option>
                      )
                    })}
                  </Select>
                </div>
                <div>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Quelle spécialité?"
                    optionFilterProp="children"
                    onChange={(e) => {
                      console.log('e: ', e)
                      setSpecialty(e)
                    }}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {sports.concat(dances).map((elt) => {
                      return (
                        <Option value={elt._id}>{elt.translations.fr}</Option>
                      )
                    })}
                  </Select>
                </div>
                <div className="last">
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Quelle zone?"
                    optionFilterProp="children"
                    onChange={(e) => {
                      setRegion(e)
                    }}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {regions.concat(regions).map((elt) => {
                      return (
                        <Option value={elt._id}>{elt.translations.fr}</Option>
                      )
                    })}
                  </Select>
                </div>
                <div className="svg last">
                  <Button
                    type="primary"
                    shape="circle"
                    icon="search"
                    onClick={() => {
                      router.push({
                        pathname: '/coaches',
                        query: {
                          job,
                          specialty,
                          region,
                        },
                      })
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="navbar_container__button-container"
            style={!searchBar ? { marginTop: '0px' } : {}}
          >
            {!authContext.isLoggedIn &&
              authContext.fetchUserProfileLoading === false && (
                <div className="isporit-flex-h-end-v-center">
                  {/* <button
                    onClick={() => authContext.toggleLogInModal(null, true)}
                    type="submit"
                    className="sign_up"
                  >
                    Inscription
                    
                  </button> */}
                  <button
                    onClick={authContext.toggleLogInModal}
                    type="submit"
                    className="sign_in"
                  >
                    Se connecter
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
