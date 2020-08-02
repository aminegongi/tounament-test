
import css from './clublogo.scss';
import globalCss from '../../global-style.scss'
export default function Clublogo({ images }) {

    return (
        <div className={`${globalCss.isporit_max_width}`}>
            {/* <div className={css.clubs}> */}
                {/* 5 clubs partenaires nous font confiance */}
            {/* </div> */}
            <div className={css.img_club}>
                {
                    images.map(el => (el.image ? <img key={Math.round(Math.random() * Math.random() * 100)}
                        alt={el.alt} className={css.hubspot} src={el.image} /> : ""))
                }
            </div>
        </div>
    );
}
