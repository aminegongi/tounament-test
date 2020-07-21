import player from '../../../public/icon/subforplayer.svg'
import { useState, useEffect,useRef } from 'react';
import css from './PartnersV1.scss';

import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';
import Clublogo from '../clublogo/Clublogo'


function PartnersV1({ data}) {
   
     
 return (
    <div className={css.club_logo_and_title}>
        <Clublogo
            images={data.body}
        />
    </div>
    );
    }
export default PartnersV1;