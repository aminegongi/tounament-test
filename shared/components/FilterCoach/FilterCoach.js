import React, { useState, useEffect } from 'react'
// import { DownOutlined, RightOutlined } from '@ant-design/icons';
import css from './filterCoach.scss'
import down from "../../../public/icon/down.png"
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
const [professionId, setProfessionId] = useState()
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
    const filterBySpecialty = (el) => {
        const filteredCoachesList = dataCopy.filter(e => e.coachData.specialty.includes(el))
        setDataCopy(filteredCoachesList)
    }

    const handleProfession = (Profession) => {
        window.scrollTo(400, 350);
       setProfessionId(Profession._id);

        if (Profession._id == professionId) {
            setDataCopy(coachesList)
            setProfessionId("")
        }
        else {
            setDataCopy(dataCopy.filter(e => e.coachData.job == (Profession._id)))

        }
    }

    const handleSpecialty = (specialty) => {
        window.scrollTo(400, 350);

        if (specialty._id === selectedSpecialtyId) {
            setSelectedSpecialtyId("")
            setDataCopy(coachesList)
        }
        else {
            filterBySpecialty(specialty._id)
            setSelectedSpecialtyId(specialty._id)
        }
    }

    return (
        <div className={css.filter_coach}>

            <div className={css.filter_coach__filter_type} >
                <div className={css.filter_coach__filter_type__title} >
                    <div onClick={() => changeIcon()} className={css.filter_coach__filter_type__title__Professions} >
                        {title}<img src={icon} className={icon === down ? css.down : css.left} alt="" />
                    </div>
                    <div className={icon != down ? css.filter_coach__filter_type__title__Professions__items : css.filter_coach__show}>
                        {title === "PROFESSIONS" ?
                            <>
                                {jobs.sort((a, b) => a.translations.fr > b.translations.fr ? 1 : -1).map(job => {
                                    return (
                                        <>
                                            <div className={icon === down ? css.filter_coach__filter_type__title__Professions__items__iteam :
                                                css.filter_coach__filter_type__title__Professions__items__iteamnotvisible}>
                                                <div onClick={() => {
                                                    {
                                                        handleProfession(job),
                                                            coachSpecialty == job.specialty.type && selectedJobId === job._id ?
                                                                (setCoachSpecialty(""),
                                                                    setSelectedJobId("")
                                                                    // handleProfession(coach)

                                                                ) :
                                                                (setCoachSpecialty(job.specialty.type),
                                                                    setSelectedJobId(job._id)
                                                                    // handleProfession(coach)
                                                                )
                                                    }
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
                                    {icon === down && coachSpecialtyFilter !== "" ?
                                        coachSpecialtyFilter.sort((a, b) => a.translations.fr > b.translations.fr ? 1 : -1).map(coach => {
                                            return (

                                                <div className={css.filter_coach__filter_type__title__Professions__items__iteam}
                                                    onClick={() => handleSpecialty(coach)

                                                    }
                                                >
                                                    <div className={(coach._id == selectedSpecialtyId) ? css.filter_coach__filter_type__title__Professions__items__iteam__iteamshow : ""}>

                                                        {coach.translations.fr}

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
