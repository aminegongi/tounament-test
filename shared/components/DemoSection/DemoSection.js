import css from './DemoSection.scss'

export default function DemoSection({ style, title, title_two, description, img }) {

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
                    <button className={css.gerer_equipe}>
                        Demander une démo
                    </button>
                </div>
            </div>
        </div>
    );
}