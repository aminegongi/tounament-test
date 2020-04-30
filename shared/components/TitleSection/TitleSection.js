import css from './TitleSection.scss'
import globalCss from '../../global-style.scss'
export default function TitleSection({ title, title_two, sub_title, sub_title_two }) {

   return (
      <div className={`${globalCss.isporit_max_width}`}>
         <div className={css.presentationText} >
            <div> {title}</div>
            <div> {title_two}</div>
         </div>
         <div className={css.presentationTextTwo}>
            <div>{sub_title}</div>
            <div>{sub_title_two}</div>
         </div>
      </div>
   );
}
