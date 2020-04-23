// import css from './fonctionnalitesclub.scss'
import css from '../../css/home.scss'

export default function fonctionnalitesclub({ className,title,title_two, sub_title,sub_title_two,sub_title_there,sub_title_four,img }) {

return(
    <>
    <div className={className}>
    <div className={css.system}>

           <img className={css.system_img} src={img} alt="" />
            <div className={css.gestion_club_title}> 
               {title}
            </div>
            <div className={css.gestion_club_text}>
               {sub_title} <br/>
               {sub_title_two}<br/>
               {sub_title_there}<br/>
               {sub_title_four}
               </div>
               </div>
        </div>
</>
);
}