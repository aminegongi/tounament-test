import React ,{useState,useEffect}from 'react'
import { DownOutlined ,RightOutlined} from '@ant-design/icons';
import css from './filter_coach.scss'
import down from "../../../public/icon/down.jpg"
import left from "../../../public/icon/left.png"
import { Empty } from 'antd';

export default function filter_coach({ 
        title ,
        jobs,
        coachSpecialty,
        setcoachSpecialty,
        setcoachSpecialtyfilter,
        coachSpecialtyfilter,
        setdataCopy,
         dataCopy,
         coachesList,
         dances,
         sports
    }){
    const [icon, seticon] = useState(left);
    const [statejob, setStatejob] = useState()
    const[statespecialty,setStatespecialty]=useState()
    
    const changeIcon =()=>{
        if (icon === down  )
            {
                seticon(left)
            }
        if (icon === left ) 
            {
                seticon(down) }
            }
            const filterspecialty =()=>{
                {coachSpecialty ==="sport" ? 
                setcoachSpecialtyfilter(sports) 
                 :(coachSpecialty ==="dances" ? setcoachSpecialtyfilter(dances)
                 :setcoachSpecialtyfilter(""))
                 
                // setcoachSpecialtyfilter(jobs.filter(e=>e.translations.fr.includes(coachSpecialty)))
                }
            }
            useEffect(() => {
                filterspecialty()
            }, [coachSpecialty])
            const filterbyspecialty=(el)=>{
              

                setdataCopy(coachesList.filter(e=>e.coachData.specialty.includes(el)))
            }
    return (
        <div className={css.filter_coach}>

            <div className={css.filter_coach__filter_type} >
                <div className={css.filter_coach__filter_type__title} >
                     <div  onClick={()=>changeIcon()} className={css.filter_coach__filter_type__title__Professions} >
                         {title}<img src={icon} className={icon === down ? css.down : css.left} alt="" />
                     </div>
                        <div className={css.filter_coach__filter_type__title__Professions__items}>
                            {title==="PROFESSIONS" ?
                            <>
                                {jobs.map(el=> {
                                    return (
                                    <>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                        css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                        <div onClick={()=>
                                           {
                                            setcoachSpecialty(el.specialty.type),
                                            setStatejob(el._id)

                                                 
                                            }
                                        }>
                                            <div onClick={()=>setStatespecialty('')} 
                                            className={(el._id==statejob) ?
                                            css.filter_coach__filter_type__title__Professions__items__iteam__iteamshow:""}>
                                                 {el.translations.fr}
                                             </div>
                                    </div>
                              
                                </div>
                                    </>)
                                })}
                            </>
                                : (
                                                                   
                            <div className={icon === down ?
                                 css.filter_coach__filter_type__title__Professions__items__iteam :
                                 css.filter_coach__filter_type__title__Professions__items__iteamnotvisible } 
                                 >
                                    {coachSpecialtyfilter !=="" ? coachSpecialtyfilter.map(el=>{
                                        return (
                                            
                                        <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                                css.filter_coach__filter_type__title__Professions__items__iteamnotvisible } 
                                            onClick={()=>{
                                                filterbyspecialty(el._id),
                                                setStatespecialty(el._id)
                                            }
                                            }
                                                >
                                     <div  className={(el._id==statespecialty) ?css.filter_coach__filter_type__title__Professions__items__iteam__iteamshow:""}>
                                            { (el._id !='kindergarten' && el._id !='activityclub' )?
                                             el.translations.fr:''}
                                             </div>
                                       </div>
                                        )
                                    }
                                        
                                    )
                                    :  
                                    <>
                                     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                                        <span>
                                            pas de Spécialité disponible
                                        </span>
                                        } />
                                     </>
                                    }
                                  
                            </div>
                                )}
                        </div>
                     
                </div>
            </div>
            
        </div>
    )
}
