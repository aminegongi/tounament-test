import player from '../../../public/icon/subforplayer.svg'
import { useState, useEffect, useRef } from 'react';
import css from './introductionV1.scss';

import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';


function IntroductionV1({ data }) {
    console.log('data: ', data);


    return (
        <div className={`${css.gerer_iluustateur}`}>

            <div className={`${css.gerer_iluustateur_container} `}>
                <div className={`${css.gerer_equipe_img} `}>
                    <h1 className={css.gerer_equipe_title}>

                        {data.body.title}
                    </h1>
                    <div className={css.gerer_time_title}>
                        <div>
                            {data.body.description}
                        </div>
                    </div>
                    <Link href={routes.CLUB_FEATURES.path} >
                        <button onClick={() => window.location.href = "/contact-us"} className={css.gerer_team}>
                            Rejoindre le club
                    </button>
                    </Link>
                </div>
                {data.body.sport === "tennis" ?
                    <img alt="image" className={css.img_illustration} src={"../icon/club_illustration.svg"} alt="" /> : "is not a soccer"
                }
            </div>
        </div>
    );
}
export default IntroductionV1;