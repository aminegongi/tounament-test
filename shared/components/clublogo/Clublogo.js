
import css from './clublogo.scss';
import globalCss from '../../global-style.scss'
import routes from '../../../utils/routes';
import Link from 'next/link';
export default function Clublogo({ images }) {

    return (
        <div className={`${globalCss.isporit_max_width}`}>
            <div className={css.clubs}>
                Les clubs nous font confiance
            </div>
            {/* <Link href={routes.SIGN_UP.path} > */}
            <div className={css.img_club}>
                {
                    images.map(el => <img key={Math.round(Math.random() * Math.random() * 100)}
                        alt={el.alt} className={css.image} src={el.src} />)
                }
            </div>
            {/* </Link> */}
        </div>
    );
}
