import css from '../shared/css/searchclub.scss'
import { useState, useEffect } from 'react';
import Clubinfo from "../shared/components/clubinfo/Clubinfo"
import _, { isEmpty } from 'lodash'
// import 'leaflet/dist/leaflet.css'
import axios from 'axios';

import Link from 'next/link';
import Navbarsearch from '../shared/components/navbarsearch/Navbarsearch';
import Mapclub from '../shared/components/map/Mapclub';

import { Input, Select, Skeleton } from 'antd';


const Indexs = (props) => {
    const { Option } = Select;
    const { Search } = Input;

    const [datacopy, setdata] = useState([]);
    const [datawebsite, setdatawebsite] = useState([]);
    const [isMobile, setIsMobile] = useState(false)
    const [serverData, setServerData] = useState([])
    const [showclub, setshowclub] = useState("liste");

    const fetchWebsitedata = async () => {
        const result = await axios.get("https://dev.isporit.com/api/Clubs/all?hasWebsite=true")
        
        setdatawebsite(result.data)
        setServerData(result.data)
    }
    useEffect(() => {
        fetchWebsitedata()
      
    }, [])
    
    const sortbyname = (key) => {
        const arrayCopy = datawebsite;
        if (key === 'name') (
            setdatawebsite(_.orderBy(arrayCopy, [user => user.title.toLowerCase()], ['asc']))
        )
        else (
            setdatawebsite(_.orderBy(arrayCopy, [user => user.title.toLowerCase()], ['desc']))
        )
    }
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
    return (
        <div>
            <Navbarsearch el={datawebsite} serverData={serverData} setshowclub={setshowclub} 
            showclub={showclub} img={"icon/logoindexpage.png"} setdatawebsite={setdatawebsite} />
            <div className={css.selectfilter}>
                <Select
                    defaultValue="Type d'activités (4)"
                    showSearch
                    className={css.search}
                    style={{ width: 170 }}
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
                    style={{ width: 110 }}
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

                    style={{ width: 150 }}
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

            <div className={css.linkclub__link}>
                <div>Accueil</div>
                <div>/</div>
                <div>Clubs partenaires</div>
            </div>
            <div className={ css.clublist_map  }>
                <div className={ showclub==="carte" ? css.clublist_map__clubinfo__detais : css.listeclubs}>
                    <div className={css.clublist_map__clubinfo__detais__title_sortby}>
                        <div className={css.clublist_map__clubinfo__detais__title_sortby__title_chiffre}>
                            <div className={css.clublist_map__clubinfo__detais__title_sortby__title_chiffre__title}>
                                Clubs de Tennis se trouvant à Tunis
                  </div>
                            <div className={css.clublist_map__clubinfo__detais__title_sortby__title_chiffre__number}>
                                {datawebsite.length} Résultats
                 </div>
                        </div>
                        <div className={css.clublist_map__clubinfo__detais__title_sortby__sortby}>
                            <Select
                                // defaultValue="Plus de filtres"
                                // showSearch
                                className={css.clublist_map__clubinfo__detais__title_sortby__sortby__search}
                                style={{ width: 100 }}
                                placeholder="Plus de filtres"
                                optionFilterProp="children"
                                // filterOption={(input, option) =>
                                //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // }
                                onChange={(e) => sortbyname(e)}
                            >
                                <Option value="Plus de filtres" >Trier par</Option>
                                <Option value="name" >Name</Option>
                                <Option value="desc">desc</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={css.clublist_map__clubinfo__detais__mapcarousel}>

                        {!isEmpty(datawebsite) ?
                            datawebsite.map((el, key) => {
                                return (<Clubinfo key={key} el={el} img={'../icon/tennislogo.svg'} />)
                            }) : <Skeleton />}

                    </div>

                </div>
                {/* <img className={css.imgmap} src="../icon/cartmap.png"  alt="phoneicon"></img> */}
                 <div  className={ showclub==="carte" ? css.mapshow: css.mapnotshow} > 
                <Mapclub />
                 </div> 

            </div>
        </div>

    )
};




export default (Indexs);