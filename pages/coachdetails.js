import React from 'react'
import HeaderCoachProfile from '../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../shared/components/InfoCoach/InfoCoach'
import css from '../shared/css/coachDetails.scss'
import Navbar from '../shared/components/navbar/Navbar';
import CardProfileCoach from '../shared/components/CardProfileCoachFilter/CardProfileCoach';
import { ALL, ALPHABETICAL, RECOMMEND, EXPERIENCE, API } from '../shared/constants'
import CoordinateCoach from '../shared/components/CoordinateCoach/CoordinateCoach';
import { Tabs } from 'antd';
import CoachBox from '../shared/components/CoachBox/CoachBox';

export default function CoachDetails({ coachesList, jobs, sports, dances, regions }) {

    const renderCoachProfile = (coachProfile) => {
        const job = jobs.find(job => job._id === coachProfile.coachData.job)
        let specialty = ""
        if (job.specialty && job.specialty.type === "sport") {

            specialty = sports.find(sport => sport._id === coachProfile.coachData.specialty)
        }
        else if (job.specialty && job.specialty.type === "dance") {

            specialty = dances.find(dance => dance._id === coachProfile.coachData.specialty)
        }
        return <CardProfileCoach
            coachProfile={coachProfile}
            key={coachProfile._id}
            job={job}
            pagename={"coachdetails"}
            specialty={specialty}
        />
    }
    const { TabPane } = Tabs;

    function callback(key) {
        console.log(key);
    }
    return (
        <>
            <Navbar />

            <div className={css.coach}>
                <div className={css.affiche}>
                    <img className={css.affiche__img} src={"icon/coachdetails.png"} alt="" />
                </div>
                <div className={css.coach__coachdetails}>
                    <div>
                        <div className={css.coach__coachdetails__coordinate}>

                            {coachesList.slice([0], [1]).map((coachProfile, key) =>
                                renderCoachProfile(coachProfile.coachData.experiencesYearsNumber == 4 ? coachProfile : "")
                            )}
                        </div>
                        <div className={css.coach__coachdetails__coordinate}>

                            <CoordinateCoach />
                        </div>
                    </div>
                    <div >
                        <Tabs defaultActiveKey="1" onChange={callback} className={css.tabs}>
                            <TabPane tab="A propos" key="1">
                                <div className={css.aprops}>
                                    <CoachBox />
                                </div>       
                            </TabPane>
                            <TabPane tab="Avis" key="2">
                                Avis
                            </TabPane>
                            <TabPane tab="Biographie" key="3">
                                Biographie
                            </TabPane>
                        </Tabs>
                    </div>
                    <div >
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Tab 1" key="1">
                                Content of Tab Pane 1
                        </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                         </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                        </TabPane>
                        </Tabs>
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