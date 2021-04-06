import React, { useState } from 'react'
import './biography.scss'
import { isEmpty } from 'lodash'
import Collapse from '../Collapse/Collapse'
import bio from '../../../public/icon/bio.png'
import opps from '../../../public/icon/opps.png'
import experience from '../../../public/icon/experience.png'
import formation from '../../../public/icon/formation.png'
import certification from '../../../public/icon/certification.png'
import palmares from '../../../public/icon/palmares.png'
import CoachProfileSection from '../CoachProfileSection'
import { nl2br } from '../../../utils/string.utils'

function Biography({ coachProfile }) {
  return (
    <div className="biographyblock">
      {!coachProfile.coachData &&
      !coachProfile.coachData.aboutMe &&
      !isEmpty(coachProfile.experiences) &&
      !isEmpty(coachProfile.education) &&
      !isEmpty(coachProfile.certification) &&
      !isEmpty(coachProfile.achievements) ? (
        <div className="aucunBiographie">
          <img src={opps} alt="icon" />
          <div className="aucunBiographie__title">OOPS</div>
          <div className="aucunBiographie__message">
            Aucune Biographie trouvée
          </div>
        </div>
      ) : (
        <div className="biographyblock__blocks">
          {coachProfile.coachData && coachProfile.coachData.aboutMe && (
            <CoachProfileSection title="Biographie" icon={bio}>
              <div
                className="biographieblock__biographie__contenu"
                dangerouslySetInnerHTML={{ __html:nl2br(coachProfile.coachData.aboutMe)}}
              />
            </CoachProfileSection>
          )}
          {coachProfile.coachData &&
            !isEmpty(coachProfile.coachData.experiences) && (
              <Collapse
                data={coachProfile.coachData.experiences}
                title="Expériences professionnelles"
                iconblock={experience}
              />
            )}
          {coachProfile.coachData &&
            !isEmpty(coachProfile.coachData.education) && (
              <Collapse
                data={coachProfile.coachData.education}
                title="Formations"
                iconblock={formation}
              />
            )}
          {coachProfile.coachData &&
            !isEmpty(coachProfile.coachData.certifications) && (
              <Collapse
                data={coachProfile.coachData.certifications}
                title="Certifications"
                iconblock={certification}
              />
            )}
          {coachProfile.coachData &&
            !isEmpty(coachProfile.coachData.achievements) && (
              <Collapse
                data={coachProfile.coachData.achievements}
                // title="Palmarès professionnel"
                title="Palmarès entraineur"
                iconblock={palmares}
              />
            )}
          {coachProfile.coachData &&
            coachProfile.coachData.playerData &&
            coachProfile.coachData.playerData.achievements &&
            !isEmpty(coachProfile.coachData.playerData.achievements) && (
              <Collapse
                data={coachProfile.coachData.playerData.achievements}
                // title="Palmarès professionnel"
                title="Palmarès joueur"
                iconblock={palmares}
              />
            )}
        </div>
      )}
    </div>
  )
}

export default Biography
