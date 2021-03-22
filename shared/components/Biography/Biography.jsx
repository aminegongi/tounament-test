import React, { useState } from 'react'
import './biography.scss'
import Collapse from '../Collapse/Collapse'
import bio from '../../../public/icon/bio.png'
import opps from '../../../public/icon/opps.png'
import experience from '../../../public/icon/experience.png'
import formation from '../../../public/icon/formation.png'
import certification from '../../../public/icon/certification.png'
import palmares from '../../../public/icon/palmares.png'
import CoachProfileSection from '../CoachProfileSection'

function Biography({ coachData }) {
  console.log('coachData: ', coachData)
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
        <div className="biographyblock__blocks">
          {coachData && coachData.aboutMe && (
            <CoachProfileSection title="Biographie" icon={bio}>
              <div className="biographieblock__biographie__contenu">
                {coachData.aboutMe}
              </div>
            </CoachProfileSection>
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
        </div>
      )}
    </div>
  )
}

export default Biography
