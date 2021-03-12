import './interfaces-example.scss'
import  '../../global-style.scss'
import Link from 'next/link'
export default function InterfacesExample({title , description , button}) {
  return (
    <div className={"interfaces_example_container"}>
      <div className={"interfaces_example"}>
        <h2 className={"h2"}>
          {title}
        </h2>
        <p className={"p"}>
          {description}
        </p>
        <div className={"img"}>
          <img src='/mockup.png' alt='mock-up' />
        </div>
        <div className={"feature_button"}>
          <Link href="/contact-us"><a><button className={"global_primary_button"}>
            {button}
          </button></a></Link>
        </div>
      </div>
    </div>
  );
}