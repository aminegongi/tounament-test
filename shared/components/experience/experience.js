import React,{useState} from 'react'
import css from './experience.scss'
import { Slider } from 'antd';

export default function experience({setdatacopy,data,datacopy}) {
    const marks = {
        0: '0',
        5: '5',
        25: {
          style: {
            color: '#000000',
            fontsize: '14px',
            lineheight: '1.21',
          },
          label: <strong>25ans</strong>,
        },
      };
     const onChange = value => {
       
        setdatacopy(data.filter(e=>e.coachData.experiencesYearsNumber  >value-0.1 ))

        }

    
    return (
        <div className={css.experience}> 
          <div className={css.experience__title} >NOMBRE D'EXPÉRIENCE
         </div>
          <div className={css.experience__marks}> 
              <Slider styele={{backgroudColor:'red'}} class={css.experience__marks__line}
                 onChange={onChange}
                 marks={marks} max={25}/>
           </div>
        </div>
    )
}
