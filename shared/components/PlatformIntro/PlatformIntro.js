import  './platform-intro.scss'
import '../../global-style.scss'
import Link from 'next/link';
export default function PlatformIntro({ title, description, bookCourt, clubArea }) {
  return (
    <div className={"platform_intro_container"}>
      <div className={"left_side"}>
        <h1 className={"title"}>
          {title}
        </h1>
        <p className={"description"}>
          {description}
        </p>
        <div className={"buttons_container"}>
          <Link href='/contact-us'><a><button className={"global_primary_button"}>{bookCourt}</button></a></Link>
          <Link href="/contact-us"><a><button className={"global_light_button"}>{clubArea}</button></a></Link>
        </div>
      </div>
      <div className={"right_side"}>
        <img src="/topSectionTennisImage.png" alt="tennis" />
        <div className={"counter"}>01 <div className={"line"} /> 04</div>
      </div>
    </div>
  );
}