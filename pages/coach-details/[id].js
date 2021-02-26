import React, { useEffect, useState } from 'react'
import HeaderCoachProfile from '../../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../../shared/components/InfoCoach/InfoCoach'
import css from '../../shared/css/coachDetails.scss'
import Navbar from '../../shared/components/navbar/Navbar';
import CardProfileCoach from '../../shared/components/CardProfileCoachFilter/CardProfileCoach';
import { ALL, ALPHABETICAL, RECOMMEND, EXPERIENCE, API } from '../../shared/constants'
import ContactCoach from '../../shared/components/ContactCoach/ContactCoach';
import { Tabs, Button, Divider, Checkbox } from 'antd';
import fetch from 'isomorphic-unfetch'

import CoachBox from '../../shared/components/CoachBox/CoachBox';
import CoachAvis from '../../shared/components/CoachAvis/CoachAvis';
import Biographie from '../../shared/components/Biographie/Biographie';
import { useRouter } from "next/router";


export default function CoachDetails({ match, coachesList, jobs, sports, dances, regions }) {
    const router = useRouter();
    const [coachData, setCoachData] = useState()

    const renderCoachProfile = (coachData) => {
        const job = jobs.find(job => job._id == coachData.map(e => e.coachData.job))
        let specialty = ""
        if (job.specialty && job.specialty.type == "sport") {

            specialty = sports.find(sport => sport._id == coachData.map(e => e.coachData.specialty))
        }
        else if (job.specialty && job.specialty.type == "dance") {

            specialty = dances.find(dance => dance._id == coachData.map(e => e.coachData.specialty))
        }
        return <InfoCoach
            coachProfile={coachData}
            key={coachData._id}
            job={job}
            specialty={specialty}
        />
    }

    useEffect(() => {
        setCoachData(coachesList.filter(coach => coach._id == (router.query.id)))
    }, [router.query.id])
    coachData ?
        coachData.map(e => console.log("coachesList", e.email)) : ""


    const [tab, setTab] = useState(1)

    return (
        <>
            <Navbar />

            <div className={css.coach}>
                <div className={css.affiche}>
                    <img className={css.affiche__img} src={"../icon/Banniere.png"} alt="" />
                </div>
                <div className={css.coach__coachdetails}>
                    <div className={css.coach__cordonneBlock}>
                        <div className={css.coach__coachdetails__contact}>

                            {coachData ?
                                renderCoachProfile(coachData) : ""}

                        </div>
                        <div className={css.coach__coachdetails__information}>
                            {coachData ?

                                <ContactCoach coachData={coachData} /> : ""}
                        </div>
                    </div>
                    <div className={css.tabsinfo}>
                        <div className={css.tabs}>
                            <div className={css.tabs__button}>
                                <div className={tab === 1 ? css.tabs__button__aproposaparopsactive : css.tabs__button__aproposaparops}
                                    onClick={() => setTab(1)}>A propos
                                </div>
                                <div className={tab === 2 ? css.tabs__button__aproposavisactive : css.tabs__button__aproposavis}
                                    onClick={() => setTab(2)} >Avis
                                </div>
                                <div className={tab === 3 ? css.tabs__button__aproposbiographieactive : css.tabs__button__aproposbiographie}
                                    onClick={() => setTab(3)}>Biographie
                                </div>
                            </div>
                            <button className={css.tabs__contact}>
                                Contacter
                            </button>
                        </div>
                        <div className={css.linetabs}></div>
                        {coachData ?
                            <>
                                {coachData.map(coach => {
                                    return (
                                        tab == 1 ?
                                            <div className={css.tabsinfo__title}>
                                                <CoachBox coachData={coach} iconexclamation={"../icon/exclamation.png"}>
                                                    <div className={css.coachBox}>
                                                        {coach.coachData.experiencesYearsNumber ?
                                                            <div className={css.coachBox__content}>
                                                                <div className={css.coachBox__content__title}>
                                                                    Années d'expérience:
                                                            </div>
                                                                <div className={css.coachBox__content__experienceNumber}>
                                                                    {coach.coachData.experiencesYearsNumber}
                                                                </div>
                                                            </div> : ""}

                                                        <div className={css.coachBox__content}>
                                                            <div className={css.coachBox__content__title}>
                                                                Années à jouer:
                                                            </div>
                                                            <div className={css.coachBox__content__experienceNumber}>
                                                                3
                                                            </div>
                                                        </div>
                                                        {coach.coachData.privateCourseData.personsNumberPerSession ?
                                                            <div className={css.coachBox__content}>
                                                                <div className={css.coachBox__content__title}>
                                                                    Nombre de personnes par séances:
                                                            </div>
                                                                <div className={css.coachBox__content__experienceNumber}>
                                                                    {coach.coachData.privateCourseData.personsNumberPerSession}
                                                                </div>
                                                            </div> : ""}
                                                        {coach.coachData.privateCourseData.level ?
                                                            <div className={css.coachBox__content}>
                                                                <div className={css.coachBox__content__title}>
                                                                    Niveaux: <span>{coach.coachData.privateCourseData.level.join(' , ')}</span>
                                                                </div>
                                                            </div> : ""}
                                                        {coach.coachData.privateCourseData.ages ?
                                                            <div className={css.coachBox__content}>
                                                                <div className={css.coachBox__content__title}>
                                                                    Catégories d'ages:
                                                            </div>
                                                                <div className={css.coachBox__content__experienceNumber}>
                                                                    {coach.coachData.privateCourseData.ages.join(' , ')}
                                                                </div>
                                                            </div> : ""}
                                                    </div>
                                                </CoachBox>
                                            )
                                            </div>
                                            : (tab == 2 ? <CoachAvis coachData={coach} /> :
                                                <Biographie coachData={coach} title={"Biographie"} icon={"../icon/exclamation.png"} />)
                                    )
                                })}
                            </>
                            : ""}
                    </div>


                </div>
            </div>
        </>
    )
}


CoachDetails.getInitialProps = async () => {
    const coachesRes = await fetch(API + "users/coaches/all")
    const jobsRes = await fetch(API + "jobs")
    const sportsRes = await fetch(API + "sports")
    const danceRes = await fetch(API + "dances/")
    const regionsRes = await fetch(API + "regions/")
    const jsonCoachesRes = await coachesRes.json()
    const jsonJobsRes = await jobsRes.json()
    const jsonSportsRes = await sportsRes.json()
    const jsonDancesRes = await danceRes.json()
    const jsonRegionsRes = await regionsRes.json()

    return {
        coachesList: jsonCoachesRes,
        jobs: jsonJobsRes,
        sports: jsonSportsRes,
        dances: jsonDancesRes,
        regions: jsonRegionsRes
    }
}