import  './become-partner.scss'
import  '../../global-style.scss'
import Link from 'next/link';
export default function BecomePartner({title , description, button}) {
    return (
      <div className={"become_partner_container"}>
        <div className={"content"}>
          <div className={"content_left_side"}>
            <h4 className={"h4"}>
              {title}
            </h4>
            <p className={"p"}>
              <Link href="/contact-us"><a>{description}</a></Link>
            </p>
          </div>
          <Link href="/contact-us"><a><button className={"global_light_button"} >{button}</button></a></Link>
        </div>
      </div>
    );
  }