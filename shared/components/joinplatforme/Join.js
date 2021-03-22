import  './join.scss'
import routes from '../../../utils/routes';
import Link from 'next/link';

export default function TitleSection({ buttontwo, classbutton, link }) {

  return (
    <div className={"join_container"}>

      <div className={"join"}>
        <div className={"join_community"}>
          Rejoignez notre communauté <br />
          et faîtes partie des meilleurs
      </div>
        <div className={"join_button"}>
          {/* <button onClick={() => window.location.href = "/contact-us"} className={"buttom_connexion"}>
          {buttonone}
        </button> */}
          <div className={classbutton}>
            <Link href={link}>
              <button className={"button_commercial"}>
                {buttontwo}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
