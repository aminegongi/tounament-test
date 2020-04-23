import css from './DemoSection.scss'

export default function DemoSection({ title,title_two, sub_title,sub_title_two,sub_title_there,sub_title_four,img }) {

return(
    <>
        <div className={css.demo_block}>
        <div className={css.demo_semaine}>
        <img src={img} className={css.montre}></img>
        <div className={css.demo_plus_text} >
        <div> {title}</div>
        <div> {title_two}</div>
        </div>
        <div className={css.demo_plateforme}>
            <div>{sub_title} </div>
            <div>{sub_title_two}</div>
            <div>{sub_title_there}</div>
            <div>{sub_title_four} </div> 
         </div>
        <button className={css.gerer_equipe}>
            Demander une démo
        </button>
        </div>
     </div>
</>
);
}