import React, { useState, useEffect } from 'react'
// import { DownOutlined, RightOutlined } from '@ant-design/icons';
import css from './filterCoach.scss'
import down from "../../../public/icon/down.jpg"
import left from "../../../public/icon/left.png"
import { Empty } from 'antd';

export default function FilterCoach({
    title,
    jobs,
    coachSpecialty,
    setCoachSpecialty,
    setCoachSpecialtyFilter,
    coachSpecialtyFilter,
    setDataCopy,
    dataCopy,
    coachesList,
    dances,
    sports
}) {
    const [icon, seticon] = useState(left);
    const [selectedJobId, setSelectedJobId] = useState()
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState()

    const changeIcon = () => {
        if (icon === down) {
            seticon(left)
        }
        if (icon === left) {
            seticon(down)
        }
    }
    const filterSpecialty = () => {
        {
            coachSpecialty === "sport" ?
            setCoachSpecialtyFilter(sports)
            : (coachSpecialty === "dances" ? setCoachSpecialtyFilter(dances)
                : setCoachSpecialtyFilter(""))
        }
    }
    useEffect(() => {
        filterSpecialty()
    }, [coachSpecialty])
    const filterbySpecialty = (el) => {
        setDataCopy(coachesList.filter(e => e.coachData.specialty.includes(el)))
    }
    return (
        <div className={css.filter_coach}>

            <div className={css.filter_coach__filter_type} >
                <div className={css.filter_coach__filter_type__title} >
                    <div onClick={() => changeIcon()} className={css.filter_coach__filter_type__title__Professions} >
                        {title}<img src={icon} className={icon === down ? css.down : css.left} alt="" />
                    </div>
                    <div className={css.filter_coach__filter_type__title__Professions__items}>
                        {title === "PROFESSIONS" ?
                            <>
                                {jobs.map(job => {
                                    return (
                                        <>
                                            <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                                css.filter_coach__filter_type__title__Professions__items__iteamnotvisible}>
                                                <div onClick={() => {
                                                    setCoachSpecialty(job.specialty.type),
                                                    setSelectedJobId(job._id)
                                                }
                                                }>
                                                    <div onClick={() => setSelectedSpecialtyId('')}
                                                        className={(job._id == selectedJobId) ?
                                                            css.filter_coach__filter_type__title__Professions__items__iteam__iteamshow : ""}>
                                                        {job.translations.fr}
                                                    </div>
                                                </div>

                                            </div>
                                        </>)
                                })}
                            </>
                            : (

                                <div className={icon === down ?
                                    css.filter_coach__filter_type__title__Professions__items__iteam :
                                    css.filter_coach__filter_type__title__Professions__items__iteamnotvisible}
                                >
                                    {coachSpecialtyFilter !== "" ? coachSpecialtyFilter.map(coach => {
                                        return (

                                            <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                                css.filter_coach__filter_type__title__Professions__items__iteamnotvisible}
                                                onClick={() => {
                                                    filterbySpecialty(coach._id),
                                                    setSelectedSpecialtyId(coach._id)
                                                }
                                                }
                                            >
                                                <div className={(coach._id == selectedSpecialtyId) ? css.filter_coach__filter_type__title__Professions__items__iteam__iteamshow : ""}>
                                                    {(coach.type  ?
                                                        coach.translations.fr : '')}
                                                </div>
                                            </div>
                                        )
                                    }

                                    )
                                        :
                                        <>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                                                <span>
                                                    Pas de spécialité disponible
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
