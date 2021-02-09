import React, { useState, useEffect } from 'react'
import css from './headerCoachProfile.scss'
import BurgerMenu from 'react-burger-menu'
import { useMediaPredicate } from "react-media-hook";
import { Icon, Input, Select, Menu, Skeleton } from 'antd';

export default function HeaderCoachProfile() {


    const mobile = useMediaPredicate("(max-width: 550px)");
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        if (mobile !== isMobile) {
            setIsMobile(mobile)
        }
    }, [mobile])
    console.log("IsMobile", isMobile)
    return (
        <div className={css.header}>
            <div className={css.header__body}>
                {isMenuOpen==false ? 
                <img src={"../../../icon/logoindexpage.png"} className={css.header__body__imglogo} alt="logo" />
                :""}
                {(!isMobile) ?
                    <>
                        <div className={css.header__body__pages}>
                            <div className={css.header__body__pages__composant}>Entraîneur</div>
                            <div className={css.header__body__pages__composant}>Club management</div>
                            <div className={css.header__body__pages__composant}>Clubs partenaires</div>
                            <div className={css.header__body__pages__composant}>Contact</div>

                        </div>
                        <button className={css.header__body__inscrirebutton}><span>S'inscrire gratuitement</span></button>
                    </>
                    :
                    <>
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
                                <div className={css.BurgerMenu} >
                                    <div className={css.header__body__pages__composant}>Entraîneur</div>
                                    <div className={css.header__body__pages__composant}>Club management</div>
                                    <div className={css.header__body__pages__composant}>Clubs partenaires</div>
                                    <div className={css.header__body__pages__composant}>Contact</div>
                                    <button className={css.header__body__inscrirebutton}><span>S'inscrire gratuitement</span></button>
                                </div>
                            </Menu>
                        </BurgerMenu.slide>
                    </>}
            </div>
        </div>
    )
}
