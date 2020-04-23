import css from './demo.scss'
import Title from 'antd/lib/skeleton/Title';

export default function demo({ title,title_two, sub_title,sub_title_two,sub_title_there,sub_title_four,img }) {

return(
    <>
        <div className={css.gagnant_block}>
        <div className={css.gagnant_semaine}>
          <img src={img} className={css.montre}></img>
        <div className={css.gagnant_plus_text} >
          {title}<br/>
         {title_two}
        </div>
        <div className={css.gagnant_plateforme}>
            {sub_title} <br/>
            {sub_title_two}<br/>
            {sub_title_there}<br/>
            {sub_title_four}  
         </div>
        <button onClick={() => window.location.href = "/contact-us"} className={css.gerer_equipe}>
            Demander une démo
        </button>
        </div>
     </div>
</>
);
}