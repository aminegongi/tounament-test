import css from '../shared/css/profileplayer.scss'
import { useState, useEffect, useRef } from 'react';
import _, { isEmpty } from 'lodash'
// import 'leaflet/dist/leaflet.css'
import axios from 'axios';
import globalCss from '../shared/global-style.scss'

import Link from 'next/link';
import Navbarsearch from '../shared/components/navbarsearch/Navbarsearch';
import { useRouter } from "next/router";

import { Input, Select,Timeline  } from 'antd';
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'


const Indexs = (props) => {

    const { Option } = Select;
    const { Search } = Input;  
    const router = useRouter();
    const [datawebsitebyid, setdatawebsitebyid] = useState({});
    const mobile = useMediaPredicate("(max-width: 850px)");
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [datacopy, setdata] = useState([]);
    const [datawebsite, setdatawebsite] = useState([]);


    const fetchWebsitedata = async () => {
        const result = await axios.get("https://dev.api.isporit.com/Clubs/slug/" + router.query.id)
        
        setdatawebsite(result.data)
    }
    useEffect(() => {
        fetchWebsitedata()
    }, [])
    
    return (
        <div>
            <div className={css.navbar}>
                <Navbarsearch img={"../icon/logoindexpage.png"} el={datawebsite}  setdatawebsite={setdatawebsite} />
            </div>
           <div className={css.profilplayer}>
                <div className={css.profilplayer__title}>
                    Profil
                </div>
                <div className={css.profilplayer__informationtitle}>
                     Informations personnelles
                </div>
                <div className={css.profilplayer__infoplayer}>
                    <div className={css.profilplayer__infoplayer__img_name}>
                        <div className={css.profilplayer__infoplayer__img_name__img}>
                            <img src={"../icon/avatar.png"} alt="imgj"></img>
                        </div>   
                         <div className={css.profilplayer__infoplayer__img_name__name_mail}>
                            <div className={css.profilplayer__infoplayer__img_name__name_mail__name}>
                                 Aida Ben Salah
                             </div>
                             <div className={css.profilplayer__infoplayer__img_name__name_mail__mail}>
                             Aidabensalah@gmail.com
                             </div>
                             <div className={css.profilplayer__infoplayer__img_name__name_mail__addsport}>
                                <div value="Ajouter un sport" >
                                      <div>Ajouter un sport</div>
                                </div>
                             </div>
                         </div>
                     </div>
                <div className={css.profilplayer__infoplayer__clubinfo}>

                    <div className={css.profilplayer__infoplayer__clubinfo__clubnow}>
                        <div className={css.profilplayer__infoplayer__clubinfo__clubnow__club}>club :</div>
                        <div className={css.profilplayer__infoplayer__clubinfo__clubnow__clubname}>ASM</div>
                    </div>
                    <div className={css.profilplayer__infoplayer__clubinfo__clubprevious}>
                        <div className={css.profilplayer__infoplayer__clubinfo__clubprevious__club}>Club précédent : </div>

                        <div className={css.profilplayer__infoplayer__clubinfo__clubprevious__clubname}>ASM</div>
                    </div>
                </div>
                <div className={css.profilplayer__infoplayer__number}>
                    <div className={css.profilplayer__infoplayer__number__numberplayer}>Numéro :</div>
                    <div className={css.profilplayer__infoplayer__number__numberchiffre}> 53 596 369</div>
                </div>
                 <div className={css.profilplayer__infoplayer__address}>
                    <div className={css.profilplayer__infoplayer__address__addressplayer}>Adresse :</div>
                    <div className={css.profilplayer__infoplayer__address__addressname}> La Marsa</div>
                 </div>
                    <img src="icon/facebookicon.svg" className={css.profilplayer__infoplayer__img} alt="fb" ></img>
                </div>
                <div className={css.profilplayer__experiencetitle}>
                     Expérience
                </div>
                <div className={css.profilplayer__all_experience}>
                    
                </div>
            
                <Timeline className={css.timeline} >
                <Timeline.Item>
                    <div className={css.playerexperiance}>
                        <div className={css.playerexperiance__title}>
                            <div className={css.playerexperiance__title__clubtitle}>
                                Hammam Lif Center 
                            </div>
                            <div className={css.playerexperiance__title__date}>
                                (Mai 2017-Avril 2018)
                            </div>
                         </div>
                         <div className={css.playerexperiance__description}>
                            lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset
                            abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem 
                            Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim
                            dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor
                            aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem 
                            Ipsum dolor aset.
                         </div>
                    </div>
                         
                    </Timeline.Item>

                    <Timeline.Item>
                    <div className={css.playerexperiance}>
                        <div className={css.playerexperiance__title}>
                            <div className={css.playerexperiance__title__clubtitle}>
                                Hammam Lif Center 
                            </div>
                            <div className={css.playerexperiance__title__date}>
                                (Mai 2017-Avril 2018)
                            </div>
                         </div>
                         <div className={css.playerexperiance__description}>
                            lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset
                            abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem 
                            Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim
                            dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor
                            aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem 
                            Ipsum dolor aset.
                         </div>
                    </div>
                         
                    </Timeline.Item>
                
            </Timeline>
        
            </div>
        
        </div>
      )
    };
    
    
    
    
    export default (Indexs);