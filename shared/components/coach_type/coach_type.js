import React, { useState } from 'react'
import css from './coach_type.scss'
import { Rate ,Radio ,Slider} from 'antd';

export default function coach_type({setdataCopy,dataCopy,coachesList}) {
    const marks = {
        1: {
            style: {
              color: '#000000',
              fontsize: '14px',
              lineheight: '1.21',
            },
            label: <strong>1</strong>,
          },
        5: {
            style: {
              color: '#000000',
              fontsize: '14px',
              lineheight: '1.21',
            },
            label: <strong>5</strong>,
          },
        
        
        10: {
          style: {
            color: '#000000',
            fontsize: '14px',
            lineheight: '1.21',
          },
          label: <strong>10</strong>,
        },
      };
    const [value, setValue] = useState()
    
    const onSearchtype = type =>  {
       setValue(type.target.value)
         if (type.target.value =="lookingforwork" ){ 
         setdataCopy(coachesList.filter(coach=>coach.coachData.lookingForJob ==true))
         }
          else if 
          (type.target.value =="privatecoach" )
          { 
          setdataCopy(coachesList.filter(coach=>coach.coachData.privateCourseData.givePrivateCourse ==true))
         }
   };
      const Searchbylevel= level=>{
       console.log("level",level,coachesList)
       { 
        setdataCopy(coachesList.filter(coach=>coach.coachData.privateCourseData.level.includes(level) ))
       }
   }
   const onChange = e => {
        console.log("nombre de personne",e)
   }



    return (
        <div className={css.coach_type}>
            <div className={css.coach_type__title}>
                FILTRE PAR
            </div>
            <div className={css.coach_type__rate}> 

            <Radio.Group onChange={onSearchtype} value={value}>
                <Radio className={css.radio} value={'privatecoach'} className={css.radio} /> 
                <span className={css.coach_type__rate__plus}>Coach privé
                </span> <br/>
                <Radio className={css.radio} value={'Privatesession'} className={css.radio} /> 
                <span className={css.coach_type__rate__plus}>Cours privé
                </span> <br/>
                
                <div className={value == "Privatesession"? 
                css.coach_type__rate__plus__privatesessionfilter :css.privatesessionfilter}
                >
                    <div onClick={()=>Searchbylevel("beginner")} 
                     className={css.coach_type__rate__plus__privatesessionfilter__filterby}>
                      Débutant
                    </div>
                    <div onClick={()=>Searchbylevel("intermediate")} className={css.coach_type__rate__plus__privatesessionfilter__filterby}>
                     Intermédiaire
                    </div>
                    <div onClick={()=>Searchbylevel("confirmed")} className={css.coach_type__rate__plus__privatesessionfilter__filterby}>
                    Confirmé
                    </div>
                    <div className={css.coach_type__rate__plus__privatesessionfilter__filterby_personnumber}>
                     Nombre de personne <br/>
                     <Slider styele={{backgroudColor:'red'}} 
                     class={css.coach_type__rate__plus__privatesessionfilter__filterby__marks}
                        onChange={onChange}
                        marks={marks} max={10} min={1}/>

                    </div>
                </div>
                <Radio className={css.radio} value={'lookingforwork'} />
                  <span className={css.coach_type__rate__plus}>Recherche de travail
                  </span> <br/>     
       </Radio.Group> 
            </div>
        </div>
    )
}
