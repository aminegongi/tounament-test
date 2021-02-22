import React, { useState } from 'react'
import css from './biographie.scss'
import down from "../../../public/icon/icondown.png"
import left from "../../../public/icon/iconleft.png"
import Collapse from '../Collapse/Collapse';
function Biographie({ title }) {
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
        <div className={css.biographieblock}>
            <div className={css.biographieblock__biographie}>
                {/* <div className={css.biographieblock__biographie__linevertical}></div> */}
                <img className={css.biographieblock__biographie__icon} src="../icon/bio.png" alt="" />
                <div className={css.biographieblock__biographie__title}>
                    Biographie
                </div>
                <div className={css.line}></div>

                <div className={css.biographieblock__biographie__contenu}>
                    Résultat de recherche d'images pour "description d'un coach sportif" Un coach sportif ou entraîneur
                    personnel est un professionnel chargé  d'assister des personnes dans leur entraînement physique.
                </div>
            </div>
           
            <Collapse title={"Expériences professionnelles" } iconblock={"../icon/experience.png"}/>
            <Collapse title={"Formations" } iconblock={"../icon/formation.png"}/>
            <Collapse title={"Certifications" } iconblock={"../icon/certification.png"}/>
            <Collapse title={"Palmarès professionnel" } iconblock={"../icon/palmares.png"}/>        
        </div>
    )
}

export default Biographie
