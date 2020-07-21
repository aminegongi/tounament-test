import css from '../../shared/css/profileplayer.scss'
import { useState, useEffect, useRef } from 'react';
import _, { isEmpty } from 'lodash'
// import 'leaflet/dist/leaflet.css'
import axios from 'axios';

import Link from 'next/link';
import Navbarsearch from '../../shared/components/navbarsearch/Navbarsearch';
import { useRouter } from "next/router";

import { Input, Select,Skeleton } from 'antd';
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
           <div className={profilplayer}>
                <div className={css.profilplayer__title}>
                    Profil
                </div>
                <div className={css.profilplayer__informationtitle}>
                     Informations personnelles
                </div>
                <div className={css.profilplayer__infoplayer}>
                    <div className={css.profilplayer__infoplayer__img_name}>
                        <div className={css.profilplayer__infoplayer__img_name__img}>
                            <img src={"../icon/logoindexpage.png"} alt="imgj"></img>
                        </div>   
                         <div className={css.profilplayer__infoplayer__img_name__name_mail}>
                            <div className={css.profilplayer__infoplayer__img_name__name_mail__name}>
                                 Aida Ben Salah
                             </div>
                             <div className={css.profilplayer__infoplayer__img_name__name_mail__mail}>
                             Aidabensalah@gmail.com
                             </div>
                             <div className={css.profilplayer__infoplayer__img_name__name_mail__addsport}>
                                 <button value="Ajouter un sport" >Ajouter un sport</button>
                             </div>
                         </div>
                     </div>
                <div className={css.profilplayer__infoplayer__clubinfo}>

                    <div className={css.profilplayer__infoplayer__clubinfo__clubnow}>
                        <div>club :</div>
                        <div>ASM</div>
                    </div>
                    <div className={css.profilplayer__infoplayer__clubinfo__clubprevious}>
                        <div>club :</div>
                        <div>ASM</div>
                    </div>
                </div>
                <div className={css.profilplayer__infoplayer__number}>
                    <div>Numéro :</div>
                    <div> 53 596 369</div>
                </div>
                 <div className={css.profilplayer__infoplayer__address}>
                    <div>Adresse :</div>
                    <div> La Marsa</div>
                 </div>
                 <img src="" alt="fb" ></img>
                </div>
                <div className={css.profilplayer__experiencetitle}>
                     Expérience
                </div>
                <div className={css.profilplayer__all_experience}>
                    
                </div>
            
            </div>
        </div>
      )
    };
    
    
    
    
    export default (Indexs);