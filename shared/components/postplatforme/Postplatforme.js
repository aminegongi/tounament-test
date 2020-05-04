import css from './postplatforme.scss';
import globalCss from '../../global-style.scss';
import Link from 'next/link'

export default function Postplatforme({ img, title, sub_title, buttonone, backgroundbutton, link }) {

  return (
    <div className={`${globalCss.isporit_max_width} ${css.post_platform_container}`}>
      <img src={img} className={css.imgplatforme} alt="" />

      <h1 className={css.presentationText} >
        {title}
      </h1>
      <div className={css.presentationTextTow}>
        <div>{sub_title}</div>
      </div>
      {link && <Link href={link}>
        <button className={css.sign_up} style={{ backgroundColor: backgroundbutton }} >
          {buttonone}
        </button>
      </Link>}
    </div>
  );
}
