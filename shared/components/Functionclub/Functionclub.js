import css from './functionclub.scss'

export default function Functionclub({ className, title, description, img }) {

    return (
        <div className={className}>
            <div className={css.system}>

                <img className={css.system_img} src={img} alt={title} />
                <div className={css.gestion_club_title}>
                    {title}
                </div>
                <div className={css.gestion_club_text}>
                    {description}
                </div>
            </div>
        </div>
    );
}