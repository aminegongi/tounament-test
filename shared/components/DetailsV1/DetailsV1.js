import player from '../../../public/icon/subforplayer.svg'
import { useState, useEffect,useRef } from 'react';
import css from './DetailsV1.scss';

import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';
import Realisationblock from '../realisationblock/Realisationblock'


function DetailsV1({ data}) {
   
     
 return (
    <div className={css.layoutblock}>
        <div className={css.layoutblock__presentation_club}>
                            <div className={css.layoutblock__presentation_club__presentationtext}>
                                {data.body.description}
                            </div>
                            <div className={css.layoutblock__presentation_club__ligne}></div>
                            <div className={css.layoutblock__presentation_club__realisation}>
                                <div className={css.layoutblock__presentation_club__realisation__realisationtext}>Nos chiffres</div>
                                <div className={css.layoutblock__presentation_club__realisation__realisationdetais}>
                                    {data.body.achievements.map((el, i) => {
                                        return (<Realisationblock key={Math.round(Math.random() * Math.random() * 100)} title={el.title} chiffre={el.number}  />)
                                    })}
                                </div>

                            </div>
                        </div>
    </div>

    );
}
export default DetailsV1;