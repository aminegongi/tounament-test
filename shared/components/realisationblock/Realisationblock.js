import css from './realisationblock.scss'

export default function realisationblock({ className, title, chiffre, img }) {

    return (
          <div className={css.layoutblock__presentation_club__realisation__realisationdetais}>
            <div className={css.layoutblock__presentation_club__realisation__realisationnumber}>{chiffre}</div>
            <div className={css.layoutblock__presentation_club__realisation__realisationtext__img}>

                <div className={css.layoutblock__presentation_club__realisation__realisationtext__img__name}>{title}</div> 
                {/* <img src={img} alt="trophy"></img> */}
            </div>    
                {/* <img className={css.system_img} src={img} alt={title} />
                <div className={css.gestion_club_title}>
                    {title}
                </div>
                <div className={css.gestion_club_text}>
                    {description}
                </div>
            </div> */}
         </div>

    );
}