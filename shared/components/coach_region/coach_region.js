import React from 'react'
import css from './coach_region.scss'
import { Checkbox} from 'antd';

export default function coach_region({setdatacopy,datacopy,data}) {
    

      const onChange = region =>  {
         setdatacopy(data.filter(e=>e.coachData.privateCourseData.regions.find(el=>region.includes(el))));
  }

      const plainOptions = ['tunis', 'bizerte', 'sousse'];

    return (
        <div className={css.coach_region}>
           <div className={css.coach_region__title}>
           RÉGION
            </div> 
            <Checkbox.Group className={css.coach_region__checkbox} options={plainOptions}  onChange={onChange} />

        </div>
    )
}
