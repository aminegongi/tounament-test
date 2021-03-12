import './navbarsearch.scss';
import { Icon,Input,Select ,Menu  } from 'antd';
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'
import club from '../../../public/icon/subforclub.svg'
import player from '../../../public/icon/subforplayer.svg'
import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';
import  '../../global-style.scss'

import { useState, useEffect,useRef } from 'react';

function Navbarsearch({ el ,setdatawebsite,img ,showclub,setshowclub, serverData}) {
  const mobile = useMediaPredicate("(max-width: 850px)");
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const switchshow = ()=>{
    if (showclub==="carte"){
        setshowclub("liste");
    }
    else if (showclub==="liste")

        {
            setshowclub("carte")
        }
    }

  const { SubMenu } = Menu;

    const { Search } = Input;
    const Sherch = value => { 
        setdatawebsite(serverData.filter(e => e.title.includes(value)));
      }; 
      useEffect(() => {
        if (mobile !== isMobile) {
          setIsMobile(mobile)
    
        }
      }, [mobile])
      if(!isMobile){

    return (
        <div className={"search"}>

      <div className={"navbar_container"} >

         <div className={"navbarserch"}>
            <div className={"logo"}>
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
                className={"search"}
            />
       <div className={"items_container"}>
            <div className={"sup"}>
              <div className={"item"}>
                <div>
                  La plateforme
                <Icon className={"fleshdown"} type="down" />
                </div>
                <div className={"subnav_content_container"}>
                  <div className={"subnav_content"}>
                  <Link href={routes.CLUB_FEATURES.path}>
                      <a className={`${"feature_desktop_item"} ${"feature_desktop_item_club"}`}>
                        <img className={"img"} src={club} />
                        <div className={"title"} >Club</div>

                        <div className={"subtitle"} >
                          Digitalisez tout le travail de votre club et centralisez le dans une seule plateforme accessible depuis votre ordinateur, tablette et smartphone.
                      </div>
                      </a>
                    </Link>

                    <Link href={routes.COACH_FEATURES.path}>
                      <a className={`${"feature_desktop_item"} ${"feature_desktop_item_coach"}`}>
                        <img className={"img"} src={coach} />
                        <div className={"title"} >Entraîneur</div>

                        <div className={"subtitle"} >
                          Planifiez vos sessions, faîtes la présence de vos joueurs et suivez l'historique de chacune des session de votre groupe.
                      </div>
                      </a>
                    </Link>
                    <Link href={routes.PLAYER_FEATURES.path}>
                      <a className={`${"feature_desktop_item"} ${"feature_desktop_item_player"}`}>
                        <img className={"img"} src={player} />
                        <div className={"title"} >Joueur</div>

                        <div className={"subtitle"} >
                          Suivez vos performances, analysez les vos entraîneurs et partagez les sur vos réseaux sociaux, créez aussi votre profil public.
                      </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={"item"}>
            <Link href={`/searchclub`} >
                <a>
                  Clubs partenaires
                </a>
              </Link>
            </div>
            <div className={"item"}>
            Chercher un joueur
          </div>
            <div className={"item"}>
              <Link href={routes.CONTACT_US.path}>
                <a>
                  Contact
              </a>
              </Link>
            </div>
          </div>
          <div className={"button_container"}>
           
          <Link href='/contact-us'>
            <button className={"sign_in"}>
              connexion
              <Icon className={"fleshdown"} type="down" />
            </button>
          </Link> 
            <Link href={routes.CONTACT_US.path}>
              <a>
                <button className={"sign_up"}>
                  S'inscrire gratuitement
              {/* <Icon className={"fleshdown"} type="down" /> */}
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
                  
                    <div className={"mobile_burger_menu"}>
                      <div className={"logo"}>
                        <Link href='/'>
                          <a><img src={img} alt="logo" /></a>
                        </Link>
                        <Link href={routes.CONTACT_US.path}>
                          <a>
                            <button className={"sign_up"}>
                              S'inscrire gratuitement
                          <Icon className={"fleshdown"} type="down" />
                            </button>
                          </a>
                       </Link>
                      </div>
                      
                      <Search
                          placeholder="Cherchez un club de Tennis..."
                          onChange={e => Sherch(e.target.value)
                          }
                          style={{ width: 250
                       
                          }}
                          className={"search"}
                      />
                      <button className={!showclub==""? "carte":"buttoncarte"} onClick={() => switchshow()}>

                      {/* // <button  onclick="switchshow"> */}
                        <span>{showclub}</span>
                      </button>

                      <BurgerMenu.slide
                        styles={{
                          bmBurgerButton: {
                            position: 'fixed',
                            height: '30px',
                            width: '30px',
                            right: '15px',
                            top: '23px'
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
                            {/* <Search
                                placeholder="Cherchez un club de Tennis..."
                                onChange={e => Sherch(e.target.value)
                                }
                                style={{ width: 250
                                }}
                                className={"search"}
                            />   */}
                    <div className={"items_container"}>
            <div className={"sup"}>
              <div className={"item"}>
                <div>
                  La plateforme
                <Icon className={"fleshdown"} type="down" />
                </div>
                <div className={"subnav_content_container"}>
                  <div className={"subnav_content"}>
                  <Link href={routes.CLUB_FEATURES.path}>
                      <a className={`${"feature_desktop_item"} ${"feature_desktop_item_club"}`}>
                        <img className={"img"} src={club} />
                        <div className={"title"} >Club</div>

                        <div className={"subtitle"} >
                          Digitalisez tout le travail de votre club et centralisez le dans une seule plateforme accessible depuis votre ordinateur, tablette et smartphone.
                      </div>
                      </a>
                    </Link>

                    <Link href={routes.COACH_FEATURES.path}>
                      <a className={`${"feature_desktop_item"} ${"feature_desktop_item_coach"}`}>
                        <img className={"img"} src={coach} />
                        <div className={"title"} >Entraîneur</div>

                        <div className={"subtitle"} >
                          Planifiez vos sessions, faîtes la présence de vos joueurs et suivez l'historique de chacune des session de votre groupe.
                      </div>
                      </a>
                    </Link>
                    <Link href={routes.PLAYER_FEATURES.path}>
                      <a className={`${"feature_desktop_item"} ${"feature_desktop_item_player"}`}>
                        <img className={"img"} src={player} />
                        <div className={"title"} >Joueur</div>

                        <div className={"subtitle"} >
                          Suivez vos performances, analysez les vos entraîneurs et partagez les sur vos réseaux sociaux, créez aussi votre profil public.
                      </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={"item"}>
              <Link href={routes.CONTACT_US.clubPath}>
                <a>
                  Clubs partenaires
                </a>
              </Link>
            </div>
            <div className={"item"}>
            Chercher un joueur
           </div>
            <div className={"item"}>
              <Link href={routes.CONTACT_US.path}>
                <a>
                  Contact
              </a>
              </Link>
            </div>
          </div>
          <div className={"button_container"}>
           
           <Link href='/contact-us'>
             <button className={"sign_in"}>
               connexion
               <Icon className={"fleshdown"} type="down" />
             </button>
           </Link> 
             
           </div>
                        </Menu>
                      </BurgerMenu.slide>
                    </div>
                );
              }
    }
    export default Navbarsearch;