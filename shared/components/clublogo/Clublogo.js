
import css from './clublogo.scss';
import Link from 'next/link'
import globalCss from '../../global-style.scss'
export default function Clublogo({ images }) {

    return (
        <div className={`${globalCss.isporit_max_width}`}>
            <div className={css.clubs}>
                5 clubs partenaires nous font confiance
            </div>
            <div className={css.img_club}>
                {
                    images.map(el => <img alt={el.alt} className={css.hubspot} src={el.src}  />)
                }
            </div>
        </div>
    );
}
