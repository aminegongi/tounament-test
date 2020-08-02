import css from './partnersV1.scss';

import Clublogo from '../../../clublogo/Clublogo'


function PartnersV1({ data }) {


    return (
        <div className={css.club_logo_and_title}>
            <div className={css.price}>
                <div className={css.price__title}>NOS PARTENAIRES</div>
                <div className={css.price__ligne}>_______________</div>
                {/* <div className={css.price__subtitle}>
                    {data.body.description}
                </div> */}
            </div>

            <Clublogo
                images={data.body}
            />
        </div>
    );
}
export default PartnersV1;