import React,{useState} from 'react'
import css from './coach_region.scss'
import { Checkbox} from 'antd';
import down from "../../../public/icon/down.jpg"
import left from "../../../public/icon/left.png"
export default function coach_region({setdataCopy,dataCopy,coachlist}) {
    

      const onChange = region =>  {
         setdataCopy(coachlist.filter(e=>e.coachData.privateCourseData.regions.find(el=>region.includes(el))));
        }

      const plainOptions = [
      'tunis', 
      'ariana',
       'béja',
      'ben arous',
      'bizerte',
      'gabès',
      'gafsa',
      'jendouba',
      'kairouan' ,
      'sousse',
       'kasserine',
       'kébili',
       'kef',
       'mahdia',
       'manouba',
       'médenine',
       'monastir',
        'nabeul',
        'sfax',
        'sidi bouzid',
        'siliana',
        'tataouine',
        'tozeur',
        'zaghouan'
    ];
    const [icon, seticon] = useState(left);
    const changeIcon =()=>{
        if (icon === down  )
            {
                seticon(left)
            }
        if (icon === left ) 
            {
                seticon(down) }
            }
    return (
        <div className={css.coach_region}>
           <div className={css.coach_region__title} onClick={()=>changeIcon()}>
           REGIONS<img src={icon} className={icon === down ? css.down : css.left} alt="" />
            </div> 
            <div className={icon === down ?
             css.show_region :
                css.unshow_region } >
            <Checkbox.Group className={css.coach_region__checkbox} options={plainOptions} onChange={onChange} />


                                 </div>

        </div>
    )
}
