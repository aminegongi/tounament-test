import css from './platform-intro.scss'
import globalCss from '../../global-style.scss'
import Link from 'next/link';
export default function PlatformIntro({ title, description, bookCourt, clubArea }) {
  return (
    <div className={css.platform_intro_container}>
      <div className={css.left_side}>
        <h1 className={css.title}>
          {title}
        </h1>
        <p className={css.description}>
          {description}
        </p>
        <div className={css.buttons_container}>
          <Link href='/contact-us'><a><button className={globalCss.global_primary_button}>{bookCourt}</button></a></Link>
          <Link href="/contact-us"><a><button className={globalCss.global_light_button}>{clubArea}</button></a></Link>
        </div>
      </div>
      <div className={css.right_side}>
        <img src="/topSectionTennisImage.png" alt="tennis" />
        <div className={css.counter}>01 <div className={css.line} /> 04</div>
      </div>
    </div>
  );
}