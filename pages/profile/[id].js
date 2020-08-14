import css from '../../shared/css/profileplayer.scss'
import { useState, useEffect, useRef } from 'react';
import _, { isEmpty } from 'lodash'
import fetch from 'isomorphic-unfetch'

// import 'leaflet/dist/leaflet.css'
import axios from 'axios';
import globalCss from '../../shared/global-style.scss'

import Link from 'next/link';
import Navbarsearch from '../../shared/components/navbarsearch/Navbarsearch';
import Achivements from '../../shared/components/Achivements/achivements';
import { useRouter } from "next/router";

import { Input, Select,Timeline  } from 'antd';
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'


const Indexs = ({props,data,message}) => {

    const { Option } = Select;
    const { Search } = Input;  
    const router = useRouter();
    const [datawebsitebyid, setdatawebsitebyid] = useState({});
    const mobile = useMediaPredicate("(max-width: 850px)");
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [datacopy, setdata] = useState([]);
    const [datawebsite, setdatawebsite] = useState([]);


    // if (status === 401) {
    //     return (
    //         // <div className={"css.clubWebsite"}>
    //         <div>
    //             unauthorized
    //         </div>
    //     )
    // }

    // if (status === 404) {
    //     return (
    //         // <div className={"css.clubWebsite"}>
    //         <div>
    //             not found
    //         </div>
    //     )
    // }
    // if (status === 200) {
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
                                 {data.firstName +" " + data.lastName}
                             </div>
                             <div className={css.profilplayer__infoplayer__img_name__name_mail__mail}>
                             {data.email}
                             </div>
                             <div className={css.profilplayer__infoplayer__img_name__name_mail__addsport}>
                                <div value="Ajouter un sport" >
                                      <div>Ajouter un sport</div>
                                </div>
                             </div>
                         </div>
                     </div>
               

                <div className={css.profilplayer__infoplayer__number}>
                    <div className={css.profilplayer__infoplayer__number__numberplayer}>Numéro :</div>
                    <div className={css.profilplayer__infoplayer__number__numberchiffre}> {data.phoneNumber}</div>
                </div>
                 <div className={css.profilplayer__infoplayer__address}>
                    <div className={css.profilplayer__infoplayer__address__addressplayer}>Adresse :</div>
                    <div className={css.profilplayer__infoplayer__address__addressname}> {data.country}</div>
                 </div>
                        <a href={data.facebookLink}>
                        <img src="../icon/facebookicon.svg" className={css.profilplayer__infoplayer__img} alt="fb" ></img>

                        </a>
                </div>
                   <Achivements title='Expérience'  data={data.experiences}/>
                   <Achivements title='Palmarès'  data={data.achievements}/>

            </div>
          
        </div>
      )
    // }   
}
    
    
    Indexs.getInitialProps = async (ctx) => {
    const res = await fetch("https://dev.api.isporit.com/users/slug/" + ctx.query.id)
    const json = await res.json()

    if (json.website) {
        return { status: 200, data: json.website, clubName: json.title, logo: json.logo }
    }
    // if (json.website && json.website.isPublished) {
    //     return { status: 200, data: json.website }
    // }
    // if (json.website && !json.website.isPublished) {
    //     return { status: 401, data: json.website }
    // }
    if (json.message === "clubNotFound") {
        return { status: 404, data: json }
    }
    return { status: 500, data: json }

}
    
    
    export default (Indexs);