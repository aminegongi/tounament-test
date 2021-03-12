import React, { useState } from 'react'
import  './biography.scss'
import down from "../../../public/icon/icondown.png"
import left from "../../../public/icon/iconleft.png"
import Collapse from '../Collapse/Collapse';
function Biography({ coachData }) {


    return (
        <div className={"biographyblock"}>
                  { !coachData.aboutMe && coachData.experiences.length == 0
                && coachData.education.length == 0
                && coachData.certification.length == 0
                && coachData.achievements.length == 0 ?
                <div className={"aucunBiographie"}>
                    <img src="../icon/opps.png" alt="icon" />
                    <div className={"aucunBiographie__title"}>OOPS</div>
                    <div className={"aucunBiographie__message"}>Aucune Biographie trouvée</div>
                </div>
                :
                <>
                    {coachData && coachData.aboutMe &&
                        <div className={"biographieblock__biographie"}>
                            {/* <div className={"biographieblock__biographie__linevertical"}></div> */}
                            <img className={"biographieblock__biographie__icon"} src="../icon/bio.png" alt="" />
                            <div className={"biographieblock__biographie__title"}>
                                Biographie
                        </div>
                            <div className={"linebiographie"}></div>

                            <div className={"biographieblock__biographie__contenu"}>
                                {coachData.aboutMe}
                            </div>
                        </div>
                        }
                    {coachData && coachData.experiences.length !== 0 &&
                        <Collapse coachData={coachData.experiences} title={"Expériences professionnelles"} iconblock={"../icon/experience.png"} />
                        }
                    {coachData && coachData.education.length != 0 &&

                        <Collapse coachData={coachData.education} title={"Formations"} iconblock={"../icon/formation.png"} /> }
                    {coachData && coachData.certification.length != 0 &&

                        <Collapse coachData={coachData.certification} title={"Certifications"} iconblock={"../icon/certification.png"} /> }
                    {coachData && coachData.achievements.length !== 0 &&
                        <Collapse coachData={coachData.achievements} title={"Palmarès professionnel"} iconblock={"../icon/palmares.png"} /> }
                </>}
        </div>
    )
}

export default Biography
