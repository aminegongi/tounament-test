 import css from './Functionclub.scss'
// import css from '../../css/home.scss'

export default function Functionclub({ className,title,title_two, sub_title,sub_title_two,sub_title_there,sub_title_four,img }) {

return(
    <>
    <div className={className}>
    <div className={css.system}>

           <img className={css.system_img} src={img} alt="" />
            <div className={css.gestion_club_title}> 
                <div> {title}</div>
    
            </div>
            <div className={css.gestion_club_text}>
               <div> {sub_title} </div>
               <div>{sub_title_two}</div>
               <div>{sub_title_there}</div>
                   {sub_title_four}
               </div>
               </div>
        </div>
</>
);
}