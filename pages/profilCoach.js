import React, { useState, useEffect } from 'react'
import HeaderCoachProfil from '../shared/components/HeaderCoachProfil/HeaderCoachProfil'
import css from '../shared/css/profilCoach.scss'
import globalCss from '../shared/global-style.scss'
import fetch from 'isomorphic-unfetch'
import { ALL, ALPHABETICAL, RECOMMEND, EXPERIENCE, API } from '../shared/constants'
import { Input, Select, Modal, Button } from 'antd';
import FilterCoach from '../shared/components/FilterCoach/FilterCoach';
import Experience from '../shared/components/Experience/Experience';
import Recommendation from '../shared/components/Recommendation/Recommendation';
import CoachType from '../shared/components/CoachType/CoachType';
import CoachRegion from '../shared/components/Coachregion/CoachRegion';
import CardProfilCoach from '../shared/components/CardProfilCoach/CardProfilCoach';
import Axios from 'axios'

export default function profil_coach({ coachesList, jobs, sports, dances, regions }) {
    console.log('regions: ', regions);
    const [dataCopy, setDataCopy] = useState(coachesList)
    const [coachSpecialty, setCoachSpecialty] = useState()
    const [coachSpecialtyFilter, setCoachSpecialtyFilter] = useState('')
    const { Search } = Input;
    const renderCoachProfile = (coachProfile) => {
        const job = jobs.find(job => job._id === coachProfile.coachData.job)
        let specialty = ""
        if (job.specialty && job.specialty.type === "sport") {

            specialty = sports.find(sport => sport._id === coachProfile.coachData.specialty)
        }
        else if (job.specialty && job.specialty.type === "dance") {

            specialty = dances.find(dance => dance._id === coachProfile.coachData.specialty)
        }
        return <CardProfilCoach
            coachProfile={coachProfile}
            key={coachProfile._id}
            job={job}
            specialty={specialty}
        />
    }
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = value => {
        setDataCopy(coachesList.filter(e => e.firstName.includes(value) || e.lastName.includes(value)))
    };
    const { Option } = Select;
    const handleChange = (value) => {
        if (value.key == 'alphabetique') {
            const sortbyalphabetical = ([...coachesList].sort((a, b) => a.firstName - b.firstName ? 1 : -1))
            return setDataCopy(sortbyalphabetical)
        }

        if (value.key == 'Tout') {
            return setDataCopy(coachesList)
        }
        if (value.key == 'experience') {
            const sortbyexperience = ([...coachesList].sort((a, b) => a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber ? 1 : -1))
            return setDataCopy(sortbyexperience)
        }
        if (value.key == 'recommander') {

            const sortbyrecommend = ([...coachesList].sort((a, b) =>
                (Math.round(a.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / a.coachData.reviews.length) <
                    Math.round(b.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / b.coachData.reviews.length)) ? 1 : -1))
            return setDataCopy(sortbyrecommend)
        }

    }

    return (
        <div className={css.profil_coach}>
            <HeaderCoachProfil />

            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/profil_coach.png"} alt="" />
            </div>
            <div className={css.profil_coach__coach_details} >
                <div className={css.profil_coach__coach_details__filter} >
                    <Search className={css.profil_coach__coach_details__filter__input_searsh}
                        placeholder="RECHERCHE PAR NOM"
                        onChange={e => onSearch(e.target.value)}
                        style={{
                            width: 270,
                        }} />

                    <div className={css.line}></div>

                    <FilterCoach
                        coachSpecialty={coachSpecialty}
                        setCoachSpecialty={setCoachSpecialty}
                        setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                        coachSpecialtyFilter={coachSpecialtyFilter}
                        dances={dances}
                        sports={sports}
                        title={"PROFESSIONS"}

                        jobs={jobs}
                        setDataCopy={setDataCopy}
                        dataCopy={dataCopy}
                        coachesList={coachesList}
                    />
                    <div className={css.line}></div>
                    <FilterCoach
                        dances={dances}
                        sports={sports}
                        setDataCopy={setDataCopy}
                        dataCopy={dataCopy}
                        coachesList={coachesList}
                        coachSpecialty={coachSpecialty}
                        setCoachSpecialty={setCoachSpecialty}
                        setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                        coachSpecialtyFilter={coachSpecialtyFilter}
                        jobs={jobs}
                        title={"SPECIALITES"}

                    />
                    <div className={css.line}></div>
                    <Experience setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                    <div className={css.line}></div>
                    <Recommendation dataCopy={dataCopy} setDataCopy={setDataCopy} coachesList={coachesList} />
                    <div className={css.line}></div>
                    <CoachType setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                    <div className={css.line}></div>
                    <CoachRegion regions={regions} setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                </div>

                <div className={css.profil_coach__coach_details__list_of_coach}>
                    <Search className={css.profil_coach__coach_details__filter__input_searshmobile}
                        placeholder="RECHERCHE PAR NOM"
                        onChange={e => onSearch(e.target.value)}
                        style={{
                            width: 270,
                        }} />
                    <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby}>
                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__filter}>
                            <Button className={css.buttonfilter} type="primary" onClick={showModal}>
                                Filter
                        </Button>
                            <Modal title="Filter" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <FilterCoach
                                    coachSpecialty={coachSpecialty}
                                    setCoachSpecialty={setCoachSpecialty}
                                    setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                                    coachSpecialtyFilter={coachSpecialtyFilter}
                                    dances={dances}
                                    sports={sports}
                                    title={"PROFESSIONS"}

                                    jobs={jobs}
                                    setDataCopy={setDataCopy}
                                    dataCopy={dataCopy}
                                    coachesList={coachesList}
                                />
                                <FilterCoach
                                    dances={dances}
                                    sports={sports}
                                    setDataCopy={setDataCopy}
                                    dataCopy={dataCopy}
                                    coachesList={coachesList}
                                    coachSpecialty={coachSpecialty}
                                    setCoachSpecialty={setCoachSpecialty}
                                    setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                                    coachSpecialtyFilter={coachSpecialtyFilter}
                                    jobs={jobs}
                                    title={"SPECIALITES"}

                                />
                                <div className={css.line}></div>
                                <Experience setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                                <div className={css.line}></div>
                                <Recommendation dataCopy={dataCopy} setDataCopy={setDataCopy} coachesList={coachesList} />
                                <div className={css.line}></div>
                                <CoachType setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                                <div className={css.line}></div>
                                <CoachRegion regions={regions} setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                            </Modal>
                        </div>
                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__lenght}>
                            {dataCopy.length} resultat(s)
                        </div>
                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby}>
                            <span>Trier par : </span>
                            <Select
                                labelInValue
                                placeholder={ALL}
                                style={{ width: 155 }}
                                bordered={false}
                                className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby__select}
                                onChange={handleChange}
                            >
                                <Option value={ALL} >Tout</Option>
                                <Option value={ALPHABETICAL}>Ordre alphabetique</Option>
                                <Option value={RECOMMEND}>Plus recommander</Option>
                                <Option value={EXPERIENCE}>Années expérience</Option>
                            </Select>
                        </div>

                    </div>
                    <div className={css.line}></div>
                    <div className={css.profil_coach__coach_details__list_of_coach__card}>
                        {dataCopy.map((coachProfile, key) =>
                            renderCoachProfile(coachProfile)
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}
profil_coach.getInitialProps = async () => {
    const coachesRes = await fetch(API + "users/coaches/all")
    const jobsRes = await fetch(API + "jobs")
    const sportsRes = await fetch(API + "sports")
    const danceRes = await fetch(API + "dances/")
    const regionsRES = await fetch(API +"regions/")
    const jsonCoachesRes = await coachesRes.json()
    const jsonJobsRes = await jobsRes.json()
    const jsonSportsRes = await sportsRes.json()
    const jsonDancesRes = await danceRes.json()
    const jsonRegionsRES = await regionsRES.json()

    return {
        coachesList: jsonCoachesRes,
        jobs: jsonJobsRes,
        sports: jsonSportsRes,
        dances: jsonDancesRes,
        regions: jsonRegionsRES
    }
}


