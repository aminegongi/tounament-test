import React ,{useState,useEffect}from 'react'
import { DownOutlined ,RightOutlined} from '@ant-design/icons';
import css from './filter_coach.scss'
import down from "../../../public/icon/down.jpg"
import left from "../../../public/icon/left.png"

export default function filter_coach({ 
        title ,
        titleone,
        titletwo,
        titlethere,
        subtitleone ,
        subtitletwo ,
        subtitlethere,
        subtitlefive ,
        subtitlesix,
        subtitlefour,
        subtitleseven,
        subtitleeight,
        jobs,
        coachspecialty,
        setcoachspecialty,
        setcoachspecialtyfilter,
        coachspecialtyfilter,
        setdatacopy,
         datacopy,
         data
    }){
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
            const filterspecialty =()=>{
                setcoachspecialtyfilter(jobs.filter(e=>e.translations.fr.includes(coachspecialty)))
            }
            useEffect(() => {
                filterspecialty()
            }, [coachspecialty])
            
            const filterbyspecialty=(el)=>{
                setdatacopy(data.filter(e=>e.sports.includes(el)))
               

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
                                                 setcoachspecialty(el.translations.fr)
                                                 
                                                 }
                                             } >
                                                     {el.translations.fr}</div>
                                    {/* <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitleone}
                                    </div>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                   {subtitletwo}
                                    </div>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitlethere}
                                    </div>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitlefour}
                                    </div> */}
                                </div>
                                    </>)
                                })}
                            </>
                                : (
                                    
                                

                                
                            <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                 css.filter_coach__filter_type__title__Professions__items__iteamnotvisible } 
                                 >
                                    {coachspecialtyfilter.specialty!==[] ? coachspecialtyfilter.map(e=>e.specialty.list.map(el=>{
                                        return (
                                            
                                        <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                                css.filter_coach__filter_type__title__Professions__items__iteamnotvisible } 
                                            onClick={()=>filterbyspecialty(el) }
                                                >
                                             {el}
                                             </div>
                                        )
                                    }
                                        
                                    ))
                                    :   titleone
                                    }
                                    {/* <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitlefive}
                                    </div>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitlesix}
                                    </div>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitleseven}
                                    </div>
                                    <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam__subiteam :css.filter_coach__filter_type__title__Professions__items__iteamnotvisible }>
                                    {subtitleeight}
                                    </div> */}
                            </div>
                                )}
                        </div>
                     
                </div>
            </div>
            
        </div>
    )
}
