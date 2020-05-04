import css from './DemoSection.scss'
import routes from '../../../utils/routes';
import Link from 'next/link';

export default function DemoSection({ style, title, title_two, description, img, link }) {

    return (
        <div style={style}>
            <div className={css.demo_block}>
                <div className={css.demo_semaine}>
                    {img && <img src={img} alt={title} className={css.montre}></img>}
                    <div className={css.demo_plus_text} >
                        <div> {title}</div>
                        <div> {title_two}</div>
                    </div>
                    <div className={css.demo_plateforme}>
                        {description}

                    </div>
                    {link && <Link href={link}>
                        <button className={css.gerer_equipe}>
                            Demander une démo
                        </button>
                    </Link>}
                </div>
            </div>
        </div>
    );
}