import React,{useState,useEffect} from 'react'
import Header_coach_profil from '../shared/components/header_coach_profi/header_coach_profil'
import css from '../shared/css/profil_coach.scss'
import globalCss from '../shared/global-style.scss'
import fetch from 'isomorphic-unfetch'

import { Input ,Select} from 'antd';
import Filter_coach from '../shared/components/filter_coach/filter_coach';
import Experience from '../shared/components/experience/experience';
import Recommendation from '../shared/components/recommendation/recommendation';
import Coach_type from '../shared/components/coach_type/coach_type';
import Coach_region from '../shared/components/coach_region/coach_region';
import Card_profil_coach from '../shared/components/card_profil_coach/card_profil_coach';
 function profil_coach({data,jobs}) {
    const [datacopy, setdatacopy] = useState(data)
    const { Search } = Input;

    const onSearch = value =>  {
         setdatacopy(data.filter(e => e.firstName.includes(value)))
    };
        const { Option } = Select;
        const handleChange=(value)=> {
            console.log(value.key);
            if(value.key=='alphabetique'){
              const x=([...data].sort( (a, b) => a.firstName - b.firstName? 1 : -1 ))
               return setdatacopy(x)
              }

            if(value.key=='Tout'){
                 return setdatacopy(data)
                }
            if(value.key=='experience'){
                const x=([...data].sort( (a, b) => a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber ? 1 : -1 ))
                 return setdatacopy(x)
            } 
            if(value.key=='recommander'){
                const y=(data.map(e=>(Math.round(e.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/e.coachData.reviews.length))))

                 const x=([...data].sort( (a, b) => 
                 (Math.round(a.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/a.coachData.reviews.length) < 
                 Math.round(b.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/b.coachData.reviews.length))? 1 : -1 ))
                    return setdatacopy(x)
                // console.log("recommander",y)
            }

          }
       
console.log("jbos",jobs)

    return (
        <div className={css.profil_coach}>
            <Header_coach_profil /> 
            {console.log("jbos",jobs)
}
            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/profil_coach.png"} alt="" />
            </div>
            <div className={css.profil_coach__coach_details} >
                <div className={css.profil_coach__coach_details__filter} >
                    <Search className={css.profil_coach__coach_details__filter__input_searsh} placeholder="RECHERCHE" 
                     onChange={e=>onSearch(e.target.value)}
                     style={{ width: 200,
                             }} />

                    <Filter_coach 
                     title={"PROFESSIONS"} 
                     titleone={"Football"} 
                     titletwo={"Tennis"} 

                     />
                    <div className={css.line}></div> 
                     <Filter_coach 
                     title={"SPÉCIALITÉ"} 
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
                    <Experience setdatacopy={setdatacopy} datacopy={datacopy} data={data} />
                    <div className={css.line}></div> 
                    <Recommendation datacopy={datacopy} setdatacopy={setdatacopy} data={data}/>
                    <div className={css.line}></div> 
                    <Coach_type setdatacopy={setdatacopy} datacopy={datacopy} data={data}/>
                    <div className={css.line}></div> 
                    <Coach_region  setdatacopy={setdatacopy} datacopy={datacopy} data={data}/>
                </div>

                <div className={css.profil_coach__coach_details__list_of_coach}>
                    <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby}> 

                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__lenght}> 
                            {datacopy.length} résultas
                        </div>
                        <div  className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby}>
                        <span>Trier par : </span>
                        <Select
                            labelInValue
                            placeholder={"Tout"}
                            style={{ width: 120 }}
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
                        {datacopy.map((e,key)=>
                        <Card_profil_coach 
                        data={e} 
                        key={e._id}
                        />
                        )}
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

profil_coach.getInitialProps = async () => {
    const res = await fetch("https://dev.isporit.com/api/users/coaches/all")

    const json = await res.json()


    return { status: 500, data: json }

}
// profil_coachjob.getInitialProps = async () => {
//     const res = await fetch("https://dev.isporit.com/api/jobs")
//     const json = await res.json()

   
//     return { status: 500, jobs: json }

// }
    
export default (profil_coach)