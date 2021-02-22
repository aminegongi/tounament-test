import React, { useState } from 'react'
import css from './collapse.scss'
import down from "../../../public/icon/icondown.png"
import left from "../../../public/icon/iconleft.png"
function Collapse({title,iconblock}) {
    const [icon, setIcon] = useState(left);

    const [iconExperiance, setIconExperiance] = useState(left);
    const changeIcon = () => {
        if (icon === down) {
            setIcon(left)
        }
        if (icon === left) {
            setIcon(down)
        }
    }
    const changeIconexperiance = () => {
        if (iconExperiance === down) {
            setIconExperiance(left)
        }
        if (iconExperiance === left) {
            setIconExperiance(down)
        }
    }
    return (
        <div className={css.biographieblock__Expériences}>
        <div className={css.biographieblock__biographie__linevertical}></div>
        <img className={css.biographieblock__biographie__icon} src={iconblock} alt="" />
        <div className={css.biographieblock__biographie__title}>
            {title}
        </div>
        <div className={css.line}></div>
        <div className={css.collapseblock}>
            <div className={css.biographieblock__biographie__contenu}>
                <div className={css.biographieblock__biographie__contenu__collapse}>
                    <div className={css.biographieblock__biographie__contenu__collapse__titledate} onClick={() => changeIcon()}>
                        <div className={css.biographieblock__biographie__contenu__collapse__titledate__title}>
                            Salle de sport: Arena
                    </div>
                        <div className={css.biographieblock__biographie__contenu__collapse__dateicon}>

                            <div className={css.biographieblock__biographie__contenu__collapse__dateicon__date}>
                                Jan 2020 - Sep 2020
                        </div>
                            <img src={icon} className={icon === down ? css.down : css.left} alt="" />

                        </div>
                    </div>

                    {icon == down &&
                        <div className={css.biographieblock__biographie__contenu__collapse__contenuShow} >

                            Résultat de recherche d'images pour "description d'un
                            coach sportif"Un coach sportif ou entraîneur personnel
                            est un professionnel chargé d'assister des personnes
                            dans leur entraînement physique.
                    </div>

                    }

                </div>
            </div>
            <div className={css.biographieblock__biographie__contenu}>
                <div className={css.biographieblock__biographie__contenu__collapse}>
                    <div className={css.biographieblock__biographie__contenu__collapse__titledate} 
                    onClick={() => changeIconexperiance()}>
                        <div className={css.biographieblock__biographie__contenu__collapse__titledate__title}>
                            Salle de sport: Arena
                    </div>
                        <div className={css.biographieblock__biographie__contenu__collapse__dateicon}>

                            <div className={css.biographieblock__biographie__contenu__collapse__dateicon__date}>
                                Jan 2020 - Sep 2020
                        </div>
                            <img src={iconExperiance} className={iconExperiance === down ? css.down : css.left} alt="" />

                        </div>
                    </div>

                    {iconExperiance == down &&
                        <div className={css.biographieblock__biographie__contenu__collapse__contenuShow} >

                            Résultat de recherche d'images pour "description d'un
                            coach sportif"Un coach sportif ou entraîneur personnel
                            est un professionnel chargé d'assister des personnes
                            dans leur entraînement physique.
                    </div>

                    }

                </div>
            </div>
        </div>
    </div>
    )
}

export default Collapse
