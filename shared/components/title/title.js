import css from './title.scss'

export default function title({ title,title_two, sub_title,sub_title_two }) {

return(
    <>
<div className={css.regagnez_temps} >
      {title}<br/>
      {title_two}
      </div>
     <div className={css.plannings}>
        {sub_title}<br/>
        {sub_title_two}

     </div>
</>
);
}
