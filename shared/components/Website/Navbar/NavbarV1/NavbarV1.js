import css from './NavbarV1.scss';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useMediaPredicate } from "react-media-hook";
import BurgerMenu from 'react-burger-menu'
import { useState, useEffect } from 'react';
import { Icon,Menu} from 'antd';



function NavbarV1({ data, logo }) {
    console.log('data.contact.body.logo: ', data.contact.body.logo);
    const mobile = useMediaPredicate("(max-width: 850px)");

    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        if (mobile !== isMobile) {
            setIsMobile(mobile)
        }
    }, [mobile])
    console.log(mobile)
    return (
        <>
        {(!isMobile)?
        <div className={css.navbarV1}>
            <div className={css.navbarV1__container}>
                <div className={css.navbarV1__container__menu}>
                    <a href="#introduction" className={css.navbarV1__container__menu__text}>LE CLUB</a>
                    <a href="#staff" className={css.navbarV1__container__menu__text}>STAFF</a>
                    <a href="#prices" className={css.navbarV1__container__menu__text}>TARIFS</a>
                    <a href="#contact" className={css.navbarV1__container__menu__text}>CONTACT</a>
                </div>
                <div className={css.navbarV1__container__logo}>
                    <img src={logo} alt="" />
                </div>
                <div className={css.navbarV1__container__contact}>
                    <div className={css.navbarV1__container__contact__text}>
                        {data.contact.body.phoneNumber1} {!isEmpty(data.contact.body.phoneNumber1) && "/ " + data.contact.body.phoneNumber1}
                    </div>
                    <Link href="#contact">
                        <a >
                            <button onClick={() => { }} className={css.navbarV1__container__contact__join_button}>
                                <span>
                                    Rejoindre le club
                            </span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>:
        <div>
            <div className={css.navbarV1}>

                <div className={css.navbarV1__container__logo}>
                        <img src={logo} alt="" />
                </div>
            
                <div className={css.navbarV1__container__contact}>
                    {/* <div className={css.navbarV1__container__contact__text}>
                        {data.contact.body.phoneNumber1} {!isEmpty(data.contact.body.phoneNumber1) && "/ " + data.contact.body.phoneNumber1}
                    </div> */}
                    <Link href="#contact">
                        <a >
                            <button onClick={() => { }} className={css.navbarV1__container__contact__join_button}>
                                <span>
                                    Rejoindre le club
                                </span>
                            </button>
                        </a>
                    </Link>
                </div>
                <BurgerMenu.slide
                                styles={{
                                    bmBurgerButton: {
                                        // position: 'fixed',
                                        height: '30px',
                                        width: '30px',
                                        right: '15px',
                                        top: '80px',
                                        padding:'2.7rem'

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
                                   <div className={css.navbarV1__container__contact__text}>
                                         {data.contact.body.phoneNumber1} {!isEmpty(data.contact.body.phoneNumber1) && "/ " + data.contact.body.phoneNumber1}
                                    </div> 
                                        <div className={css.navbar__menutext}>LE CLUB</div>
                                        <div className={css.navbar__menutext}>STAFF</div>
                                        <div className={css.navbar__menutext}>TARIFS</div>
                                        <div className={css.navbar__menutext}>CONTACT</div>
                                       
                                    
                                </Menu>
                            </BurgerMenu.slide>
                
            </div>
        </div>
        }
        </>
    );
}
export default NavbarV1;