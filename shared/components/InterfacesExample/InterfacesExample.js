import css from './interfaces-example.scss'
import globalCss from '../../global-style.scss'
import Link from 'next/link'
export default function InterfacesExample({title , description , button}) {
  return (
    <div className={css.interfaces_example_container}>
      <div className={css.interfaces_example}>
        <h2 className={css.h2}>
          {title}
        </h2>
        <p className={css.p}>
          {description}
        </p>
        <div className={css.img}>
          <img src='/mockup.png' alt='mock-up' />
        </div>
        <div className={css.feature_button}>
          <Link href="/contact-us"><a><button className={globalCss.global_primary_button}>
            {button}
          </button></a></Link>
        </div>
      </div>
    </div>
  );
}