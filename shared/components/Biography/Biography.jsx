import React, { useState } from 'react'
import './biography.scss'
import Collapse from '../Collapse/Collapse'
import bio from '../../../public/icon/bio.png'
import opps from '../../../public/icon/opps.png'
import experience from '../../../public/icon/experience.png'
import formation from '../../../public/icon/formation.png'
import certification from '../../../public/icon/certification.png'
import palmares from '../../../public/icon/palmares.png'

function Biography({ coachData, icon, title }) {
  return (
    <div className="biographyblock">
      {!coachData.aboutMe &&
      coachData.experiences.length == 0 &&
      coachData.education.length == 0 &&
      coachData.certification.length == 0 &&
      coachData.achievements.length == 0 ? (
        <div className="aucunBiographie">
          <img src={opps} alt="icon" />
          <div className="aucunBiographie__title">OOPS</div>
          <div className="aucunBiographie__message">
            Aucune Biographie trouvée
          </div>
        </div>
      ) : (
        <>
          {coachData && coachData.aboutMe && (
            <div className="biographieblock__biographie">
              {/* <div className={"biographieblock__biographie__linevertical"}></div> */}
              <img
                className="biographieblock__biographie__icon"
                src={bio}
                alt="bio"
              />
              <div className="biographieblock__biographie__title">
                Biographie
              </div>
              <div className="linebiographie" />

              <div className="biographieblock__biographie__contenu">
                {coachData.aboutMe}
              </div>
            </div>
          )}
          {coachData && coachData.experiences.length !== 0 && (
            <Collapse
              coachData={coachData.experiences}
              title="Expériences professionnelles"
              iconblock={experience}
            />
          )}
          {coachData && coachData.education.length != 0 && (
            <Collapse
              coachData={coachData.education}
              title="Formations"
              iconblock={formation}
            />
          )}
          {coachData && coachData.certification.length != 0 && (
            <Collapse
              coachData={coachData.certification}
              title="Certifications"
              iconblock={certification}
            />
          )}
          {coachData && coachData.achievements.length !== 0 && (
            <Collapse
              coachData={coachData.achievements}
              title="Palmarès professionnel"
              iconblock={palmares}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Biography
