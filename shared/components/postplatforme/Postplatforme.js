import css from './postplatforme.scss';
import Link from 'next/link'

export default function Postplatforme({ img,title,title_two,title_three, sub_title,sub_title_two,sub_title_three,buttonone }) {

return(
    <>
     <img src={img} className={css.imgplatforme} alt="" />

    <div className={css.presentationText} >
     <div> {title}</div>
     <div> {title_two}</div>
     <div> {title_three}</div>

      </div>
     <div className={css.presentationTextTow}>
        <div>{sub_title}</div>
        <div>{sub_title_two}</div>
        <div>{sub_title_three}</div>

     </div>
     <Link href='/contact-us'>
          <a><button className={css.sign_up}>
            {buttonone} 
        </button></a>
        </Link>
</>
);
}
