import  './postplatforme.scss';
import  '../../global-style.scss';
import Link from 'next/link'

export default function Postplatforme({ img, title, sub_title, buttonone, backgroundbutton, link }) {

  return (
    <div className={`${"isporit_max_width"} ${"post_platform_container"}`}>
      <img src={img} className={"imgplatforme"} alt="" />

      <h1 className={"presentationText"} >
        {title}
      </h1>
      <div className={"presentationTextTow"}>
        <div>{sub_title}</div>
      </div>
      {link && <Link href={link}>
        <button className={"sign_up"} style={{ backgroundColor: backgroundbutton }} >
          {buttonone}
        </button>
      </Link>}
    </div>
  );
}
