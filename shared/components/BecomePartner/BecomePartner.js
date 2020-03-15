import css from './become-partner.scss'
import globalCss from '../../global-style.scss'
import Link from 'next/link';
export default function BecomePartner({title , description, button}) {
    return (
      <div className={css.become_partner_container}>
        <div className={css.content}>
          <div className={css.content_left_side}>
            <h4 className={css.h4}>
              {title}
            </h4>
            <p className={css.p}>
              <Link href="/contact-us"><a>{description}</a></Link>
            </p>
          </div>
          <Link href="/contact-us"><a><button className={globalCss.global_light_button} >{button}</button></a></Link>
        </div>
      </div>
    );
  }