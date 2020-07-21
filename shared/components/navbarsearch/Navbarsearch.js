import css from './navbarsearch.scss';
import { Icon,Input,Select ,Menu  } from 'antd';
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'
import club from '../../../public/icon/subforclub.svg'
import player from '../../../public/icon/subforplayer.svg'
import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';
import globalCss from '../../global-style.scss'

import { useState, useEffect,useRef } from 'react';

function Navbarsearch({ el ,setdatawebsite,img}) {
  const mobile = useMediaPredicate("(max-width: 850px)");
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { SubMenu } = Menu;

    const { Search } = Input;
    const Sherch = value => { 
        setdatawebsite(el.filter(e => e.title.includes(value)));
      }; 
      useEffect(() => {
        if (mobile !== isMobile) {
          setIsMobile(mobile)
    
        }
      }, [mobile])
      if(!isMobile){

    return (
        <div className={css.search}>

      <div className={css.navbar_container} >

         <div className={css.navbarserch}>
            <div className={css.logo}>
                <Link href='/'>
                    <a><img src={img}  alt="logo" /></a>
                </Link>
            </div>
            <Search
                placeholder="Cherchez un club de Tennis..."
                onChange={e => Sherch(e.target.value)
                }
                style={{ width: 250
                }}
                className={css.search}
            />
       <div className={css.items_container}>
            <div className={css.sup}>
              <div className={css.item}>
                <div>
                  La plateforme
                <Icon className={css.fleshdown} type="down" />
                </div>
                <div className={css.subnav_content_container}>
                  <div className={css.subnav_content}>
                    <Link >
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

            <div className={css.item}>
              <Link href={routes.CONTACT_US.clubPath}>
                <a>
                  Clubs partenaires
                </a>
              </Link>
            </div>
            <div className={css.item}>
            Chercher un joueur
          </div>
            <div className={css.item}>
              <Link href={routes.CONTACT_US.path}>
                <a>
                  Contact
              </a>
              </Link>
            </div>
          </div>
          <div className={css.button_container}>
           
          <Link href='/contact-us'>
            <button className={css.sign_in}>
              connexion
              <Icon className={css.fleshdown} type="down" />
            </button>
          </Link> 
            <Link href={routes.CONTACT_US.path}>
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
          
         </div>
    
    );
     }
              if(isMobile){
                return(
                  
                    <div className={css.mobile_burger_menu}>
                      <div className={css.logo}>
                        <Link href='/'>
                          <a><img src={img} alt="logo" /></a>
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
                            <Search
                                placeholder="Cherchez un club de Tennis..."
                                onChange={e => Sherch(e.target.value)
                                }
                                style={{ width: 250
                                }}
                                className={css.search}
                            />  
                    <div className={css.items_container}>
            <div className={css.sup}>
              <div className={css.item}>
                <div>
                  La plateforme
                <Icon className={css.fleshdown} type="down" />
                </div>
                <div className={css.subnav_content_container}>
                  <div className={css.subnav_content}>
                    <Link >
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

            <div className={css.item}>
              <Link href={routes.CONTACT_US.clubPath}>
                <a>
                  Clubs partenaires
                </a>
              </Link>
            </div>
            <div className={css.item}>
            Chercher un joueur
           </div>
            <div className={css.item}>
              <Link href={routes.CONTACT_US.path}>
                <a>
                  Contact
              </a>
              </Link>
            </div>
          </div>
          <div className={css.button_container}>
           
           <Link href='/contact-us'>
             <button className={css.sign_in}>
               connexion
               <Icon className={css.fleshdown} type="down" />
             </button>
           </Link> 
             <Link href={routes.CONTACT_US.path}>
               <a>
                 <button className={css.sign_up}>
                   S'inscrire gratuitement
               {/* <Icon className={css.fleshdown} type="down" /> */}
                 </button>
               </a>
             </Link>
           </div>
                        </Menu>
                      </BurgerMenu.slide>
                    </div>
                );
              }
    }
    export default Navbarsearch;