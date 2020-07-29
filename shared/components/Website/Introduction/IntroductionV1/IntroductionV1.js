import css from './introductionV1.scss';

import routes from '../../../../../utils/routes';
import Link from 'next/link';


function IntroductionV1({ data }) {
    return (
        <div className={css.introductionV1_container}>
            <div className={`${css.introductionV1}`}>

                <div className={`${css.introductionV1__description_container} `}>
                    <h1 className={css.introductionV1__description_container__title}>

                        {data.body.title}
                    </h1>
                    <div className={css.introductionV1__description_container__description}>
                        <div>
                            {data.body.description}
                        </div>
                    </div>
                    <Link href={routes.CLUB_FEATURES.path} >
                        <button onClick={() => { }} className={css.introductionV1__description_container__button}>
                            Rejoindre le club
                        </button>
                    </Link>
                </div>
                <div className={css.image}>
                    {data.body.sport === "tennis" ?
                        <img alt="image" src={"../icon/club_illustration.svg"} alt="" /> : "is not a soccer"
                    }
                </div>
            </div>
        </div>
    );
}
export default IntroductionV1;