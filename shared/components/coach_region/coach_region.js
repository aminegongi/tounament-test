import React from 'react'
import css from './coach_region.scss'
import { Checkbox} from 'antd';

export default function coach_region({setdatacopy,datacopy,data}) {
    // function onChange(checkedValues) {
    //     console.log('checked = ', checkedValues);
    //   }
    const [value, setValue] = React.useState('');

      const onChange = region =>  {
       (setValue(region));
         console.log("value",region)
         const y=(datacopy.filter(e.coachData.privateCourseData.regions.filter(el=>region(el))));
    console.log("y",y)    }
    console.log("datacopy",datacopy)

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
