import React, { useState } from 'react'
import css from './biographie.scss'
import down from "../../../public/icon/icondown.png"
import left from "../../../public/icon/iconleft.png"
import Collapse from '../Collapse/Collapse';
function Biographie({ coachData }) {


    return (
        <div className={css.biographieblock}>
                  { !coachData.aboutMe && coachData.experiences.length == 0
                && coachData.education.length == 0
                && coachData.certification.length == 0
                && coachData.achievements.length == 0 ?
                <div className={css.aucunBiographie}>
                    <img src="../icon/opps.png" alt="icon" />
                    <div className={css.aucunBiographie__title}>OOPS</div>
                    <div className={css.aucunBiographie__message}>Aucun Bigraphie trouvé</div>
                </div>
                :
                <>
                    {coachData.aboutMe ?
                        <div className={css.biographieblock__biographie}>
                            {/* <div className={css.biographieblock__biographie__linevertical}></div> */}
                            <img className={css.biographieblock__biographie__icon} src="../icon/bio.png" alt="" />
                            <div className={css.biographieblock__biographie__title}>
                                Biographie
                        </div>
                            <div className={css.line}></div>

                            <div className={css.biographieblock__biographie__contenu}>
                                {coachData.aboutMe}
                            </div>
                        </div>
                        : ""}
                    {coachData.experiences.length !== 0 ?
                        <Collapse coachData={coachData.experiences} title={"Expériences professionnelles"} iconblock={"../icon/experience.png"} />
                        : ""}
                    {coachData.education.length != 0 ?

                        <Collapse coachData={coachData.education} title={"Formations"} iconblock={"../icon/formation.png"} /> : ""}
                    {coachData.certification.length != 0 ?

                        <Collapse coachData={coachData.certification} title={"Certifications"} iconblock={"../icon/certification.png"} /> : ""}
                    {coachData.achievements.length !== 0 ?
                        <Collapse coachData={coachData.achievements} title={"Palmarès professionnel"} iconblock={"../icon/palmares.png"} /> : ""}
                </>}
        </div>
    )
}

export default Biographie
