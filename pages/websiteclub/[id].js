import logoblanc from '../../public/icon/logobanc.svg'
import css from '../../shared/css/website.scss'
import { useState, useEffect } from 'react';
// import data from '../data'
import { useRouter } from "next/router";

import Link from 'next/link';
import routes from '../../utils/routes';
import Clublogo from '../../shared/components/clublogo/Clublogo'
import Grubhub from '../../public/icon/Grubhub.png'
import logoclub from '../../public/icon/logo_club.png'
import mapicon from '../../public/icon/mapicon.svg'
import phoneicon from '../../public/icon/phoneicon.svg'
import cartemap from '../../public/icon/cartmap.png'
import IntroductionV1 from '../../shared/components/IntroductionV1/IntroductionV1'
import DetailsV1 from '../../shared/components/Website/Details/DetailsV1/DetailsV1'
import StaffV1 from '../../shared/components/Website/Staff/StaffV1/StaffV1'
import PartnersV1 from '../../shared/components/PartnersV1/PartnersV1'
import ContactV1 from '../../shared/components/ContactV1/ContactV1'
import Member from '../../shared/components/member/Member'
import PriceV1 from '../../shared/components/PriceV1/PriceV1'
import Navbar from '../../shared/components/Navbar/Navbar';
import axios from 'axios';

import imgpost from '../../public/icon/post_img.png'
import { isEmpty } from 'lodash';
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'
import { Icon, Input, Select, Menu, Skeleton } from 'antd';



const Indexs = (props) => {
    const router = useRouter();
    const [datawebsitebyid, setdatawebsitebyid] = useState({});
    const mobile = useMediaPredicate("(max-width: 850px)");
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const fetchWebsitedatabyid = async () => {
        const result = await axios.get("https://dev.api.isporit.com/Clubs/slug/" + router.query.id)


        setdatawebsitebyid(result)
    }
    useEffect(() => {
        fetchWebsitedatabyid()
        if (mobile !== isMobile) {
            setIsMobile(mobile)
        }
    }, [])

    return (
        <>

            <div >

                <div className={css.headerblock}>

                    <img className={css.headerblock__img} src={logoblanc} alt="logo" />

                    <span className={css.headerblock__connexion}>Connexion</span>
                </div>
                {(!isMobile) ?

                    <div className={css.navbar}>
                        <div className={css.navbar__menutext}>LE CLUB</div>
                        <div className={css.navbar__menutext}>STAFF</div>
                        <div className={css.navbar__menutext}>TARIFS</div>
                        <div className={css.navbar__menutext}>CONTACT</div>
                        <img className={css.navbar__imglogoclub} src={datawebsitebyid.data ? datawebsitebyid.data.logo : ""}
                            alt=""></img>
                        <div className={css.navbar__menutext}>
                            {datawebsitebyid.data ? (datawebsitebyid.data.phoneNumber2 && datawebsitebyid.data.phoneNumber1 ?
                                datawebsitebyid.data.phoneNumber1 + " / " + datawebsitebyid.data.phoneNumber2 :
                                datawebsitebyid.data.phoneNumber1) : ""}
                        </div>
                        <button onClick={() => window.location.href = "/contact-us"} className={css.navbar__rejoindrebutton}><span>Rejoindre le club</span></button>
                    </div>
                    :
                    <div>
                        <div className={css.navbar}>

                            <img className={css.navbar__imglogoclub} src={datawebsitebyid.data ? datawebsitebyid.data.logo : ""}
                                alt=""></img>
                            <div className={css.navbar__menutext}>
                                {datawebsitebyid.data ? (datawebsitebyid.data.phoneNumber2 && datawebsitebyid.data.phoneNumber1 ?
                                    datawebsitebyid.data.phoneNumber1 + " / " + datawebsitebyid.data.phoneNumber2 :
                                    datawebsitebyid.data.phoneNumber1) : ""}
                            </div>
                            <BurgerMenu.slide
                                styles={{
                                    bmBurgerButton: {
                                        // position: 'fixed',
                                        height: '30px',
                                        width: '30px',
                                        right: '15px',
                                        top: '80px'
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
                                customBurgerIcon={!isMenuOpen ? <Icon type="menu" /> : <Icon className={css.buttonclose} type="close" />}
                                customCrossIcon={false}
                                noOverlay={false}
                            >
                                <Menu
                                    mode="inline"
                                    defaultOpenKeys={['sub1']}
                                    style={{ border: "none" }}
                                >

                                    <div className={css.navbar__menutext}>LE CLUB</div>
                                    <div className={css.navbar__menutext}>STAFF</div>
                                    <div className={css.navbar__menutext}>TARIFS</div>
                                    <div className={css.navbar__menutext}>CONTACT</div>


                                    <button onClick={() => window.location.href = "/contact-us"} className={css.navbar__rejoindrebutton}><span>Rejoindre le club</span></button>
                                </Menu>
                            </BurgerMenu.slide>
                        </div>

                    </div>
                }

                {!isEmpty(datawebsitebyid) ?
                    datawebsitebyid.data && datawebsitebyid.data.website ? datawebsitebyid.data.website.sectionOrder.map(section => {


                        if (section === "introduction") {
                            switch (datawebsitebyid.data.website[section].version) {
                                case "1":
                                    return (

                                        <IntroductionV1 data={datawebsitebyid.data.website.introduction} />
                                    )
                                case "2":
                                    return (
                                        <h1>test</h1>
                                    )
                            }
                        }
                        if (section === "details") {
                            switch (datawebsitebyid.data.website[section].version) {
                                case "1":
                                    return (
                                        <DetailsV1 data={datawebsitebyid.data.website.details} />
                                    )
                            }
                        }
                        if (section === "staff") {
                            switch (datawebsitebyid.data.website[section].version) {
                                case "1":
                                    if (datawebsitebyid.data.website.staff.body.members.find(el => !isEmpty(el.firstName))) {
                                        return (

                                            <StaffV1 data={datawebsitebyid.data.website.staff} />
                                        )
                                    }

                            }
                        }
                        if (section === "prices") {
                            switch (datawebsitebyid.data.website[section].version) {
                                case "1":
                                    return (

                                        <PriceV1 data={datawebsitebyid.data.website.prices} />
                                    )
                            }
                        }
                        if (section === "partners") {
                            switch (datawebsitebyid.data.website[section].version) {
                                case "1":
                                    if (datawebsitebyid.data.website.partners.body.find(el => !isEmpty(el.image))) {
                                        return (

                                            <PartnersV1 data={datawebsitebyid.data.website.partners} />
                                        )
                                    }
                            }
                        }

                        if (section === "contact") {
                            switch (datawebsitebyid.data.website[section].version) {
                                case "1":
                                    return (
                                        <ContactV1 mapicon={mapicon} phoneicon={phoneicon}
                                            fb={"../icon/facebook.svg"} instagram={"../icon/instagram.svg"}
                                            data={datawebsitebyid.data} />
                                    )
                            }
                        }
                    })
                        :
                        <div className={css.navbar}>
                            <img className={css.navbar__imglogoclub} src={datawebsitebyid.data ? datawebsitebyid.data.logo : ""}
                                alt=""></img>
                        </div>


                    : <Skeleton avatar paragraph={{ rows: 4 }} />}
                <div className={css.footer}>
                    <Navbar isFooter />
                </div>
            </div>


        </>
    )
}

Indexs.propTypes = {
    // t: PropTypes.func.isRequired,

}

export default Indexs