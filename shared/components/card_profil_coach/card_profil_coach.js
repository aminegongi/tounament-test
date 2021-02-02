import React,{useState,useEffect} from 'react'
import css from './card_profil_coach.scss'
import { Rate  } from 'antd';

export default function card_profil_coach({coachprofil,key,jobs}) {
const [img, setimg] = useState(coachprofil.profilePicture ?
 "http://isporit.com/api/"+coachprofil.profilePicture :
 "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Hoodie&clotheColor=Blue03&eyeType=Close&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Light")
const [sum, setsum] = useState(Math.round((coachprofil.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/coachprofil.coachData.reviews.length)))
const [specialtyofCoach, setspecialtyofCoach] = useState()
useEffect(() => {
    setspecialtyofCoach(jobs.find(job=>job._id == (coachprofil.coachData.job)))
}, [coachprofil,key])
    return (
        <div className={css.card_profil_coach}>
            <div className={css.card_profil_coach__information} >
              <div className={css.card_profil_coach__information__avatar} >
                    <img src=
                    {img}
                    />
                </div>
                <div className={css.card_profil_coach__information__name} >
                     {coachprofil.firstName}{' '}{coachprofil.lastName}
                </div>

                <div className={css.card_profil_coach__information__rate}>
                    <Rate  disabled defaultValue={sum}
                     className={css.rate} />

                </div>
                <div className={css.card_profil_coach__information__worktype}>
                    
                       {   specialtyofCoach ? specialtyofCoach.translations.fr : specialtyofCoach}

                      
                   </div>
                <div className={css.card_profil_coach__information__sporttype}>
              
                    {coachprofil.coachData.specialty}
                </div>
                <div className={css.card_profil_coach__information__yearexperience }>
                      {coachprofil.coachData.experiencesYearsNumber == 1 ?
                      ( coachprofil.coachData.experiencesYearsNumber + " an d'expérience") : 
                      coachprofil.coachData.experiencesYearsNumber  + " ans d'expérience"
                       }
                </div>
                


            </div>  
            <div className={css.line}></div> 

            <div className={css.card_profil_coach__button}>
                    <button className={css.card_profil_coach__button__contact}>
                    Contacter
                    </button>
                    {/* <div className={css.linevertical}></div>  */}

                    <button className={css.card_profil_coach__button__seeDetails}>
                    Voir plus
                    </button>

                </div>         
        </div>
    )
}
