import React,{useState,useEffect} from 'react'
import Header_coach_profil from '../shared/components/header_coach_profi/Header_coach_profil'
import css from '../shared/css/profil_coach.scss'
import globalCss from '../shared/global-style.scss'
import fetch from 'isomorphic-unfetch'

import { Input ,Select} from 'antd';
import Filter_coach from '../shared/components/filter_coach/Filter_coach';
import Experience from '../shared/components/experience/Experience';
import Recommendation from '../shared/components/recommendation/recommendation';
import Coach_type from '../shared/components/coach_type/Coach_type';
import Coach_region from '../shared/components/coach_region/Coach_region';
import Card_profil_coach from '../shared/components/card_profil_coach/Card_profil_coach';
export default function profil_coach({coachesList,jobs,sports,dances}) {
    const [dataCopy, setdataCopy] = useState(coachesList)
    const [coachSpecialty, setcoachSpecialty] = useState()
    const [coachSpecialtyfilter, setcoachSpecialtyfilter] = useState('')
    const { Search } = Input;
    const renderCoachProfile =(coachProfile)=>{
        console.log('coachProfile: ', coachProfile);
        const job=jobs.find(job=>job._id===coachProfile.coachData.job)
        console.log('job: ', job);
        let specialty=""
        if(job.specialty && job.specialty.type==="sport"){
            
            specialty=sports.find(sport=>sport._id===coachProfile.coachData.specialty)
        }
        else if(job.specialty && job.specialty.type==="dance"){
            
            specialty=dances.find(dance=>dance._id===coachProfile.coachData.specialty)
        }
        console.log('specialty: ', specialty);
        return <Card_profil_coach 
        coachProfile={coachProfile} 
        key={coachProfile._id}
        job={job}
        specialty={specialty}
        />
    }
    const onSearch = value =>  {
        setdataCopy(coachesList.filter(e => e.firstName.includes(value) || e.lastName.includes(value))) 
       };
        const { Option } = Select;
        const handleChange=(value)=> {
            if(value.key=='alphabetique'){
              const sortbyalphabetical=([...coachesList].sort( (a, b) => a.firstName - b.firstName? 1 : -1 ))
               return setdataCopy(sortbyalphabetical)
              }

            if(value.key=='Tout'){
                 return setdataCopy(coachesList)
                }
            if(value.key=='experience'){
                const sortbyexperience=([...coachesList].sort( (a, b) => a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber ? 1 : -1 ))
                 return setdataCopy(sortbyexperience)
            } 
            if(value.key=='recommander'){

                 const sortbyrecommend=([...coachesList].sort( (a, b) => 
                 (Math.round(a.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/a.coachData.reviews.length) < 
                 Math.round(b.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/b.coachData.reviews.length))? 1 : -1 ))
                    return setdataCopy(sortbyrecommend)
            }

          }
       
    return (
        <div className={css.profil_coach}>
            <Header_coach_profil /> 
           
            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/profil_coach.png"} alt="" />
            </div>
            <div className={css.profil_coach__coach_details} >
                <div className={css.profil_coach__coach_details__filter} >
                    <Search className={css.profil_coach__coach_details__filter__input_searsh} 
                     placeholder="RECHERCHE PAR NOM" 
                     onChange={e=>onSearch(e.target.value)}
                     style={{ width: 250,
                             }} />
                    <div className={css.line}></div> 

                    <Filter_coach 
                     coachSpecialty={coachSpecialty}
                     setcoachSpecialty={setcoachSpecialty}
                     setcoachSpecialtyfilter={setcoachSpecialtyfilter}
                     coachSpecialtyfilter={coachSpecialtyfilter}
                     dances={dances}
                     sports={sports}
                     title={"PROFESSIONS"} 
                     titleone={"Football"} 
                     titletwo={"Tennis"} 
                     jobs={jobs}
                     setdataCopy={setdataCopy}
                     dataCopy={dataCopy}
                     coachesList={coachesList}
                     />
                    <div className={css.line}></div> 
                     <Filter_coach 
                     dances={dances}
                     sports={sports}
                     setdataCopy={setdataCopy}
                      dataCopy={dataCopy}
                      coachesList={coachesList}
                      coachSpecialty={coachSpecialty}
                      setcoachSpecialty={setcoachSpecialty}
                      setcoachSpecialtyfilter={setcoachSpecialtyfilter}
                      coachSpecialtyfilter={coachSpecialtyfilter}
                      jobs={jobs}
                      title={"SPECIALITES"} 
                      titleone={"Collectif"} 
                      titletwo={"Individuel"} 
                      titlethere={"Football"} 
                      subtitleone={"Basket-ball"} 
                      subtitletwo={"Volley-ball"} 
                      subtitlethere={"Handball"} 
                      subtitlefour={"Football"} 
                      subtitlefour={"Gymnastique"} 
                      subtitlesix={"Tennis"} 
                      subtitleseven={"Tennis"} 
                      subtitleeight={"Yoga"} 
                     />
                    <div className={css.line}></div> 
                    <Experience setdataCopy={setdataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                    <div className={css.line}></div> 
                    <Recommendation dataCopy={dataCopy} setdataCopy={setdataCopy} coachesList={coachesList} />
                    <div className={css.line}></div> 
                    <Coach_type setdataCopy={setdataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                    <div className={css.line}></div> 
                    <Coach_region  setdataCopy={setdataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                </div>

                <div className={css.profil_coach__coach_details__list_of_coach}>
                    <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby}> 

                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__lenght}> 
                            {dataCopy.length} resultat(s) 
                        </div>
                        <div  className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby}>
                        <span>Trier par : </span>
                        <Select
                            labelInValue
                            placeholder={"Tout"}
                            style={{ width: 155 }}
                            bordered={false}
                            className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby__select}
                            onChange={handleChange}
                        >
                            <Option value="Tout" >Tout</Option>
                            <Option value="alphabetique">Ordre alphabétique</Option>
                            <Option value="recommander">Plus recommander</Option>
                            <Option value="experience">Années expérience</Option>
                        </Select>
                        </div>
                        
                    </div>
                    <div className={css.line}></div> 
                    <div className={css.profil_coach__coach_details__list_of_coach__card}>
                        {dataCopy.map((coachProfile,key)=>
                            renderCoachProfile(coachProfile)
                        )}
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

profil_coach.getInitialProps = async () => {
    const coachesRes = await fetch("https://dev.isporit.com/api/users/coaches/all")
    const jobsRes = await fetch("https://dev.isporit.com/api/jobs")
    const sportsRes = await fetch("https://dev.isporit.com/api/sports")
    const danceRes = await fetch("https://dev.isporit.com/api/dances/")



    const jsonCoachesRes = await coachesRes.json()
    const jsonJobsRes = await jobsRes.json()
    const jsonSportsRes = await sportsRes.json()
    const jsonDancesRes = await danceRes.json()

    



    return {  coachesList: jsonCoachesRes,jobs:jsonJobsRes ,sports:jsonSportsRes,dances:jsonDancesRes}

}

    
    