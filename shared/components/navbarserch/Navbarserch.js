import css from './navbarserch.scss';
import { useState, useEffect,useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Icon,Input,Select   } from 'antd';

import club from '../../../public/icon/subforclub.svg'
import player from '../../../public/icon/subforplayer.svg'
import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Clubinfo from "../clubinfo/Clubinfo"
import React, { Component } from "react";
import MapContainer from "../mapConponnet/index"


 function Navbarserch({ props }) {
    const { Option } = Select;
    const { Search } = Input;
    
const mapStyles = {
  width: "10%",
  height: 50
};
    const data = {
        club: [
            {
                name: "Elite Sports Club",
                lieu: "Boulevard principal, rue des coquelicots, Villa n°24, La Marsa, Tunis",
                description: "Les membres de la section de tennis ont le droit de pratiquer le tennis de jour comme de nuit après réservation.",
                website:"isporit.tn"
            },
            {
                name: "ASM",
                lieu: "Boulevard principal, rue des coquelicots, Villa n°24, La Marsa, Tunis",
                description: "Les membres de la section de tennis ont le droit de pratiquer le tennis de jour comme de nuit après réservation.",
            }
        ]
    }
  

    const [data1, setdata] = useState(data.club);
   
   
    const sortbyname = (key)=>{
        let arrayCopy =data.club;
        arrayCopy.sort( (a, b) => a.name.length - b.name.length);
        console.log("okkkkk",arrayCopy)
        //arrayCopy.reverse(); for descending
         setdata(arrayCopy);
       
         console.log('data1',data1)
    }
    const Sherch = value => { 
       
        setdata(data.club.filter(e => e.name.includes(value)));
      }; 

    function onChange(value) {
        console.log(`selected ${value}`);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }
      function onChange(a, b, c) {
        console.log(a, b, c);
      }
      useEffect(() => {
        fetchPlaces=>(mapProps, map)=> {
          const { google } = mapProps;
         const service = new google.maps.places.PlacesService(map);
        
        }
      }, [])
    
    return (
        <div className={css.search}>
        <div className={css.navbarserch}>
            <div className={css.logo}>
                <Link href='/'>
                    <a><img src={"icon/logoindexpage.png"} alt="logo" /></a>
                </Link>
            </div>
      
            <Search
                placeholder="Cherchez un club de Tennis..."
                // onSearch={value => console.log(value)}

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
        <div className={css.selectfilter}>
            <Select
                defaultValue="Type d'activités (4)"
                showSearch
                className={css.search}
                style={{ width: 200}}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
        >
            <Option value="Type d'activités (4)">Type d'activités (4)</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
        <Select
            defaultValue="Distance"
            showSearch
            className={css.search}

            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="Distance">Distance</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>

        <Select
            defaultValue="Plus de filtres"
            showSearch
            className={css.search}

            style={{ width: 200 }}
            placeholder="Plus de filtres"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="Plus de filtres">Plus de filtres</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
      </div>
      <div className={css.clublist_map__link}>
                    <div>Accueil</div>
                    <div>/</div>
                    <div>Clubs partenaires</div>
        </div>
       <div className={css.clublist_map}>
            <div className={css.clublist_map__clubinfo}> 
               
                <div className={css.clublist_map__clubinfo__moredetais}>
                    <div className={css.clublist_map__clubinfo__detais}>
                        <div className={css.clublist_map__clubinfo__detais__title_chiffre}>
                            <div className={css.clublist_map__clubinfo__detais__title_chiffre__title}>
                                Clubs de Tennis se trouvant à Tunis
                            </div>
                            <div className={css.clublist_map__clubinfo__detais__title_chiffre__number}>
                                {data.club.length} Résultats
                            </div>
                        </div>
                        <div className={css.clublist_map__clubinfo__detais__sortby}>
                            <Select 
                            // onChange={(e) => sortArray(e.target.value)}
                            defaultValue="Plus de filtres"
                            showSearch
                            className={css.clublist_map__clubinfo__detais__sortby__search}
                            style={{ width: 100 }}
                            placeholder="Plus de filtres"
                            optionFilterProp="children"
                          //  onChange={onChange}
                           ///// onFocus={onFocus}
                           // onBlur={onBlur}
                          //  onSearch={onSearch}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* {data.club.map(el=>( */}
                            <Option value="Plus de filtres">Trier par</Option>
                            <Option value="lucy" onClick={(e) => sortbyname(data.club)}>name</Option>
                            <Option value="tom">Tom</Option>
                            {/* ))} */}
                        </Select>
                        </div>    
                    
                        
                    </div>
                    <div className={css.clublist_map__clubinfo__detais__mapcarousel}>
                    {/* <Carousel autoPlay className={css.carousel}> */}
                   {/* <Carousel autoPlay>
                        <div>
                            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
                        </div>
                        <div>
                        <   img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
                        </div>                    
                    </Carousel> */}
                        {data1.map((el,key)=>{
                            return ( <Clubinfo key={key} el={el}/> )
                        })}
                    </div>

                   </div>   
               
                <div className={css.clublist_map__clubinfo__map}>
                        <MapContainer />
                  </div>
            </div>
        </div>
        
      </div>
    
    );
    }
    export default Navbarserch;