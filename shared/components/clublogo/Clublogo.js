
import css from './clublogo.scss';
import Link from 'next/link'

export default function Clublogo({ iconone,icontwo,iconthree,iconfour,iconfive }) {

return(
    <>
    <div className={css.clubs}>
        5 clubs partenaires nous font confiance
        </div>
        <div className={css.img_club}>
        <img alt="image" className={css.hubspot} src={iconone} alt="" />
        <img alt="image" className={css.servicetitan} src={icontwo} alt="" />
        <img alt="image" className={css.Grubhub} src={iconthree} alt="" />
        <img alt="image" className={css.cognizant} src={iconfour} alt="" />
        <img alt="image" className={css.square} src={iconfive} alt="" />

</div>
</>
);
}
