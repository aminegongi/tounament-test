import React from 'react'
import HeaderCoachProfile from '../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import InfoCoach from '../shared/components/InfoCoach/InfoCoach'
import css from '../shared/css/coachDetails.scss'
import Navbar from '../shared/components/navbar/Navbar';
import CardProfileCoach from '../shared/components/CardProfileCoachFilter/CardProfileCoach';
import { ALL, ALPHABETICAL, RECOMMEND, EXPERIENCE, API } from '../shared/constants'

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
            specialty={specialty}
        />
    }
    return (
        <>
        <Navbar />

        <div className={css.coach}>
            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/coachdetails.png"} alt="" />
            </div>
            <div className={css.coach__coachdetails}>
                <div className={css.coach__coachdetails__coordinate}>
                {coachesList.slice([0], [1]).map((coachProfile, key) =>
                                renderCoachProfile(coachProfile.coachData.experiencesYearsNumber==4 ?coachProfile:"")
                            )}
                </div>
                <div >dfkdf</div>

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