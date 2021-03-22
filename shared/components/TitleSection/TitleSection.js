import  './TitleSection.scss'
import  '../../global-style.scss'
export default function TitleSection({ title, title_two, sub_title, sub_title_two }) {

   return (
      <div className={`${"isporit_max_width"}`}>
         <div className={"presentationText"} >
            <div> {title}</div>
            <div> {title_two}</div>
         </div>
         <div className={"presentationTextTwo"}>
            <div>{sub_title}</div>
            <div>{sub_title_two}</div>
         </div>
      </div>
   );
}
