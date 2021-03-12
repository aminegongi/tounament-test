import '../../global-style.scss'
import  './feature.scss'
import Link from 'next/link';
export default function Feature({title , description, button}) {
    return (
      <div className={"feature_container"}>
        <div className={"content"}>
          <img className={"content_img"} src="/performanceIcon.png" alt="performanceIcon" />
          <div className={"title"}>{title}</div>
          <p className={"p"}>
            {description}
          </p>
          <Link href="/contact-us"><a><button className={"global_primary_button"}>
            {button}
          </button></a></Link>

        </div>
        <img className={"sport_img"} src="/squash.png" alt="squash" />
      </div>
    );
  }