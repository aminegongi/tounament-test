import React, { useState } from 'react'
import HeaderCoachProfile from '../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../shared/components/InfoCoach/InfoCoach'
import css from '../shared/css/coachDetails.scss'
import Navbar from '../shared/components/navbar/Navbar';
import CardProfileCoach from '../shared/components/CardProfileCoachFilter/CardProfileCoach';
import { ALL, ALPHABETICAL, RECOMMEND, EXPERIENCE, API } from '../shared/constants'
import ContactCoach from '../shared/components/ContactCoach/ContactCoach';
import { Tabs, Button, Divider, Checkbox } from 'antd';
import fetch from 'isomorphic-unfetch'

import CoachBox from '../shared/components/CoachBox/CoachBox';
import CoachAvis from '../shared/components/CoachAvis/CoachAvis';
import Biographie from '../shared/components/Biographie/Biographie';

export default function CoachDetails({ coachesList, jobs, sports, dances, regions }) {

    const [tab, setTab] = useState("2")

    return (
        <>
            <Navbar />

            <div className={css.coach}>
                <div className={css.affiche}>
                    <img className={css.affiche__img} src={"icon/Banniere.png"} alt="" />
                </div>
                <div className={css.coach__coachdetails}>
                    <div className={css.coach__cordonneBlock}>
                        <div className={css.coach__coachdetails__contact}>
                            <InfoCoach />

                        </div>
                        <div className={css.coach__coachdetails__information}>

                            <ContactCoach />
                        </div>
                    </div>
                    <div className={css.tabsinfo}>
                        <div className={css.tabs}>
                            <div className={css.tabs__button}>
                                <div className={css.tabs__button__apropos} onClick={() => setTab(1)}>A propos</div>
                                <div className={css.tabs__button__apropos} onClick={() => setTab(2)} >Avis</div>
                                <div className={css.tabs__button__apropos} onClick={() => setTab(3)}>Biographie</div>
                            </div>
                            <button className={css.tabs__contact}>
                                Contacter
                            </button>
                        </div>
                        <div className={css.linetabs}></div>
                        {tab == 1 ?
                            <div className={css.tabsinfo__title}>
                                <CoachBox iconexclamation={"../icon/exclamation.png"}>
                                    <div className={css.coachBox}>
                                        <div className={css.coachBox__content}>
                                            <div className={css.coachBox__content__title}>
                                                Années d'expérience:
                                            </div>
                                            <div className={css.coachBox__content__experienceNumber}>
                                                3
                                            </div>
                                        </div>
                                        <div className={css.coachBox__content}>

                                            <div className={css.coachBox__content__title}>
                                                Années à jouer:
                                            </div>
                                            <div className={css.coachBox__content__experienceNumber}>
                                                3
                                            </div>
                                        </div>
                                        <div className={css.coachBox__content}>
                                            <div className={css.coachBox__content__title}>
                                                Nombre de personnes par séances:
                                            </div>
                                            <div className={css.coachBox__content__experienceNumber}>
                                                3
                                            </div>
                                        </div>
                                        <div className={css.coachBox__content}>
                                            <div className={css.coachBox__content__title}>
                                                Niveaux: <span>Avancé , Intermédiaire , Débutant</span>
                                            </div>
                                        </div>
                                        <div className={css.coachBox__content}>
                                            <div className={css.coachBox__content__title}>
                                                Catégories d'ages:
                                            </div>
                                            <div className={css.coachBox__content__experienceNumber}>
                                                Senior , Adultes , Juniors , Enfant
                                            </div>
                                        </div>
                                    </div>
                                </CoachBox>
                            </div>
                            : (tab == 2 ? <CoachAvis /> : <Biographie title={"Biographie"} icon={"../icon/exclamation.png"} />)}
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