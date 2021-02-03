import React,{useState,useEffect} from 'react'
import css from './card_profil_coach.scss'
import { Rate  } from 'antd';

export default function card_profil_coach({coachProfile,key,job,specialty}) {

const [img, setimg] = useState(coachProfile.profilePicture ?
 "http://isporit.com/api/"+coachProfile.profilePicture :
 "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Hoodie&clotheColor=Blue03&eyeType=Close&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Light")
const [sum, setsum] = useState(Math.round((coachProfile.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/coachProfile.coachData.reviews.length)))
useEffect(() => {
}, [coachProfile,key])
    return (
        <div className={css.card_profil_coach}>
            <div className={css.card_profil_coach__information} >
              <div className={css.card_profil_coach__information__avatar} >
                    <img src=
                    {img}
                    />
                </div>
                <div className={css.card_profil_coach__information__name} >
                     {coachProfile.firstName}{' '}{coachProfile.lastName}
                </div>

                <div className={css.card_profil_coach__information__rate}>
                    <Rate  disabled defaultValue={sum}
                     className={css.rate} />

                </div>
                <div className={css.card_profil_coach__information__worktype}>
                    
                       {job.translations.fr}

                      
                   </div>
                <div className={css.card_profil_coach__information__sporttype}>
              {specialty.translations.fr}
                </div>
                <div className={css.card_profil_coach__information__yearexperience }>
                      {coachProfile.coachData.experiencesYearsNumber == 1 ?
                      ( coachProfile.coachData.experiencesYearsNumber + " an d'expérience") : 
                      coachProfile.coachData.experiencesYearsNumber  + " ans d'expérience"
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
