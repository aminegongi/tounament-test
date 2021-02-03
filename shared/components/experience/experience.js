import React,{useState} from 'react'
import css from './experience.scss'
import { Slider } from 'antd';

export default function experience({setdataCopy,coachesList ,dataCopy}) {
    const marks = {
        0: '0',
        5: '5',
        10: '10',
        15: '15',

        20: {
          style: {
            color: '#000000',
            fontsize: '14px',
            lineheight: '1.21',
          },
          label: <strong>20ans</strong>,
        },
      };
     const onChange = value => {
       
        setdataCopy(coachesList.filter(e=>e.coachData.experiencesYearsNumber  >=value ))

        }

    
    return (
        <div className={css.experience}> 
          <div className={css.experience__title} >ANNEES D'EXPERIENCES
         </div>
          <div className={css.experience__marks}> 
              <Slider styele={{backgroudColor:'red'}} class={css.experience__marks__line}
                 onChange={onChange}
                 marks={marks} max={20}/>
           </div>
        </div>
    )
}
