import React, { useState } from 'react'
import css from './collapse.scss'
import down from "../../../public/icon/icondown.png"
import left from "../../../public/icon/iconleft.png"
import moment from 'moment'

function Collapse({ title, iconblock ,coachData}) {
    const [icon, setIcon] = useState(left);

    const [iconExperience, setIconExperience] = useState(left);
    const changeIcon = () => {
        if (icon === down) {
            setIcon(left)
        }
        if (icon === left) {
            setIcon(down)
        }
    }
    const changeIconexperience = () => {
        if (iconExperience === down) {
            setIconExperience(left)
        }
        if (iconExperience === left) {
            setIconExperience(down)
        }
    }
    return (
        <div className={css.biographieblock__Experiences}>
            <div className={css.biographieblock__biographie__linevertical}></div>
            <img className={css.biographieblock__biographie__icon} src={iconblock} alt="icon" />
            <div className={css.biographieblock__biographie__title}>
                {title}
            </div>
            <div className={css.line}></div>


            <div className={css.collapseblock}>
                {coachData.map(coach => {
                    return (
                        
                        <div className={css.collapseblock}>
                            <div className={css.biographieblock__biographie__contenu}>
                                <div className={css.biographieblock__biographie__contenu__collapse}>
                                    <div className={css.biographieblock__biographie__contenu__collapse__titledate} onClick={() => changeIcon()}>
                                        <div className={css.biographieblock__biographie__contenu__collapse__titledate__title}>
                                            Salle de sport: {coach.title}
                                        </div>
                                        <div className={css.biographieblock__biographie__contenu__collapse__dateicon}>
                                            <div className={css.biographieblock__biographie__contenu__collapse__dateicon__date}>
                                                {moment(coach.date.from).format('LL')} - 
                                                { (coach.date.to == null) ?" "+ moment().format('LL') : " "+moment(coach.date.to).format('LL')}
                                            </div>
                                            <img src={icon} className={icon === down ? css.down : css.left} alt="" />
                                        </div>
                                    </div>
                                    {icon == down &&
                                        <div className={css.biographieblock__biographie__contenu__collapse__contenuShow} >

                                            {coach.description}
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Collapse
