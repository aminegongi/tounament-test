import React from 'react'
import css from './coach_type.scss'
import { Rate ,Radio } from 'antd';

export default function coach_type({setdataCopy,dataCopy,coachlist}) {
    const [value, setValue] = React.useState('');

    
    const onSearchtype = type =>  {
        setValue(type.target.value);
        {value ==="privatecoach" ? 
         
        setdataCopy(coachlist.filter(e=>e.coachData.lookingForJob ==true)) :
        setdataCopy(coachlist.filter(e=>e.coachData.lookingForJob ==false))
    }
   };

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

                <Radio className={css.radio} value={'lookingforwork'} />
                  <span className={css.coach_type__rate__plus}>Recherche de travail
                  </span> <br/>
       
      
       </Radio.Group> 
            </div>
        </div>
    )
}
