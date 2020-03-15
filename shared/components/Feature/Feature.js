import globalCss from '../../global-style.scss'
import css from './feature.scss'
import Link from 'next/link';
export default function Feature({title , description, button}) {
    return (
      <div className={css.feature_container}>
        <div className={css.content}>
          <img className={css.content_img} src="/performanceIcon.png" alt="performanceIcon" />
          <div className={css.title}>{title}</div>
          <p className={css.p}>
            {description}
          </p>
          <Link href="/contact-us"><a><button className={globalCss.global_primary_button}>
            {button}
          </button></a></Link>

        </div>
        <img className={css.sport_img} src="/squash.png" alt="squash" />
      </div>
    );
  }