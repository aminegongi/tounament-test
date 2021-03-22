import './footerIndexPage.scss'
import Link from 'next/link'
import { Collapse, Icon, Button } from 'antd';

function FooterIndexPage({ logo, navmenu1, navmenu2, navmenu3, navmenu4, navmenu5, buttonone, buttontwo, buttonthere }) {
  return (
    <div className={"navbar_container"}>
      <div className={"logo"}>
        <Link href='/'>
          <a><img src={logo} alt="logo" /></a>
        </Link>
      </div>
      <div className={"items_container"}>
        <div className={"item"}>
          {navmenu1}<Icon className={"fleshdown"} type="down" />
        </div>
        <div className={"item"}>
          {navmenu2}
        </div>
        <div className={"item"}>
          {navmenu3}
        </div>
        <div className={"item"}>
          {navmenu4}
        </div>
        {/* <div className={"item"}>
          {navmenu5}
        </div> */}
      </div>
      <div className={"button_container"}>

        <Link href='/contact-us'>
          <a><button className={"sign_up"}>
            {buttontwo}
          </button></a>
        </Link>
      </div>

    </div>
  );
}



export default FooterIndexPage;