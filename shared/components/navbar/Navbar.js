import css from './navbar.scss'
import globalCss from '../../global-style.scss'
import Link from 'next/link'
import { Collapse, Icon, Button } from 'antd';

function NavbarIndex({ logo, navmenu1, navmenu2, navmenu3, navmenu4, navmenu5, buttonone, buttontwo, buttonthere }) {
  return (
    <div className={`${css.navbar_container} ${globalCss.isporit_max_width}`}>
      <div className={css.logo}>
        <Link href='/'>
          <a><img src={logo} alt="logo" /></a>
        </Link>
      </div>
      <div className={css.items_container}>
        <div className={css.item}>
          {navmenu1}<Icon className={css.fleshdown} type="down" />
        </div>
        <div className={css.item}>
          {navmenu2}
        </div>
        <div className={css.item}>
          {navmenu3}
        </div>
        <div className={css.item}>
          {navmenu4}
        </div>
        <div className={css.item}>
          {navmenu5}
        </div>
      </div>
      <div className={css.button_container}>
        {/* 
        <Link href='/contact-us'>
          <button className={css.sign_in}>
            {buttonone}
            <Icon className={css.fleshdown} type="down" />
          </button>
        </Link> */}
        <Link href='/contact-us'>
          <a><button className={css.sign_up}>
            {buttontwo}
            <Icon className={css.fleshdown} type="down" />
          </button></a>
        </Link>



      </div>

    </div>
  );
}



export default NavbarIndex;