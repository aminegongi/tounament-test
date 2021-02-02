import React,{useState,useEffect} from 'react'
import css from './card_profil_coach.scss'
import { Rate  } from 'antd';

export default function card_profil_coach({data,key,jobs}) {
const [img, setimg] = useState(data.profilePicture ?
 "http://isporit.com/api/"+data.profilePicture :
 "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Hoodie&clotheColor=Blue03&eyeType=Close&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Light")
const [sum, setsum] = useState(Math.round((data.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/data.coachData.reviews.length)))
const [specialtyofcoach, setspecialtyofcoach] = useState()
useEffect(() => {
    setspecialtyofcoach(jobs.find(e=>e._id == (data.coachData.job)))
}, [data,key])
    return (
        <div className={css.card_profil_coach}>
            <div className={css.card_profil_coach__information} >
              <div className={css.card_profil_coach__information__avatar} >
                    <img src=
                    {img}
                    />
                </div>
                <div className={css.card_profil_coach__information__name} >
                     {data.firstName}{' '}{data.lastName}
                </div>

                <div className={css.card_profil_coach__information__rate}>
                    <Rate  disabled defaultValue={sum}
                     className={css.rate} />

                </div>
                <div className={css.card_profil_coach__information__worktype}>
                    
                       {   specialtyofcoach ? specialtyofcoach.translations.fr : specialtyofcoach}

                      
                   </div>
                <div className={css.card_profil_coach__information__sporttype}>
              
                    {data.coachData.specialty}
                </div>
                <div className={css.card_profil_coach__information__yearexperiance}>
                      {data.coachData.experiencesYearsNumber == 1 ?
                      ( data.coachData.experiencesYearsNumber + " an d'expérience") : 
                       data.coachData.experiencesYearsNumber  + " ans d'expérience"
                       }
                </div>
                


            </div>  
            <div className={css.line}></div> 

            <div className={css.card_profil_coach__button}>
                    <button className={css.card_profil_coach__button__contact}>
                    Contacter
                    </button>
                    {/* <div className={css.linevertical}></div>  */}

                    <button className={css.card_profil_coach__button__voirplus}>
                    Voir plus
                    </button>

                </div>         
        </div>
    )
}
