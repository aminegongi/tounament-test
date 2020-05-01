import css from './postplatforme.scss';
import globalCss from '../../global-style.scss';
import Link from 'next/link'

export default function Postplatforme({ img, title, sub_title, buttonone, backgroundbutton }) {

  return (
    <div className={`${globalCss.isporit_max_width} ${css.post_platform_container}`}>
      <img src={img} className={css.imgplatforme} alt="" />

      <div className={css.presentationText} >
        {title}
      </div>
      <div className={css.presentationTextTow}>
        <div>{sub_title}</div>
      </div>
      <Link href='/contact-us'>
        <a>
          <button className={css.sign_up} style={{ backgroundColor: backgroundbutton }} >
            {buttonone}
          </button>
        </a>
      </Link>
    </div>
  );
}
